<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FiliereProfile extends Model
{
    protected $fillable = [
        'title',
        'year',
        'slides',
        'document_path',
        'order_index',
    ];

    protected $casts = [
        'slides' => 'array',
    ];
}