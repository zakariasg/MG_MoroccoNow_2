<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketProfile extends Model
{
    protected $fillable = [
        'country_name',
        'year',
        'slides',
        'document_path',
        'order_index',
    ];

    protected $casts = [
        'slides' => 'array',
    ];
}
