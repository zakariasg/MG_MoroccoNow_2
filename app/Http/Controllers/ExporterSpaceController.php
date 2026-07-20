<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\FiliereProfile;
use App\Models\MarketProfile;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExporterSpaceController extends Controller
{
    public function marches()
    {
        return Inertia::render('Exporter/Marches', [
            'profiles' => MarketProfile::orderBy('order_index')->orderBy('country_name')->get(),
        ]);
    }

    public function filieres()
    {
        return Inertia::render('Exporter/Filieres', [
            'profiles' => FiliereProfile::orderBy('order_index')->orderBy('title')->get(),
        ]);
    }

    public function veille()
    {
        return Inertia::render('Exporter/Veille', [
            'sectors' => Sector::with('regulatoryDocuments')->orderBy('order_index')->orderBy('name')->get(),
        ]);
    }

    public function evenements(Request $request)
    {
        $events = Event::orderBy('event_date')->get();

        $myRegistrations = EventRegistration::where('user_id', $request->user()->id)
            ->get(['event_id', 'status'])
            ->keyBy('event_id');

        return Inertia::render('Exporter/Evenements', [
            'events' => $events,
            'myRegistrations' => $myRegistrations,
        ]);
    }

    public function registerEvent(Request $request, Event $event)
    {
        if (! $event->isRegistrationOpen()) {
            return back()->with('error', "L'inscription à cet événement est expirée.");
        }

        $already = EventRegistration::where('event_id', $event->id)
            ->where('user_id', $request->user()->id)
            ->exists();

        if ($already) {
            return back()->with('error', 'Vous êtes déjà inscrit à cet événement.');
        }

        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_last_name' => 'required|string|max:255',
            'contact_first_name' => 'required|string|max:255',
            'contact_title' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
        ]);

        EventRegistration::create($data + [
            'event_id' => $event->id,
            'user_id' => $request->user()->id,
            'status' => 'pending',
        ]);

        return back()->with('success', "Votre demande d'inscription a été envoyée à l'administrateur pour confirmation.");
    }
}