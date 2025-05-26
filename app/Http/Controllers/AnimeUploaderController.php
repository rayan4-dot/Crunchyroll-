<?php

namespace App\Http\Controllers;

use App\Models\AnimeUploader;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AnimeUploaderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $uploaders = AnimeUploader::with('user')->get();
        return response()->json($uploaders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,approved,rejected',
            'approved_at' => 'nullable|date'
        ]);

        $uploader = AnimeUploader::create($validated);
        return response()->json($uploader, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(AnimeUploader $animeUploader): JsonResponse
    {
        return response()->json($animeUploader->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnimeUploader $animeUploader): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'status' => 'sometimes|required|in:pending,approved,rejected',
            'approved_at' => 'nullable|date'
        ]);

        $animeUploader->update($validated);
        return response()->json($animeUploader);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnimeUploader $animeUploader): JsonResponse
    {
        $animeUploader->delete();
        return response()->json(null, 204);
    }

    public function request(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $uploader = AnimeUploader::create([
            'user_id' => $validated['user_id'],
            'status' => 'pending'
        ]);

        return response()->json($uploader, 201);
    }

    public function approve(AnimeUploader $animeUploader): JsonResponse
    {
        $animeUploader->update([
            'status' => 'approved',
            'approved_at' => now()
        ]);

        return response()->json($animeUploader);
    }

    public function reject(AnimeUploader $animeUploader): JsonResponse
    {
        $animeUploader->update([
            'status' => 'rejected'
        ]);

        return response()->json($animeUploader);
    }
}
