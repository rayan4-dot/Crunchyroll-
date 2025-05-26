<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'welcome' => 'Welcome to your dashboard!'
        ]);
    }
} 