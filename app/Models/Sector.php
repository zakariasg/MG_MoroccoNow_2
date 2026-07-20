<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sector extends Model
{
    protected $fillable = [
        'name',
        'icon',
        'order_index',
    ];

    public function regulatoryDocuments(): HasMany
    {
        return $this->hasMany(RegulatoryDocument::class)->orderBy('order_index');
    }
}