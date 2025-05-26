<?php

namespace Database\Seeders;

use App\Events\NewNotification;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class TestNotificationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $notificationTypes = [
            'new_episode' => 'New episode of Attack on Titan is available!',
            'upload_approved' => 'Your upload has been approved by admin.',
            'upload_rejected' => 'Your upload has been rejected. Please check the guidelines.',
            'system_announcement' => 'System maintenance scheduled for tomorrow.',
            'test' => 'This is a test notification.'
        ];

        foreach ($users as $user) {
            foreach ($notificationTypes as $type => $message) {
                $notification = Notification::create([
                    'user_id' => $user->id,
                    'message' => $message,
                    'type' => $type,
                    'read_status' => false
                ]);

                Log::info('Broadcasting notification', [
                    'notification_id' => $notification->id,
                    'type' => $type,
                    'message' => $message
                ]);

                try {
                    broadcast(new NewNotification($notification))->toOthers();
                    Log::info('Notification broadcasted successfully');
                } catch (\Exception $e) {
                    Log::error('Failed to broadcast notification', [
                        'error' => $e->getMessage()
                    ]);
                }
            }
        }
    }
} 