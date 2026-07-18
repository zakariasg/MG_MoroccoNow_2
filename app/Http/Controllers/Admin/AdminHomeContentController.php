<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHomeContentController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/HomeContent/Edit', [
            'settings' => HomeSetting::current(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'hero_line_1' => 'required|string|max:255',
            'hero_line_2' => 'required|string|max:255',
            'hero_line_3' => 'required|string|max:255',
            'hero_slide_1' => 'nullable|image|max:4096',
            'hero_slide_2' => 'nullable|image|max:4096',
            'hero_slide_3' => 'nullable|image|max:4096',
            'stat_companies' => 'required|integer|min:0',
            'stat_jobs' => 'required|integer|min:0',
            'stat_smes' => 'required|integer|min:0',
            'stat_partners' => 'required|integer|min:0',
            'vision_text' => 'required|string',
        ]);

        $settings = HomeSetting::current();

        foreach (['hero_slide_1', 'hero_slide_2', 'hero_slide_3'] as $field) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store('home', 'public');
                $validated[$field] = '/storage/' . $path;
            } else {
                unset($validated[$field]);
            }
        }

        $settings->update($validated);

        return redirect()->route('admin.home-content.edit')->with('success', 'Homepage content updated successfully.');
    }
}
