<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Anime;
use App\Models\Category;

class AnimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $categories = [
            'Action' => Category::create(['name' => 'Action']),
            'Adventure' => Category::create(['name' => 'Adventure']),
            'Comedy' => Category::create(['name' => 'Comedy']),
            'Drama' => Category::create(['name' => 'Drama']),
            'Fantasy' => Category::create(['name' => 'Fantasy']),
        ];

        // Create sample animes
        $animes = [
            [
                'title' => 'Attack on Titan',
                'description' => 'In a world where humanity resides within enormous walled cities to protect themselves from Titans, giant humanoid creatures who eat humans seemingly without reason.',
                'category_id' => $categories['Action']->id,
                'status' => 'finished',
                'type' => 'series',
                'cover_image' => 'https://example.com/aot.jpg',
                'video_url' => 'https://example.com/aot.mp4'
            ],
            [
                'title' => 'One Piece',
                'description' => 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.',
                'category_id' => $categories['Adventure']->id,
                'status' => 'airing',
                'type' => 'series',
                'cover_image' => 'https://example.com/onepiece.jpg',
                'video_url' => 'https://example.com/onepiece.mp4'
            ],
            [
                'title' => 'Spirited Away',
                'description' => 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
                'category_id' => $categories['Fantasy']->id,
                'status' => 'finished',
                'type' => 'movie',
                'cover_image' => 'https://example.com/spirited.jpg',
                'video_url' => 'https://example.com/spirited.mp4'
            ],
            [
                'title' => 'Demon Slayer',
                'description' => 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.',
                'category_id' => $categories['Action']->id,
                'status' => 'airing',
                'type' => 'series',
                'cover_image' => 'https://example.com/demonslayer.jpg',
                'video_url' => 'https://example.com/demonslayer.mp4'
            ],
            [
                'title' => 'My Hero Academia',
                'description' => 'In a world where people with superpowers are the norm, Izuku Midoriya has dreams of becoming a hero despite being born Quirkless.',
                'category_id' => $categories['Action']->id,
                'status' => 'airing',
                'type' => 'series',
                'cover_image' => 'https://example.com/mha.jpg',
                'video_url' => 'https://example.com/mha.mp4'
            ],
            [
                'title' => 'Jujutsu Kaisen',
                'description' => 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
                'category_id' => $categories['Action']->id,
                'status' => 'airing',
                'type' => 'series',
                'cover_image' => 'https://example.com/jjk.jpg',
                'video_url' => 'https://example.com/jjk.mp4'
            ],
            [
                'title' => 'Death Note',
                'description' => 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim\'s name while picturing their face.',
                'category_id' => $categories['Drama']->id,
                'status' => 'finished',
                'type' => 'series',
                'cover_image' => 'https://example.com/deathnote.jpg',
                'video_url' => 'https://example.com/deathnote.mp4'
            ],
            [
                'title' => 'Your Name',
                'description' => 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
                'category_id' => $categories['Drama']->id,
                'status' => 'finished',
                'type' => 'movie',
                'cover_image' => 'https://example.com/yourname.jpg',
                'video_url' => 'https://example.com/yourname.mp4'
            ]
        ];

        foreach ($animes as $anime) {
            Anime::create($anime);
        }

        // Create additional random animes
        Anime::factory(20)->create();
    }
}
