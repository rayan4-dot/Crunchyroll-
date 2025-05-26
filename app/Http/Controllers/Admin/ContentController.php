<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function index()
    {
        $pendingContent = Anime::with(['category', 'user'])
            ->where('approval_status', 'pending')
            ->latest()
            ->get();

        return Inertia::render('Admin/PendingContent', [
            'pendingContent' => $pendingContent
        ]);
    }

    public function approve(Anime $anime)
    {
        $anime->update([
            'approval_status' => 'approved',
            'approved_at' => now()
        ]);

        // Also approve all pending episodes
        $anime->episodes()->where('approval_status', 'pending')->update([
            'approval_status' => 'approved',
            'approved_at' => now()
        ]);

        return back()->with('success', 'Anime approved successfully');
    }

    public function reject(Anime $anime)
    {
        $anime->update([
            'approval_status' => 'rejected'
        ]);

        // Also reject all pending episodes
        $anime->episodes()->where('approval_status', 'pending')->update([
            'approval_status' => 'rejected'
        ]);

        return back()->with('success', 'Anime rejected successfully');
    }
} 