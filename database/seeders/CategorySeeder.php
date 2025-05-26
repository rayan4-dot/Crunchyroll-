<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Action',
            'Adventure',
            'Comedy',
            'Drama',
            'Fantasy',
            'Horror',
            'Mecha',
            'Mystery',
            'Romance',
            'Sci-Fi',
            'Slice of Life',
            'Sports',
            'Supernatural',
            'Thriller'
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
