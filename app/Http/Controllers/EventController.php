<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    
    {
        return Inertia::render('Events', [
            'events' => Event::orderBy('event_date', 'asc')->get(),
        ]);
    }
}
