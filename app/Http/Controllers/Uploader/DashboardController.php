<?php

namespace App\Http\Controllers\Uploader;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Episode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalUploads' => Anime::where('user_id', Auth::id())->count(),
            'pendingUploads' => Anime::where('user_id', Auth::id())->where('approval_status', 'pending')->count(),
            'approvedUploads' => Anime::where('user_id', Auth::id())->where('approval_status', 'approved')->count(),
            'totalEpisodes' => Episode::whereHas('anime', function($query) {
                $query->where('user_id', Auth::id());
            })->count(),
            'pendingEpisodes' => Episode::whereHas('anime', function($query) {
                $query->where('user_id', Auth::id());
            })->where('approval_status', 'pending')->count(),
            'approvedEpisodes' => Episode::whereHas('anime', function($query) {
                $query->where('user_id', Auth::id());
            })->where('approval_status', 'approved')->count(),
        ];

        $recentUploads = Anime::with(['category', 'episodes' => function($query) {
            $query->latest();
        }])
        ->where('user_id', Auth::id())
        ->latest()
        ->take(5)
        ->get();

        return Inertia::render('Uploader/Dashboard', [
            'stats' => $stats,
            'recentUploads' => $recentUploads
        ]);
    }

    public function uploads()
    {
        $uploads = Anime::with(['category', 'episodes' => function($query) {
            $query->latest();
        }])
        ->where('user_id', Auth::id())
        ->latest()
        ->get();

        return Inertia::render('Uploader/MyUploads', [
            'uploads' => $uploads
        ]);
    }
} 