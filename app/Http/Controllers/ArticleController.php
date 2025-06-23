<?php

namespace App\Http\Controllers;

use App\Models\Categorie; // relation to many
use App\Models\Article;
use App\Models\Commentaire; 
use App\Models\Tag;
use App\Models\User;
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
    public function index(Request $request)
    {
        $articles = Article::with('categorie', 'tags', 'user')
            ->orderBy('created_at', 'desc')        
            ->get();
        
        return Inertia::render(('Articles/ArticleIndex'),[
            'articles' => $articles,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $articles = Article::all();
        $categories = Categorie::all(['id', 'name']);
        $tags = Tag::all();
        return Inertia::render(('Admin/ArticlesAdmin/ArticleCreate'),[
            'articles' => $articles,
            'categories' => $categories, // envoie à la vue
            'tags' => $tags,
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
        if ($request->has('tags')) {
            // Vérifie que ce sont bien des tableaux d'ID valides
            $article->tags()->sync($request->tags);
            // `sync()` remplace les tags existants si l'article était édité

        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $article = Article::with('categorie', 'tags', 'commentaires.user', 'likes', 'user')->find($id);
        return Inertia::render(('Articles/ArticleShow'), ['article' => $article]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categories = Categorie::all(['id', 'name']);
        $tags = Tag::all(['id', 'name']); // ou ['id', 'label'] si c’est label dans ta table
        $article = Article::with('categorie', 'tags')->find($id);
        return Inertia::render(('Admin/ArticlesAdmin/ArticleEdit'), [
            'article' => $article,
            'categories' => $categories,
            'tags' => $tags,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd(
        //     $request->all(),
        //     $request->file('image'),
        //     $request->hasFile('image')
        // );
        $article = Article::find($id);

        $article->title = $request->title;
        $article->slug = $request->slug; // ou tu peux régénérer un slug ici si besoin
        $article->content = $request->content;
        $article->categorie_id = $request->categorie_id;
        $article->published = $request->published ?? false;
        $article->published_at = $article->published ? now() : null;

        // Si une image est envoyée
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $article->image = $path;
        }

        $article->save();
        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

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
