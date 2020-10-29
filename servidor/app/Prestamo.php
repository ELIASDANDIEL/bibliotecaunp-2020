<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prestamo extends Model
{
    protected $table = 'prestamo';
    protected $fillable = ['fecha_prestamo','fecha_devolucion','libro_id','estudiante_id','estado'];

    public function libro()
    {
    	return $this->belongsTo(Libro::class);
    }

    public function estudiante()
    {
    	return $this->belongsTo(Estudiante::class);
    }
    
}
