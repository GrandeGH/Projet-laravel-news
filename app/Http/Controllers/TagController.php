<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $tags = Tag::all();
        return Inertia::render(('Tags/TagsIndex'), [
            'tags' => $tags
        ]);
    }

        public function indextags()
    {
        $tags = Tag::all();
        return Inertia::render(('Admin/TagsAdmin/TagsIndex'), [
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::all();
        return Inertia::render(('Admin/TagsAdmin/TagsCreate'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tag = new Tag();
        $tag->name = $request->name;
        $tag->slug = $request->slug;
        $tag->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tag = Tag::all()->find($id);
        return Inertia::render(('Tags/TagsShow'), ['tag' => $tag]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $tag = Tag::all()->find($id);
        return Inertia::render(('Admin/TagsAdmin/TagsEdit'), ['tag' => $tag]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $tag = Tag::find($id);
        $tag->name = $request->name;
        $tag->slug = $tag->slug;
        $tag->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tag = Tag::find($id);
        $tag->delete();
    }
}
