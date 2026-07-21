<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render('News', [
            'news' => News::whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->get(),
        ]);
    }

    public function show(News $news)
    {
        return Inertia::render('NewsShow', [
            'article' => $news,
        ]);
    }
}