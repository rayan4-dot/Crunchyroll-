<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Anime;
use App\Models\Category;
use App\Models\Episode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    public function index()
    {
        $recentEpisodes = \App\Models\Episode::with(['anime', 'anime.category'])
            ->latest()
            ->take(10)
            ->get();

        $pendingAnimes = \App\Models\Anime::with('category')
            ->where('approval_status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        $pendingEpisodes = \App\Models\Episode::with(['anime', 'anime.category'])
            ->where('approval_status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'recentEpisodes' => $recentEpisodes,
            'pendingAnimes' => $pendingAnimes,
            'pendingEpisodes' => $pendingEpisodes
        ]);
    }

    public function approveAnime(Anime $anime)
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

        return back()->with('success', 'Anime and its episodes approved successfully');
    }

    public function rejectAnime(Anime $anime)
    {
        $anime->update([
            'approval_status' => 'rejected'
        ]);

        // Also reject all pending episodes
        $anime->episodes()->where('approval_status', 'pending')->update([
            'approval_status' => 'rejected'
        ]);

        return back()->with('success', 'Anime and its episodes rejected successfully');
    }

    public function watchEpisode(Episode $episode)
    {
        return Inertia::render('Admin/WatchEpisode', [
            'episode' => $episode->load('anime', 'subtitles')
        ]);
    }

    public function approveEpisode(Request $request, Episode $episode)
    {
        // Check if the episode has been watched
        if (!$request->session()->has('watched_episode_' . $episode->id)) {
            return back()->with('error', 'You must watch the episode before approving it.');
        }

        $episode->update([
            'approval_status' => 'approved',
            'approved_at' => now()
        ]);

        return back()->with('success', 'Episode approved successfully.');
    }

    public function rejectEpisode(Request $request, Episode $episode)
    {
        // Check if the episode has been watched
        if (!$request->session()->has('watched_episode_' . $episode->id)) {
            return back()->with('error', 'You must watch the episode before rejecting it.');
        }

        $episode->update([
            'approval_status' => 'rejected',
            'approved_at' => now()
        ]);

        return back()->with('success', 'Episode rejected successfully.');
    }

    public function manageCategories()
    {
        $categories = Category::withCount('animes')->get();
        return Inertia::render('Admin/Categories', [
            'categories' => $categories
        ]);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        Category::create($validated);
        return back()->with('success', 'Category created successfully');
    }

    public function updateCategory(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($validated);
        return back()->with('success', 'Category updated successfully');
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Category deleted successfully');
    }

    public function users()
    {
        $users = User::with('role')->get();
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function markEpisodeWatched(Episode $episode)
    {
        // Store in session that this episode has been watched
        session()->put("watched_episode_{$episode->id}", true);
        
        return back();
    }

    public function episodes()
    {
        $episodes = Episode::with(['anime', 'subtitles'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Episodes/Index', [
            'episodes' => $episodes
        ]);
    }

    public function editEpisode(Episode $episode)
    {
        return Inertia::render('Admin/Episodes/Edit', [
            'episode' => $episode->load('anime', 'subtitles')
        ]);
    }

    public function updateEpisode(Request $request, Episode $episode)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'season' => 'required|integer|min:1',
            'episode_number' => 'required|integer|min:1',
            'language' => 'required|string|in:japanese,english',
        ]);

        $episode->update($validated);

        return redirect()->route('admin.episodes')
            ->with('success', 'Episode updated successfully.');
    }

    public function deleteEpisode(Episode $episode)
    {
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
} 