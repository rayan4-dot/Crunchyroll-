<?php

namespace Database\Seeders;

use App\Models\Anime;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $animes = Anime::all();

        // Create random ratings for each user
        foreach ($users as $user) {
            // Each user rates 5 random animes
            $randomAnimes = $animes->random(5);
            foreach ($randomAnimes as $anime) {
                Rating::create([
                    'user_id' => $user->id,
                    'anime_id' => $anime->id,
                    'rating' => rand(1, 5)
                ]);
            }
        }
    }
}
