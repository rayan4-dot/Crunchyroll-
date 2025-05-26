<?php

namespace Database\Seeders;

use App\Models\AnimeUploader;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnimeUploaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRole = Role::where('name', 'user')->first();
        $users = User::where('role_id', $userRole->id)->get();
        $statuses = ['pending', 'approved', 'rejected'];

        foreach ($users as $user) {
            // Create an uploader request for each regular user
            AnimeUploader::create([
                'user_id' => $user->id,
                'status' => $statuses[array_rand($statuses)],
                'approved_at' => now(),
                'reason' => fake()->sentence()
            ]);
        }
    }
}
