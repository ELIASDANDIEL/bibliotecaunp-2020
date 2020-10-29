<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Prestamo;
use App\Libro;
use App\Estudiante;

class ControllerPrestamo extends Controller
{
    public function index()
    {

    	$prestados  = Prestamo::with('libro','estudiante')->where('estado',0)->get();

    	$disponibles = Libro::whereNotIn('id',$prestados->pluck('libro_id'))->get();

    	return response()->json([
    		'disponibles' => $disponibles,
    		'prestados'   => $prestados
    	]);

    }

    public function store(Request $request)
    {
   		Prestamo::create($request->all());
    	
    	return response()->json([
   			'success' => true,
   			'message' => 'Prestamo registrado correctamente'
   		]);
    }

    public function devolver($id)
    {
    	$prestamo = Prestamo::find($id);

    	$prestamo->delete();

    	return response()->json([
   			'success' => true,
   			'message' => 'Libro devuelto correctamente'
   		]);
    }
}
