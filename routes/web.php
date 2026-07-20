<?php

use App\Http\Controllers\Admin\AdminContentController;
use App\Http\Controllers\Admin\AdminExporterContentController;
use App\Http\Controllers\Admin\AdminHomeContentController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ExporterSpaceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/events', [EventController::class, 'index'])->name('events.index');

Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/waiting-approval', function () {
    return Inertia::render('Auth/WaitingApproval', [
        'status' => auth()->user()->status->value,
    ]);
})->middleware('auth')->name('waiting-approval');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Espace bénéficiaire "Exportateur" : accessible après connexion aux utilisateurs
// dont le rôle est "exportateur" (et dont le compte est approuvé, via CheckUserStatus).
Route::middleware(['auth', 'exportateur'])->prefix('espace-exportateur')->name('exporter.')->group(function () {
    Route::get('/profils-marches', [ExporterSpaceController::class, 'marches'])->name('marches');
    Route::get('/profils-filieres', [ExporterSpaceController::class, 'filieres'])->name('filieres');
    Route::get('/veille-reglementaire', [ExporterSpaceController::class, 'veille'])->name('veille');
    Route::get('/evenements', [ExporterSpaceController::class, 'evenements'])->name('evenements');
    Route::post('/evenements/{event}/inscription', [ExporterSpaceController::class, 'registerEvent'])->name('events.register');
});

Route::middleware(['auth', 'gestionnaire'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/approvals', [AdminUserController::class, 'index'])->name('approvals.index');
    Route::get('/approvals/{user}', [AdminUserController::class, 'show'])->name('approvals.show');
    Route::put('/approvals/{user}', [AdminUserController::class, 'update'])->name('approvals.update');
    Route::delete('/approvals/{user}', [AdminUserController::class, 'destroy'])->name('approvals.destroy');
    Route::post('/approvals/{user}/approve', [AdminUserController::class, 'approve'])->name('approvals.approve');
    Route::post('/approvals/{user}/reject', [AdminUserController::class, 'reject'])->name('approvals.reject');

    Route::get('/content', [AdminContentController::class, 'index'])->name('content.index');
    Route::post('/content/news', [AdminContentController::class, 'storeNews'])->name('content.news.store');
    Route::delete('/content/news/{news}', [AdminContentController::class, 'destroyNews'])->name('content.news.destroy');
    Route::post('/content/events', [AdminContentController::class, 'storeEvent'])->name('content.event.store');
    Route::post('/content/events/{event}', [AdminContentController::class, 'updateEvent'])->name('content.event.update');
    Route::delete('/content/events/{event}', [AdminContentController::class, 'destroyEvent'])->name('content.event.destroy');
    Route::post('/content/media', [AdminContentController::class, 'storeMedia'])->name('content.media.store');
    Route::delete('/content/media/{media}', [AdminContentController::class, 'destroyMedia'])->name('content.media.destroy');

    Route::get('/home-content', [AdminHomeContentController::class, 'edit'])->name('home-content.edit');
    Route::put('/home-content', [AdminHomeContentController::class, 'update'])->name('home-content.update');

    // ---- Beneficiary Space Content > Exporter Content Management ----
    Route::prefix('exporter-content')->name('exporter-content.')->group(function () {
        Route::get('/', [AdminExporterContentController::class, 'index'])->name('index');

        Route::post('/market-profiles', [AdminExporterContentController::class, 'storeMarketProfile'])->name('market-profiles.store');
        Route::delete('/market-profiles/{marketProfile}', [AdminExporterContentController::class, 'destroyMarketProfile'])->name('market-profiles.destroy');

        Route::post('/filiere-profiles', [AdminExporterContentController::class, 'storeFiliereProfile'])->name('filiere-profiles.store');
        Route::delete('/filiere-profiles/{filiereProfile}', [AdminExporterContentController::class, 'destroyFiliereProfile'])->name('filiere-profiles.destroy');

        Route::post('/sectors', [AdminExporterContentController::class, 'storeSector'])->name('sectors.store');
        Route::delete('/sectors/{sector}', [AdminExporterContentController::class, 'destroySector'])->name('sectors.destroy');

        Route::post('/regulatory-documents', [AdminExporterContentController::class, 'storeRegulatoryDocument'])->name('regulatory-documents.store');
        Route::delete('/regulatory-documents/{regulatoryDocument}', [AdminExporterContentController::class, 'destroyRegulatoryDocument'])->name('regulatory-documents.destroy');

        Route::post('/registrations/{registration}/approve', [AdminExporterContentController::class, 'approveRegistration'])->name('registrations.approve');
        Route::post('/registrations/{registration}/reject', [AdminExporterContentController::class, 'rejectRegistration'])->name('registrations.reject');
    });

    // ---- Beneficiary Space Content > Investor Content Management (placeholder, à développer) ----
    Route::get('/investor-content', function () {
        return Inertia::render('Admin/InvestorContent/Index');
    })->name('investor-content.index');
});

require __DIR__.'/auth.php';