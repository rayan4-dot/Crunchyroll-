<?php

namespace App\Http\Controllers;

use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $activities = UserActivity::with(['user', 'anime'])->get();
        return response()->json($activities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'anime_id' => 'required|exists:animes,id',
            'action_type' => 'required|in:watch_history,favorites,watch_later,continue_watching'
        ]);

        $activity = UserActivity::create($validated);
        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserActivity $userActivity): JsonResponse
    {
        return response()->json($userActivity->load(['user', 'anime']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserActivity $userActivity): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'anime_id' => 'sometimes|required|exists:animes,id',
            'action_type' => 'sometimes|required|in:watch_history,favorites,watch_later,continue_watching'
        ]);

        $userActivity->update($validated);
        return response()->json($userActivity);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserActivity $userActivity): JsonResponse
    {
        $userActivity->delete();
        return response()->json(null, 204);
    }

    public function toggle(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'anime_id' => 'required|exists:animes,id',
            'action_type' => 'required|in:watch_history,favorites,watch_later,continue_watching'
        ]);

        $activity = UserActivity::where($validated)->first();

        if ($activity) {
            $activity->delete();
            return response()->json(['message' => 'Activity removed']);
        }

        $activity = UserActivity::create($validated);
        return response()->json($activity, 201);
    }
}
