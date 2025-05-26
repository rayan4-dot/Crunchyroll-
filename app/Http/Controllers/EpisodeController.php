<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $episodes = Episode::with('anime')->get();
        return response()->json($episodes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'anime_id' => 'required|exists:animes,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'video_url' => 'required|string',
            'season' => 'nullable|integer',
            'episode_number' => 'required|integer'
        ]);

        $episode = Episode::create($validated);
        return response()->json($episode, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Episode $episode): JsonResponse
    {
        return response()->json($episode->load('anime', 'subtitles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Episode $episode): JsonResponse
    {
        $validated = $request->validate([
            'anime_id' => 'sometimes|required|exists:animes,id',
            'title' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'video_url' => 'sometimes|required|string',
            'season' => 'nullable|integer',
            'episode_number' => 'sometimes|required|integer'
        ]);

        $episode->update($validated);
        return response()->json($episode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Episode $episode): JsonResponse
    {
        $episode->delete();
        return response()->json(null, 204);
    }

    public function watch(Episode $episode): JsonResponse
    {
        // Logic to handle video streaming or download
        return response()->json(['video_url' => $episode->video_url]);
    }
}
