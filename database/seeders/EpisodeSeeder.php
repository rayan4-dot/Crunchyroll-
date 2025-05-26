<?php

namespace Database\Seeders;

use App\Models\Anime;
use App\Models\Episode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $animes = Anime::all();

        foreach ($animes as $anime) {
            // Create 12 episodes for each anime series
            if ($anime->type === 'series') {
                for ($i = 1; $i <= 12; $i++) {
                    Episode::create([
                        'anime_id' => $anime->id,
                        'title' => "Episode {$i}",
                        'description' => "Episode {$i} of {$anime->title}",
                        'video_url' => "https://example.com/videos/{$anime->id}/episode-{$i}.mp4",
                        'season' => 1,
                        'episode_number' => $i
                    ]);
                }
            } else {
                // For movies, create a single episode
                Episode::create([
                    'anime_id' => $anime->id,
                    'title' => "Full Movie",
                    'description' => "The complete movie of {$anime->title}",
                    'video_url' => "https://example.com/videos/{$anime->id}/movie.mp4",
                    'season' => 1,
                    'episode_number' => 1
                ]);
            }
        }
    }
}
