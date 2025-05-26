<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Episode extends Model
{
    protected $fillable = [
        'anime_id',
        'title',
        'description',
        'video_file',
        'season',
        'episode_number',
        'approval_status',
        'approved_at'
    ];

    protected $casts = [
        'approved_at' => 'datetime'
    ];

    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }

    public function subtitles(): HasMany
    {
        return $this->hasMany(Subtitle::class);
    }

    public function isPending(): bool
    {
        return $this->approval_status === 'pending';
    }

    public function isApproved(): bool
    {
        return $this->approval_status === 'approved';
    }

    public function isRejected(): bool
    {
        return $this->approval_status === 'rejected';
    }
} 