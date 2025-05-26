<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Anime;
use App\Models\Category;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Home', [
        'featuredAnimes' => Anime::with('category')->latest()->take(6)->get(),
        'auth' => [
            'user' => Auth::check() ? Auth::user() : null
        ]
    ]);
});

Route::get('/animes', function () {
    return Inertia::render('Animes/Index', [
        'animes' => Anime::with('category')->latest()->paginate(12),
        'auth' => [
            'user' => Auth::check() ? Auth::user() : null
        ]
    ]);
})->name('animes.index');

Route::get('/animes/{id}', function ($id) {
    return Inertia::render('Animes/Show', [
        'anime' => Anime::with('category')->findOrFail($id),
        'auth' => [
            'user' => Auth::check() ? Auth::user() : null
        ]
    ]);
})->name('animes.show');

Route::get('/categories', function () {
    return Inertia::render('Categories/Index', [
        'auth' => [
            'user' => Auth::check() ? Auth::user() : null
        ]
    ]);
})->name('categories.index');

Route::get('/test-notifications', function () {
    return view('test-notifications');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Test route for video access
Route::get('/test-video/{filename}', function ($filename) {
    $path = storage_path('app/public/episodes/' . $filename);
    if (!file_exists($path)) {
        abort(404);
    }
    return response()->file($path);
})->name('test.video');

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [App\Http\Controllers\Admin\DashboardController::class, 'users'])->name('users');
    Route::get('/categories', [App\Http\Controllers\Admin\DashboardController::class, 'manageCategories'])->name('categories');
    Route::get('/content', [App\Http\Controllers\Admin\ContentController::class, 'index'])->name('content');
    
    // Episode approval routes
    Route::get('/episodes/{episode}/watch', [App\Http\Controllers\Admin\DashboardController::class, 'watchEpisode'])->name('episodes.watch');
    Route::post('/episodes/{episode}/mark-watched', [App\Http\Controllers\Admin\DashboardController::class, 'markEpisodeWatched'])->name('episodes.mark-watched');
    Route::post('/episodes/{episode}/approve', [App\Http\Controllers\Admin\DashboardController::class, 'approveEpisode'])->name('episodes.approve');
    Route::post('/episodes/{episode}/reject', [App\Http\Controllers\Admin\DashboardController::class, 'rejectEpisode'])->name('episodes.reject');
    
    Route::post('/animes/{anime}/approve', [App\Http\Controllers\Admin\DashboardController::class, 'approveAnime'])->name('animes.approve');
    Route::post('/animes/{anime}/reject', [App\Http\Controllers\Admin\DashboardController::class, 'rejectAnime'])->name('animes.reject');
    Route::post('/categories', [App\Http\Controllers\Admin\DashboardController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{category}', [App\Http\Controllers\Admin\DashboardController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [App\Http\Controllers\Admin\DashboardController::class, 'deleteCategory'])->name('categories.delete');
    
    // Uploader management routes
    Route::get('/uploaders', [App\Http\Controllers\Admin\UploaderController::class, 'index'])->name('uploaders');
    Route::post('/uploaders/{uploader}/approve', [App\Http\Controllers\Admin\UploaderController::class, 'approve'])->name('uploaders.approve');
    Route::post('/uploaders/{uploader}/reject', [App\Http\Controllers\Admin\UploaderController::class, 'reject'])->name('uploaders.reject');
    
    // Pending Anime management routes
    Route::get('/pending-content', [App\Http\Controllers\Admin\ContentController::class, 'index'])->name('pending-content');
    Route::post('/pending-content/{anime}/approve', [App\Http\Controllers\Admin\ContentController::class, 'approve'])->name('pending-content.approve');
    Route::post('/pending-content/{anime}/reject', [App\Http\Controllers\Admin\ContentController::class, 'reject'])->name('pending-content.reject');
});

// Uploader Routes
Route::middleware(['auth', 'role:uploader'])->prefix('uploader')->name('uploader.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Uploader\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/uploads', [\App\Http\Controllers\Uploader\DashboardController::class, 'uploads'])->name('uploads');
    Route::get('/anime/create', [\App\Http\Controllers\Uploader\AnimeController::class, 'create'])->name('anime.create');
    Route::post('/anime', [\App\Http\Controllers\Uploader\AnimeController::class, 'store'])->name('anime.store');
    Route::get('/anime/{anime}/edit', [\App\Http\Controllers\Uploader\AnimeController::class, 'edit'])->name('anime.edit');
    Route::put('/anime/{anime}', [\App\Http\Controllers\Uploader\AnimeController::class, 'update'])->name('anime.update');
    Route::delete('/anime/{anime}', [\App\Http\Controllers\Uploader\AnimeController::class, 'destroy'])->name('anime.destroy');
    
    // Episode management routes
    Route::get('/episodes', [\App\Http\Controllers\Uploader\AnimeController::class, 'episodes'])->name('episodes');
    Route::get('/episodes/{episode}/edit', [\App\Http\Controllers\Uploader\AnimeController::class, 'editEpisode'])->name('episodes.edit');
    Route::put('/episodes/{episode}', [\App\Http\Controllers\Uploader\AnimeController::class, 'updateEpisode'])->name('episodes.update');
    Route::delete('/episodes/{episode}', [\App\Http\Controllers\Uploader\AnimeController::class, 'deleteEpisode'])->name('episodes.delete');
    
    // Existing episode routes
    Route::get('/anime/{anime}/episodes/add', [\App\Http\Controllers\Uploader\AnimeController::class, 'addEpisodes'])->name('anime.episodes.add');
    Route::post('/anime/{anime}/episodes', [\App\Http\Controllers\Uploader\AnimeController::class, 'storeEpisodes'])->name('anime.episodes.store');
});

require __DIR__.'/auth.php';
