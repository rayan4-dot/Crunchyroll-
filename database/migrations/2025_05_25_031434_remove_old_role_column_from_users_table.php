<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // First, ensure all users have the correct role_id based on their role column
        $roles = [
            'admin' => 3,
            'uploader' => 2,
            'user' => 1
        ];

        foreach ($roles as $roleName => $roleId) {
            DB::table('users')
                ->where('role', $roleName)
                ->update(['role_id' => $roleId]);
        }

        // Then remove the old role column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->after('password');
        });

        // Restore the old role values based on role_id
        $roles = [
            3 => 'admin',
            2 => 'uploader',
            1 => 'user'
        ];

        foreach ($roles as $roleId => $roleName) {
            DB::table('users')
                ->where('role_id', $roleId)
                ->update(['role' => $roleName]);
        }
    }
}; 