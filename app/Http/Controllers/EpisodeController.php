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

    public function stream(Episode $episode)
    {
        $path = storage_path('app/public/' . $episode->video_file);
        
        if (!file_exists($path)) {
            abort(404);
        }

        $size = filesize($path);
        $time = date('r', filemtime($path));
        $fm = @fopen($path, 'rb');
        
        if (!$fm) {
            abort(404);
        }

        $begin = 0;
        $end = $size - 1;

        if (isset($_SERVER['HTTP_RANGE'])) {
            if (preg_match('/bytes=\h*(\d+)-(\d*)[\D.*]?/i', $_SERVER['HTTP_RANGE'], $matches)) {
                $begin = intval($matches[1]);
                if (!empty($matches[2])) {
                    $end = intval($matches[2]);
                }
            }
        }

        if ($begin > 0 || $end < ($size - 1)) {
            header('HTTP/1.1 206 Partial Content');
        } else {
            header('HTTP/1.1 200 OK');
        }

        header("Content-Type: video/mp4");
        header('Cache-Control: public, must-revalidate, max-age=0');
        header('Pragma: no-cache');
        header('Accept-Ranges: bytes');
        header('Content-Length:' . ($end - $begin + 1));
        header("Content-Range: bytes $begin-$end/$size");
        header("Last-Modified: $time");
        header('Content-Disposition: inline; filename="' . basename($path) . '"');

        $cur = $begin;
        fseek($fm, $begin, 0);

        while(!feof($fm) && $cur <= $end && (connection_status() == 0)) {
            print fread($fm, min(1024 * 16, ($end - $cur + 1)));
            $cur += 1024 * 16;
        }

        fclose($fm);
        exit;
    }
}
