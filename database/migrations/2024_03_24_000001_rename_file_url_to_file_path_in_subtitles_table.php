<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subtitles', function (Blueprint $table) {
            $table->renameColumn('file_url', 'file_path');
        });
    }

    public function down(): void
    {
        Schema::table('subtitles', function (Blueprint $table) {
            $table->renameColumn('file_path', 'file_url');
        });
    }
}; 