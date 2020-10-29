<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    protected $table = 'libro';
    protected $fillable = [
        'titulo',
        'autor',
        'precio',
        'anio',
        'url_file',
        'visible',
    ];

    protected $casts = [
        'precio' => 'float',
        'visible' => 'boolean'
    ];

    public function prestamos()
    {
    	return $this->hasMany(Prestamo::class);
    }
}
