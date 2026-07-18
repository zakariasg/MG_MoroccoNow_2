<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSetting extends Model
{
    protected $fillable = [
        'hero_line_1',
        'hero_line_2',
        'hero_line_3',
        'hero_slide_1',
        'hero_slide_2',
        'hero_slide_3',
        'stat_companies',
        'stat_jobs',
        'stat_smes',
        'stat_partners',
        'vision_text',
    ];

    /**
     * There is only ever one row of home settings.
     * This helper returns it, creating it with defaults if it doesn't exist yet.
     */
    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
