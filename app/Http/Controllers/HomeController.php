<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'stats' => [
                'companies' => 10,
                'jobs' => 830,
                'smes' => 75,
                'partners' => 10,
            ],
        ]);
    }
}