<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin role
        Role::create([
            'name' => 'admin'
        ]);

        // Create uploader role
        Role::create([
            'name' => 'uploader'
        ]);

        // Create user role
        Role::create([
            'name' => 'user'
        ]);
    }
}
