<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get role IDs
        $adminRoleId = Role::where('name', 'admin')->first()->id;
        $uploaderRoleId = Role::where('name', 'uploader')->first()->id;
        $userRoleId = Role::where('name', 'user')->first()->id;

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRoleId
        ]);

        // Create uploader user
        User::create([
            'name' => 'Uploader User',
            'email' => 'uploader@example.com',
            'password' => Hash::make('password'),
            'role_id' => $uploaderRoleId
        ]);

        // Create regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRoleId
        ]);

        // Create additional random users with user role
        User::factory(10)->create(['role_id' => $userRoleId]);
    }
}
