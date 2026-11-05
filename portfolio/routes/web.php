<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use App\Models\Skill;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public portfolio: skills come from the database
Route::get('/', function () {
    return Inertia::render('Portfolio', [
        'skills' => Skill::orderBy('display_order')->get(),
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Skills CRUD (login required). No show page, so it is excluded.
    Route::resource('skills', SkillController::class)->except('show');
});

require __DIR__.'/auth.php';