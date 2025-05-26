<?php

namespace App\Http\Controllers\Uploader;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Episode;
use App\Models\Subtitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AnimeController extends Controller
{
    public function create()
    {
        return Inertia::render('Uploader/UploadAnime', [
            'categories' => \App\Models\Category::all()
        ]);
    }

    public function store(Request $request)
    {
        // First validate basic anime details
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'type' => 'required|in:OVA,movie,series,special',
            'content_status' => 'required|in:upcoming,airing,finished',
            'cover_image' => 'nullable|image|max:2048', // 2MB max for cover image
        ]);

        // If content_status is not upcoming, validate episodes
        if ($validated['content_status'] !== 'upcoming') {
            $request->validate([
                'episodes' => 'required|array|min:1',
                'episodes.*.title' => 'required|string|max:255',
                'episodes.*.description' => 'required|string',
                'episodes.*.season' => 'required|integer|min:1',
                'episodes.*.episode_number' => 'required|integer|min:1',
                'episodes.*.language' => 'required|in:japanese,english',
                'episodes.*.video_file' => [
                    'required',
                    'file',
                    'mimes:mp4,mkv,avi',
                    'max:5120000000000' // 500MB max per video file
                ],
                'episodes.*.subtitle_file' => [
                    'nullable',
                    'file',
                    'mimes:srt,vtt',
                    'max:1024' // 1MB max for subtitle files
                ],
            ], [
                'episodes.*.video_file.max' => 'The video file size must not exceed 500MB.',
                'episodes.*.video_file.mimes' => 'The video file must be in MP4, MKV, or AVI format.',
                'episodes.*.subtitle_file.max' => 'The subtitle file size must not exceed 1MB.',
                'episodes.*.subtitle_file.mimes' => 'The subtitle file must be in SRT or VTT format.',
            ]);
        }

        // Store cover image if provided
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('covers', 'public');
            $validated['cover_image'] = $coverPath;
        }

        // Create anime
        $anime = Anime::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'type' => $validated['type'],
            'content_status' => $validated['content_status'],
            'approval_status' => 'pending', // Always set to pending for new uploads
            'cover_image' => $validated['cover_image'] ?? null,
            'user_id' => Auth::id()
        ]);

        // Create episodes only if content_status is not upcoming
        if ($validated['content_status'] !== 'upcoming' && $request->hasFile('episodes')) {
            foreach ($request->file('episodes') as $index => $episodeData) {
                try {
                    // Store video file
                    $videoPath = $episodeData['video_file']->store('episodes', 'public');

                    // Create episode
                    $episode = Episode::create([
                        'anime_id' => $anime->id,
                        'title' => $request->input("episodes.{$index}.title"),
                        'description' => $request->input("episodes.{$index}.description"),
                        'season' => $request->input("episodes.{$index}.season"),
                        'episode_number' => $request->input("episodes.{$index}.episode_number"),
                        'video_file' => $videoPath,
                        'language' => $request->input("episodes.{$index}.language")
                    ]);

                    // Store subtitle if provided
                    if (isset($episodeData['subtitle_file'])) {
                        $subtitlePath = $episodeData['subtitle_file']->store('subtitles', 'public');
                        
                        Subtitle::create([
                            'episode_id' => $episode->id,
                            'language' => $request->input("episodes.{$index}.language"),
                            'file_path' => $subtitlePath
                        ]);
                    }
                } catch (\Exception $e) {
                    // If there's an error, delete the anime and its files
                    Storage::disk('public')->delete($anime->cover_image);
                    $anime->delete();
                    
                    return back()->withErrors([
                        'episodes' => 'Error uploading episode: ' . $e->getMessage()
                    ]);
                }
            }
        }

        return redirect()->route('uploader.dashboard')
            ->with('success', 'Anime uploaded successfully and is pending approval.');
    }

    public function addEpisodes(Anime $anime)
    {
        // Check if the user owns this anime
        if ($anime->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Uploader/AddEpisodes', [
            'anime' => $anime->load('episodes')
        ]);
    }

    public function storeEpisodes(Request $request, Anime $anime)
    {
        // Check if the user owns this anime
        if ($anime->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'episodes' => 'required|array|min:1',
            'episodes.*.title' => 'required|string|max:255',
            'episodes.*.description' => 'required|string',
            'episodes.*.season' => 'required|integer|min:1',
            'episodes.*.episode_number' => 'required|integer|min:1',
            'episodes.*.language' => 'required|in:japanese,english',
            'episodes.*.video_file' => [
                'required',
                'file',
                'mimes:mp4,mkv,avi',
                'max:512000' // 500MB max per video file
            ],
            'episodes.*.subtitle_file' => [
                'nullable',
                'file',
                'mimes:srt,vtt',
                'max:1024' // 1MB max for subtitle files
            ],
        ], [
            'episodes.*.video_file.max' => 'The video file size must not exceed 500MB.',
            'episodes.*.video_file.mimes' => 'The video file must be in MP4, MKV, or AVI format.',
            'episodes.*.subtitle_file.max' => 'The subtitle file size must not exceed 1MB.',
            'episodes.*.subtitle_file.mimes' => 'The subtitle file must be in SRT or VTT format.',
        ]);

        foreach ($request->file('episodes') as $index => $episodeData) {
            try {
                // Store video file
                $videoPath = $episodeData['video_file']->store('episodes', 'public');

                // Create episode
                $episode = Episode::create([
                    'anime_id' => $anime->id,
                    'title' => $request->input("episodes.{$index}.title"),
                    'description' => $request->input("episodes.{$index}.description"),
                    'season' => $request->input("episodes.{$index}.season"),
                    'episode_number' => $request->input("episodes.{$index}.episode_number"),
                    'video_file' => $videoPath,
                    'language' => $request->input("episodes.{$index}.language"),
                    'approval_status' => 'pending'
                ]);

                // Store subtitle if provided
                if ($request->hasFile("episodes.{$index}.subtitle_file")) {
                    $subtitleFile = $request->file("episodes.{$index}.subtitle_file");
                    $subtitlePath = $subtitleFile->store('subtitles', 'public');
                    
                    Subtitle::create([
                        'episode_id' => $episode->id,
                        'language' => $request->input("episodes.{$index}.language"),
                        'file_path' => $subtitlePath
                    ]);
                }
            } catch (\Exception $e) {
                return back()->withErrors([
                    'episodes' => 'Error uploading episode: ' . $e->getMessage()
                ]);
            }
        }

        return redirect()->route('uploader.dashboard')
            ->with('success', 'Episodes uploaded successfully and are pending approval.');
    }

    public function episodes()
    {
        $episodes = Episode::with(['anime', 'subtitles'])
            ->whereHas('anime', function($query) {
                $query->where('user_id', Auth::id());
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Uploader/Episodes/Index', [
            'episodes' => $episodes
        ]);
    }

    public function editEpisode(Episode $episode)
    {
        // Check if the uploader owns this episode
        if ($episode->anime->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Uploader/Episodes/Edit', [
            'episode' => $episode->load('anime', 'subtitles')
        ]);
    }

    public function updateEpisode(Request $request, Episode $episode)
    {
        // Check if the uploader owns this episode
        if ($episode->anime->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'season' => 'required|integer|min:1',
            'episode_number' => 'required|integer|min:1',
            'language' => 'required|string|in:japanese,english',
        ]);

        $episode->update($validated);

        return redirect()->route('uploader.episodes')
            ->with('success', 'Episode updated successfully.');
    }

    public function deleteEpisode(Episode $episode)
    {
        // Check if the uploader owns this episode
        if ($episode->anime->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete video file
        if ($episode->video_file) {
            Storage::disk('public')->delete($episode->video_file);
        }

        // Delete subtitles
        foreach ($episode->subtitles as $subtitle) {
            if ($subtitle->file_path) {
                Storage::disk('public')->delete($subtitle->file_path);
            }
            $subtitle->delete();
        }

        $episode->delete();

        return back()->with('success', 'Episode deleted successfully.');
    }

    public function edit(Anime $anime)
    {
        // Check if the user owns this anime
        if ($anime->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Uploader/Anime/Edit', [
            'anime' => $anime->load('category'),
            'categories' => \App\Models\Category::all()
        ]);
    }

    public function update(Request $request, Anime $anime)
    {
        // Check if the user owns this anime
        if ($anime->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,id',
            'type' => 'sometimes|in:tv,movie,ova,ona,special',
            'content_status' => 'sometimes|in:airing,finished,upcoming',
            'cover_image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('cover_image')) {
            // Delete old cover image if exists
            if ($anime->cover_image) {
                Storage::disk('public')->delete($anime->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $anime->update($validated);

        return redirect()->route('uploader.uploads')
            ->with('success', 'Anime updated successfully');
    }

    public function destroy(Anime $anime)
    {
        // Check if the user owns this anime
        if ($anime->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete cover image if exists
        if ($anime->cover_image) {
            Storage::disk('public')->delete($anime->cover_image);
        }

        // Delete all episodes and their files
        foreach ($anime->episodes as $episode) {
            if ($episode->video_file) {
                Storage::disk('public')->delete($episode->video_file);
            }
            $episode->delete();
        }

        $anime->delete();

        return back()->with('success', 'Anime deleted successfully');
    }
} 