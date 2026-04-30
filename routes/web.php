<?php

use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\SalesPageController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');

    Route::resource('sales-pages', SalesPageController::class)
        ->only(['index', 'create', 'store', 'show', 'destroy']);
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

require __DIR__ . '/settings.php';