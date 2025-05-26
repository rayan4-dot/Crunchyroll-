<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AnimeUploader;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UploaderController extends Controller
{
    public function index()
    {
        $uploaders = AnimeUploader::with('user')
            ->latest()
            ->get();

        return Inertia::render('Admin/Uploaders', [
            'uploaders' => $uploaders
        ]);
    }

    public function approve(AnimeUploader $uploader)
    {
        $uploader->update([
            'status' => 'approved',
            'approved_at' => now()
        ]);

        return back()->with('success', 'Uploader approved successfully');
    }

    public function reject(AnimeUploader $uploader)
    {
        $uploader->update([
            'status' => 'rejected'
        ]);

        return back()->with('success', 'Uploader rejected successfully');
    }
} 