<?php

namespace App\Http\Controllers;

use App\Models\Categorie; // relation to many
use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('categorie')->get();
        return Inertia::render(('Articles/ArticleIndex'),['articles' => $articles]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $articles = Article::all();
        $categories = Categorie::all(['id', 'name']);
        return Inertia::render(('Admin/ArticlesAdmin/ArticleCreate'),[
            'articles' => $articles,
            'categories' => $categories, // envoie à la vue
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $article = new Article();
        $article->title = $request->title;
        $article->slug = $request->slug ?? Str::slug($request->title) . '-' . uniqid();
        $article->content = $request->content;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $article->image = $path;
        }
        $article->categorie_id = $request->categorie_id;
        $article->user_id = auth()->id();
        $article->published = $request->published ?? false;
        $article->published_at = $article->published ? now() : null;

        $article->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $article = Article::with('categorie')->find($id);
        return Inertia::render(('Articles/ArticleShow'), ['article' => $article]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $article = Article::with('categorie')->find($id);
        return Inertia::render(('Admin/ArticlesAdmin/ArticleEdit'), ['article' => $article]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        $article->title = $request->title;
        $article->slug = $request->slug; // ou tu peux régénérer un slug ici si besoin
        $article->content = $request->content;
        $article->categorie_id = $request->categorie_id;
        $article->published = $request->published ?? false;
        $article->published_id = $article->published ? now() : null;

        // Si une image est envoyée
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $article->image = $path;
        }

        $article->save();
        }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();
    }
}
