<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->string('video_file')->nullable()->after('description');
            if (Schema::hasColumn('episodes', 'video_url')) {
                $table->dropColumn('video_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropColumn('video_file');
            $table->string('video_url')->nullable()->after('description');
        });
    }
}; 