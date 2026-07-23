<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Event extends Model
{
    protected $fillable = [
        'title',
        'audience',
        'description',
        'event_date',
        'end_date',
        'registration_deadline',
        'location',
        'link',
        'image_path',
    ];

    protected $casts = [
        'event_date' => 'date',
        'end_date' => 'date',
        'registration_deadline' => 'date',
    ];

    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    /**
     * Evénements de la session publique (page /events, sans formulaire d'inscription).
     */
    public function scopePublicSpace($query)
    {
        return $query->where('audience', 'public');
    }

    /**
     * Evénements de l'Espace Exportateur (onglet "Evénements", avec formulaire d'inscription).
     */
    public function scopeExporterSpace($query)
    {
        return $query->where('audience', 'exporter');
    }

    /**
     * Registration is considered open as long as no deadline is set,
     * or the deadline has not passed yet.
     */
    public function isRegistrationOpen(): bool
    {
        if (! $this->registration_deadline) {
            return true;
        }

        return Carbon::today()->lte($this->registration_deadline);
    }
}