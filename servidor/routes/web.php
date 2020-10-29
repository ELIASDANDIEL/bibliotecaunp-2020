<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'libro'],function ()
{
	Route::get('','ControllerLibro@index');
	Route::post('upload','ControllerLibro@upload');
	Route::delete('delete/{id}','ControllerLibro@delete');
});

Route::group(['prefix' => 'estudiante'],function ()
{
	Route::get('','ControllerEstudiante@index');
	Route::post('store','ControllerEstudiante@store');
	Route::put('update/{id}','ControllerEstudiante@update');
	Route::delete('delete/{id}','ControllerEstudiante@delete');
});

Route::post('consultar/libro','ControllerEstudiante@consultarLibros');