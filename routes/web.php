<?php

use App\Http\Controllers\Admin\AdminContentController;
use App\Http\Controllers\Admin\AdminHomeContentController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\EventController;
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
});

require __DIR__.'/auth.php';
