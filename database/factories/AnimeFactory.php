<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->words(3, true),
            'description' => fake()->paragraph(),
            'category_id' => Category::inRandomOrder()->first()->id,
            'status' => fake()->randomElement(['airing', 'finished', 'upcoming']),
            'type' => fake()->randomElement(['OVA', 'movie', 'series', 'special']),
            'cover_image' => fake()->imageUrl(640, 480, 'anime', true),
            'video_url' => fake()->url(),
        ];
    }
} 