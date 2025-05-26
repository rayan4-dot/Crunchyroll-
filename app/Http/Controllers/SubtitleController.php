<?php

namespace App\Http\Controllers;

use App\Models\Subtitle;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubtitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $subtitles = Subtitle::with('episode')->get();
        return response()->json($subtitles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'episode_id' => 'required|exists:episodes,id',
            'language' => 'required|string',
            'file_url' => 'required|string'
        ]);

        $subtitle = Subtitle::create($validated);
        return response()->json($subtitle, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subtitle $subtitle): JsonResponse
    {
        return response()->json($subtitle->load('episode'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subtitle $subtitle): JsonResponse
    {
        $validated = $request->validate([
            'episode_id' => 'sometimes|required|exists:episodes,id',
            'language' => 'sometimes|required|string',
            'file_url' => 'sometimes|required|string'
        ]);

        $subtitle->update($validated);
        return response()->json($subtitle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subtitle $subtitle): JsonResponse
    {
        $subtitle->delete();
        return response()->json(null, 204);
    }

    public function stream(Subtitle $subtitle)
    {
        $path = storage_path('app/public/' . $subtitle->file_path);
        
        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path, [
            'Content-Type' => 'text/vtt',
            'Content-Disposition' => 'inline; filename="' . basename($path) . '"',
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
}
