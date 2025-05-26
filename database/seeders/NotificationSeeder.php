<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $notificationTypes = [
            'new_episode' => [
                'New episode of Attack on Titan Season 4 is now available!',
                'One Piece Episode 1000 is out now!',
                'Demon Slayer: Entertainment District Arc Episode 1 is here!'
            ],
            'system_announcement' => [
                'Welcome to our new anime streaming platform!',
                'New features have been added to enhance your viewing experience.',
                'System maintenance scheduled for next week.'
            ],
            'upload_approved' => [
                'Your upload of "My Hero Academia" has been approved!',
                'Your upload of "Jujutsu Kaisen" is now live!'
            ],
            'upload_rejected' => [
                'Your upload of "Naruto" was rejected due to quality issues.',
                'Please check the guidelines for your rejected upload.'
            ]
        ];

        foreach ($users as $user) {
            // Create 2-4 random notifications for each user
            $numNotifications = rand(2, 4);
            for ($i = 0; $i < $numNotifications; $i++) {
                $type = array_rand($notificationTypes);
                $message = $notificationTypes[$type][array_rand($notificationTypes[$type])];
                
                Notification::create([
                    'user_id' => $user->id,
                    'message' => $message,
                    'type' => $type,
                    'read_status' => rand(0, 1)
                ]);
            }
        }
    }
}
