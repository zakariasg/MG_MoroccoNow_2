<?php

namespace App\Http\Controllers;

use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $settings = HomeSetting::current();

        return Inertia::render('Home', [
            'stats' => [
                'companies' => $settings->stat_companies,
                'jobs' => $settings->stat_jobs,
                'smes' => $settings->stat_smes,
                'partners' => $settings->stat_partners,
            ],
            'hero' => [
                'line1' => $settings->hero_line_1,
                'line2' => $settings->hero_line_2,
                'line3' => $settings->hero_line_3,
                'slides' => array_values(array_filter([
                    $settings->hero_slide_1,
                    $settings->hero_slide_2,
                    $settings->hero_slide_3,
                ])) ?: [
                    '/images/Hero/slider1.png',
                    '/images/Hero/slider2.png',
                    '/images/Hero/slider3.png',
                ],
            ],
            'visionText' => $settings->vision_text,
        ]);
    }
}
