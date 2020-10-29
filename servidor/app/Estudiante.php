<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'estudiante';
    protected $fillable = ['nombres','apellidos','codigo','dni','facultad','clave'];
    protected $appends = ['nombre_completo'];

    public function getNombreCompletoAttribute()
    {
    	return $this->nombres.' '.$this->apellidos;
    }

    public function prestamos()
    {
    	return $this->hasMany(Prestamo::class);
    }
}
