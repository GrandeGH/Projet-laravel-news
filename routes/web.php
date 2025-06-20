<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\LikeController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


//Articles
Route::get('articles', [ArticleController::class, 'index']);
Route::get('/create/article', [ArticleController::class, 'create'])->middleware('auth');
Route::post('/post/article', [ArticleController::class, 'store'])->middleware('auth');
Route::get('/detail/article/{id}', [ArticleController::class, 'show']);
Route::get('/edit/article/{id}', [ArticleController::class, 'edit'])->middleware('auth');
Route::put('/update/article/{id}', [ArticleController::class, 'update'])->middleware('auth');
Route::delete('/delete/article/{id}', [ArticleController::class, 'destroy'])->middleware('auth');

//Catégories
Route::get('categories', [CategorieController::class, 'index']);
Route::get('cateogriesadmin', [CategorieController::class, 'indexadmin'])->middleware('auth');
Route::get('/create/categorie', [CategorieController::class, 'create'])->middleware('auth');
Route::post('/post/categorie', [CategorieController::class, 'store'])->middleware('auth');
Route::get('/edit/categorie/{id}', [CategorieController::class, 'edit'])->middleware('auth');
Route::put('/update/categorie/{id}', [CategorieController::class, 'update'])->middleware('auth');
Route::delete('/delete/categorie/{id}', [CategorieController::class, 'destroy'])->middleware('auth');

//Commentaire
Route::post('/commentaires', [CommentaireController::class, 'store'])->middleware('auth');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
