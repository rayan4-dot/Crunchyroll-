<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Subtitle;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Anime::with('category');

            // Handle search
            if ($request->has('search')) {
                $searchTerm = $request->get('search');
                $query->where(function($q) use ($searchTerm) {
                    $q->where('title', 'like', "%{$searchTerm}%")
                      ->orWhere('description', 'like', "%{$searchTerm}%");
                });
            }

            // Handle category filter
            if ($request->has('category')) {
                $query->where('category_id', $request->get('category'));
            }

            // Handle status filter
            if ($request->has('status')) {
                $query->where('status', $request->get('status'));
            }

            // Handle type filter
            if ($request->has('type')) {
                $query->where('type', $request->get('type'));
            }

            // Handle sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            $animes = $query->paginate(12);

            return response()->json([
                'data' => $animes->items(),
                'meta' => [
                    'current_page' => $animes->currentPage(),
                    'last_page' => $animes->lastPage(),
                    'per_page' => $animes->perPage(),
                    'total' => $animes->total()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching animes: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:airing,finished,upcoming',
            'type' => 'required|in:OVA,movie,series,special',
            'cover_image' => 'nullable|url',
            'video_url' => 'required|url'
        ]);

        $anime = Anime::create($validated);
        return response()->json($anime, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Anime $anime): JsonResponse
    {
        $anime->load('category');
        return response()->json($anime);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Anime $anime): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'category_id' => 'exists:categories,id',
            'status' => 'in:airing,finished,upcoming',
            'type' => 'in:OVA,movie,series,special',
            'cover_image' => 'nullable|url',
            'video_url' => 'url'
        ]);

        $anime->update($validated);
        return response()->json($anime);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anime $anime): JsonResponse
    {
        $anime->delete();
        return response()->json(null, 204);
    }

    public function filter(Request $request): JsonResponse
    {
        $query = Anime::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $animes = $query->with('category')->get();
        return response()->json($animes);
    }

    public function episodes(Anime $anime): JsonResponse
    {
        $episodes = $anime->episodes()
            ->orderBy('episode_number')
            ->get();

        return response()->json($episodes);
    }

    public function subtitles(Anime $anime, Episode $episode): JsonResponse
    {
        $subtitles = $episode->subtitles()
            ->orderBy('language')
            ->get();

        return response()->json($subtitles);
    }

    public function addToFavorites(Anime $anime): JsonResponse
    {
        $user = Auth::user();
        $user->favorites()->attach($anime->id);

        return response()->json(['message' => 'Anime added to favorites']);
    }

    public function removeFromFavorites(Anime $anime): JsonResponse
    {
        $user = Auth::user();
        $user->favorites()->detach($anime->id);

        return response()->json(['message' => 'Anime removed from favorites']);
    }

    public function addToWatchLater(Anime $anime): JsonResponse
    {
        $user = Auth::user();
        $user->watchLater()->attach($anime->id);

        return response()->json(['message' => 'Anime added to watch later']);
    }

    public function removeFromWatchLater(Anime $anime): JsonResponse
    {
        $user = Auth::user();
        $user->watchLater()->detach($anime->id);

        return response()->json(['message' => 'Anime removed from watch later']);
    }
}
