<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\FiliereProfile;
use App\Models\MarketProfile;
use App\Models\RegulatoryDocument;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminExporterContentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ExporterContent/Index', [
            'marketProfiles' => MarketProfile::orderBy('order_index')->orderBy('country_name')->get(),
            'filiereProfiles' => FiliereProfile::orderBy('order_index')->orderBy('title')->get(),
            'sectors' => Sector::with('regulatoryDocuments')->orderBy('order_index')->orderBy('name')->get(),
            'registrations' => EventRegistration::with(['event:id,title,event_date', 'user:id,name,email'])
                ->latest()
                ->get(),
        ]);
    }

    // ---------- Profils marchés ----------

    public function storeMarketProfile(Request $request)
    {
        $request->validate([
            'country_name' => 'required|string|max:255',
            'year' => 'nullable|string|max:20',
            'slides.*' => 'nullable|image|max:4096',
            'document' => 'nullable|file|mimes:pdf|max:8192',
        ]);

        $slidePaths = [];
        if ($request->hasFile('slides')) {
            foreach ($request->file('slides') as $slide) {
                $slidePaths[] = '/storage/' . $slide->store('content/markets', 'public');
            }
        }

        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = '/storage/' . $request->file('document')->store('content/markets/documents', 'public');
        }

        MarketProfile::create([
            'country_name' => $request->country_name,
            'year' => $request->year,
            'slides' => $slidePaths,
            'document_path' => $documentPath,
        ]);

        return redirect()->route('admin.exporter-content.index')->with('success', 'Profil marché ajouté.');
    }

    public function destroyMarketProfile(MarketProfile $marketProfile)
    {
        $marketProfile->delete();

        return redirect()->route('admin.exporter-content.index')->with('success', 'Profil marché supprimé.');
    }

    // ---------- Profils filières ----------

    public function storeFiliereProfile(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'nullable|string|max:20',
            'slides.*' => 'nullable|image|max:4096',
            'document' => 'nullable|file|mimes:pdf|max:8192',
        ]);

        $slidePaths = [];
        if ($request->hasFile('slides')) {
            foreach ($request->file('slides') as $slide) {
                $slidePaths[] = '/storage/' . $slide->store('content/filieres', 'public');
            }
        }

        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = '/storage/' . $request->file('document')->store('content/filieres/documents', 'public');
        }

        FiliereProfile::create([
            'title' => $request->title,
            'year' => $request->year,
            'slides' => $slidePaths,
            'document_path' => $documentPath,
        ]);

        return redirect()->route('admin.exporter-content.index')->with('success', 'Profil filière ajouté.');
    }

    public function destroyFiliereProfile(FiliereProfile $filiereProfile)
    {
        $filiereProfile->delete();

        return redirect()->route('admin.exporter-content.index')->with('success', 'Profil filière supprimé.');
    }

    // ---------- Veille réglementaire : secteurs ----------

    public function storeSector(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50',
        ]);

        Sector::create([
            'name' => $request->name,
            'icon' => $request->icon ?: 'folder',
        ]);

        return redirect()->route('admin.exporter-content.index')->with('success', 'Secteur ajouté.');
    }

    public function destroySector(Sector $sector)
    {
        $sector->delete();

        return redirect()->route('admin.exporter-content.index')->with('success', 'Secteur supprimé.');
    }

    // ---------- Veille réglementaire : documents ----------

    public function storeRegulatoryDocument(Request $request)
    {
        $request->validate([
            'sector_id' => 'required|exists:sectors,id',
            'notifying_member' => 'required|string|max:255',
            'publication_date' => 'nullable|date',
            'document_symbol' => 'nullable|string|max:255',
            'notification_type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'hs_ics_codes' => 'nullable|string|max:255',
            'objectives' => 'nullable|string',
            'document_link' => 'nullable|url|max:255',
        ]);

        RegulatoryDocument::create($request->only([
            'sector_id',
            'notifying_member',
            'publication_date',
            'document_symbol',
            'notification_type',
            'description',
            'hs_ics_codes',
            'objectives',
            'document_link',
        ]));

        return redirect()->route('admin.exporter-content.index')->with('success', 'Notification ajoutée.');
    }

    public function destroyRegulatoryDocument(RegulatoryDocument $regulatoryDocument)
    {
        $regulatoryDocument->delete();

        return redirect()->route('admin.exporter-content.index')->with('success', 'Notification supprimée.');
    }

    // ---------- Inscriptions aux événements ----------

    public function approveRegistration(EventRegistration $registration)
    {
        $registration->update(['status' => 'approved']);

        return redirect()->route('admin.exporter-content.index')->with('success', 'Inscription confirmée.');
    }

    public function rejectRegistration(Request $request, EventRegistration $registration)
    {
        $registration->update([
            'status' => 'rejected',
            'admin_note' => $request->input('admin_note'),
        ]);

        return redirect()->route('admin.exporter-content.index')->with('success', 'Inscription refusée.');
    }
}