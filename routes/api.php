<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\AnimeUploaderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SubtitleController;
use App\Http\Controllers\UserActivityController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::get('/animes', [AnimeController::class, 'index']);
Route::get('/animes/{anime}', [AnimeController::class, 'show']);
Route::get('/animes/filter', [AnimeController::class, 'filter']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::get('/episodes', [EpisodeController::class, 'index']);
Route::get('/episodes/{episode}', [EpisodeController::class, 'show']);
Route::get('/episodes/{episode}/watch', [EpisodeController::class, 'watch']);
Route::get('/subtitles', [SubtitleController::class, 'index']);
Route::get('/subtitles/{subtitle}', [SubtitleController::class, 'show']);
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    // Profile routes
    Route::put('/user/profile', [ProfileController::class, 'update']);
    Route::delete('/user/profile', [ProfileController::class, 'destroy']);

    // Anime routes (protected)
    Route::get('/animes/{anime}/episodes', [AnimeController::class, 'episodes']);
    Route::get('/animes/{anime}/episodes/{episode}/subtitles', [AnimeController::class, 'subtitles']);
    Route::post('/animes', [AnimeController::class, 'store'])->middleware('role:uploader,admin');
    Route::put('/animes/{anime}', [AnimeController::class, 'update'])->middleware('role:uploader,admin');
    Route::delete('/animes/{anime}', [AnimeController::class, 'destroy'])->middleware('role:admin');

    // User anime interactions
    Route::post('/animes/{anime}/favorite', [AnimeController::class, 'addToFavorites']);
    Route::delete('/animes/{anime}/favorite', [AnimeController::class, 'removeFromFavorites']);
    Route::post('/animes/{anime}/watch-later', [AnimeController::class, 'addToWatchLater']);
    Route::delete('/animes/{anime}/watch-later', [AnimeController::class, 'removeFromWatchLater']);

    // Category routes
    Route::post('/categories', [CategoryController::class, 'store'])->middleware('role:admin');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->middleware('role:admin');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->middleware('role:admin');

    // Episode routes
    Route::post('/episodes', [EpisodeController::class, 'store'])->middleware('role:uploader,admin');
    Route::put('/episodes/{episode}', [EpisodeController::class, 'update'])->middleware('role:uploader,admin');
    Route::delete('/episodes/{episode}', [EpisodeController::class, 'destroy'])->middleware('role:admin');

    // Subtitle routes
    Route::post('/subtitles', [SubtitleController::class, 'store'])->middleware('role:uploader,admin');
    Route::put('/subtitles/{subtitle}', [SubtitleController::class, 'update'])->middleware('role:uploader,admin');
    Route::delete('/subtitles/{subtitle}', [SubtitleController::class, 'destroy'])->middleware('role:admin');

    // User activity routes
    Route::get('/user/activities', [UserActivityController::class, 'index']);
    Route::post('/user/activities', [UserActivityController::class, 'store']);
    Route::post('/user/activities/toggle', [UserActivityController::class, 'toggle']);
    Route::delete('/user/activities/{userActivity}', [UserActivityController::class, 'destroy']);

    // Rating routes
    Route::get('/ratings', [RatingController::class, 'index']);
    Route::post('/ratings', [RatingController::class, 'store']);
    Route::post('/ratings/rate', [RatingController::class, 'rate']);
    Route::put('/ratings/{rating}', [RatingController::class, 'update']);
    Route::delete('/ratings/{rating}', [RatingController::class, 'destroy']);

    // Notification routes
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::post('/notifications/send', [NotificationController::class, 'send']);
    Route::put('/notifications/{notification}', [NotificationController::class, 'update']);
    Route::put('/notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy']);

    // Uploader routes
    Route::get('/uploaders', [AnimeUploaderController::class, 'index'])->middleware('role:admin');
    Route::post('/uploaders/request', [AnimeUploaderController::class, 'request']);
    Route::put('/uploaders/{animeUploader}/approve', [AnimeUploaderController::class, 'approve'])->middleware('role:admin');
    Route::put('/uploaders/{animeUploader}/reject', [AnimeUploaderController::class, 'reject'])->middleware('role:admin');
}); 