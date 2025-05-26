<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subtitle extends Model
{
    protected $fillable = [
        'episode_id',
        'language',
        'file_path'
    ];

    public function episode(): BelongsTo
    {
        return $this->belongsTo(Episode::class);
    }
} 