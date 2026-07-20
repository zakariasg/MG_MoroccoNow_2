<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegulatoryDocument extends Model
{
    protected $fillable = [
        'sector_id',
        'notifying_member',
        'publication_date',
        'document_symbol',
        'notification_type',
        'description',
        'hs_ics_codes',
        'objectives',
        'document_link',
        'order_index',
    ];

    protected $casts = [
        'publication_date' => 'date',
    ];

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class);
    }
}