<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Estudiante,Libro};

class ControllerEstudiante extends Controller
{
   	public function index()
   	{
   		$estudiantes = Estudiante::all();

   		return response()->json([
   			'estudiantes' => $estudiantes
   		]);
   	}

   	public function store(Request $request)
   	{
   		Estudiante::create($request->all());

   		return response()->json([
   			'success' => true,
   			'message' => 'Estudiante registrado correctamente'
   		]);
   	}

   	public function update($id, Request $request)
   	{
   		$estudiante = Estudiante::find($id);

   		$estudiante->update($request->all());

   		return response()->json([
   			'success' => true,
   			'message' => 'Estudiante actualizado correctamente'
   		]);
   	}

   	public function delete($id)
   	{
   		$estudiante = Estudiante::find($id);

   		$estudiante->delete();

   		return response()->json([
   			'success' => true,
   			'message' => 'Estudiante eliminado correctamente'
   		]);
   	}

	public function consultarLibros(Request $request)
	{
		$estudiante = Estudiante::where('codigo',$request->codigo)
								->where('clave',$request->clave)
								->first();

		if(is_null($estudiante)) 
			return [
				'success' => false,
				'message' => 'Sus credenciales no son correctas'
			];

		$libros_visible = Libro::where('visible',true)->get();

		if($libros_visible->count() == 0) return ['success' => false,'message' => 'No hay libros disponibles'];

		return ['success' => true, 'libros' => $libros_visible];
	}
}