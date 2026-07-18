<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Event;
use App\Models\MediaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminContentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Content/Index', [
            'news' => News::latest()->get(),
            'events' => Event::latest()->get(),
            'media' => MediaResource::latest()->get(),
        ]);
    }

    public function storeNews(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('content/news', 'public');
            $imagePath = '/storage/' . $path;
        }

        News::create([
            'title' => $request->input('title'),
            'slug' => Str::slug($request->input('title')) . '-' . time(),
            'summary' => $request->input('summary'),
            'content' => $request->input('content'),
            'image_path' => $imagePath,
            'published_at' => now(),
        ]);

        return redirect()->route('admin.content.index')->with('success', 'News published successfully.');
    }

    public function destroyNews(News $news)
    {
        $news->delete();
        return redirect()->route('admin.content.index')->with('success', 'News deleted.');
    }

    public function storeEvent(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'required|string|max:255',
            'link' => 'nullable|url|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('content/events', 'public');
            $imagePath = '/storage/' . $path;
        }

        Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'event_date' => $request->event_date,
            'location' => $request->location,
            'link' => $request->link,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('admin.content.index')->with('success', 'Event scheduled successfully.');
    }

    public function updateEvent(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'required|string|max:255',
            'link' => 'nullable|url|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'event_date' => $request->event_date,
            'location' => $request->location,
            'link' => $request->link,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('content/events', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $event->update($data);

        return redirect()->route('admin.content.index')->with('success', 'Event updated successfully.');
    }

    public function destroyEvent(Event $event)
    {
        $event->delete();
        return redirect()->route('admin.content.index')->with('success', 'Event deleted.');
    }

    public function storeMedia(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:video,image,document',
            'url' => 'nullable|string|url',
            'file' => 'nullable|file|max:5120',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('content/media', 'public');
            $filePath = '/storage/' . $path;
        }

        MediaResource::create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'file_path' => $filePath,
            'url' => $request->url,
        ]);

        return redirect()->route('admin.content.index')->with('success', 'Media added successfully.');
    }

    public function destroyMedia(MediaResource $media)
    {
        $media->delete();
        return redirect()->route('admin.content.index')->with('success', 'Media deleted.');
    }
}
