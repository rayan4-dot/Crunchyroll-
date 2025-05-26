<?php

namespace Database\Seeders;

use App\Models\Episode;
use App\Models\Subtitle;
use Illuminate\Database\Seeder;

class SubtitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $episodes = Episode::all();
        $languages = ['en', 'es', 'fr', 'de', 'it'];

        foreach ($episodes as $episode) {
            // Create subtitles for each language
            foreach ($languages as $language) {
                Subtitle::create([
                    'episode_id' => $episode->id,
                    'language' => $language,
                    'file_url' => "https://example.com/subtitles/{$episode->id}/{$language}.srt"
                ]);
            }
        }
    }
}
