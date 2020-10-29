<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Libro;
use DB;

class ControllerLibro extends Controller
{
   	public function index()
   	{
   		$libros = Libro::all();

   		return response()->json([
   			'libros' => $libros
   		]);
	}

	public function upload(Request $request)
	{
		$libro;

		$id = ($request->id == null || $request->id == "null") 
				? null 
				: $request->id;

		$request['visible'] = ($request->visible == 'true') ? true : false;

		DB::beginTransaction();
		try
		{
			if($id){
				$libro = Libro::find($id);
				$libro->update($request->except('file','url_file'));
			}
			else{
				$libro = Libro::create($request->except('file'));	
			}

			if($request->hasFile('file'))
			{
				$file = $request->file('file');
				$ext  = $file->getClientOriginalExtension();
				$name = uniqid().'.'.$ext;

				$file->storeAs("file/{$libro->id}",$name);

				$libro->url_file = "file/{$libro->id}/".$name;
				$libro->save();
			}

			DB::commit();

			return [
				'success' => true,
				'message' => ($id) 
							? "Libro actualizado correctamente" 
							: "Libro registrado correctamente"
			];
		}
		catch(\Exception $e)
		{
			DB::rollback();
			return [
				'success' => false,
				'message' => $e->getMessage()
			];
		}
	}

   	public function delete($id)
   	{
   		$libro = Libro::find($id);

   		$libro->delete();

   		return response()->json([
   			'success' => true,
   			'message' => 'Libro eliminado correctamente'
   		]);
   	}
}
