<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            // First, drop the existing status column
            $table->dropColumn('status');
            
            // Add the new columns
            $table->enum('content_status', ['airing', 'finished', 'upcoming'])->after('category_id');
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('pending')->after('content_status');
            $table->timestamp('approved_at')->nullable()->after('approval_status');
        });
    }

    public function down(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            // Drop the new columns
            $table->dropColumn(['content_status', 'approval_status', 'approved_at']);
            
            // Re-add the original status column
            $table->enum('status', ['airing', 'finished', 'upcoming'])->after('category_id');
        });
    }
}; 