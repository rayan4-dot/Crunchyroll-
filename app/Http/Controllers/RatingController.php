<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $ratings = Rating::with(['user', 'anime'])->get();
        return response()->json($ratings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'anime_id' => 'required|exists:animes,id',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $rating = Rating::create($validated);
        return response()->json($rating, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rating $rating): JsonResponse
    {
        return response()->json($rating->load(['user', 'anime']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rating $rating): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'anime_id' => 'sometimes|required|exists:animes,id',
            'rating' => 'sometimes|required|integer|min:1|max:5'
        ]);

        $rating->update($validated);
        return response()->json($rating);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rating $rating): JsonResponse
    {
        $rating->delete();
        return response()->json(null, 204);
    }

    public function rate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'anime_id' => 'required|exists:animes,id',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $rating = Rating::updateOrCreate(
            ['user_id' => $validated['user_id'], 'anime_id' => $validated['anime_id']],
            ['rating' => $validated['rating']]
        );

        return response()->json($rating);
    }
}
