<?php

namespace Database\Seeders;

use App\Models\Anime;
use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $animes = Anime::all();

        foreach ($users as $user) {
            // Add 3 random animes to favorites
            $favoriteAnimes = $animes->random(3);
            foreach ($favoriteAnimes as $anime) {
                UserActivity::create([
                    'user_id' => $user->id,
                    'anime_id' => $anime->id,
                    'action_type' => 'favorites'
                ]);
            }

            // Add 4 random animes to watch later
            $watchLaterAnimes = $animes->random(4);
            foreach ($watchLaterAnimes as $anime) {
                UserActivity::create([
                    'user_id' => $user->id,
                    'anime_id' => $anime->id,
                    'action_type' => 'watch_later'
                ]);
            }

            // Add 5 random animes to watch history
            $watchHistoryAnimes = $animes->random(5);
            foreach ($watchHistoryAnimes as $anime) {
                UserActivity::create([
                    'user_id' => $user->id,
                    'anime_id' => $anime->id,
                    'action_type' => 'watch_history'
                ]);
            }
        }
    }
}
