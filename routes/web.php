<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\LikeController;

// use App\Http\Middleware\IsAdmin;
// use App\Http\Middleware\IsAuteur;
// use App\Http\Middleware\IsWebmaster;
// use App\Http\Middleware\IsLecteur;
use App\Http\Middleware\RoleMiddleware;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


//Articles accessible à tous
Route::get('articles', [ArticleController::class, 'index'])->name('articles'); // name necessaire pour le login dans Controller
Route::get('/detail/article/{id}', [ArticleController::class, 'show']);

Route::middleware(['auth', 'role:admin,webmaster,auteur,lecteur'])->group(function () {
    Route::get('/create/article', [ArticleController::class, 'create']);
    Route::post('/post/article', [ArticleController::class, 'store']);
    Route::get('/edit/article/{id}', [ArticleController::class, 'edit']);
    Route::put('/update/article/{id}', [ArticleController::class, 'update']);
    Route::delete('/delete/article/{id}', [ArticleController::class, 'destroy']);
});

// Route::get('/create/article', [ArticleController::class, 'create'])->middleware('auth');
// Route::post('/post/article', [ArticleController::class, 'store'])->middleware('auth');
// Route::get('/edit/article/{id}', [ArticleController::class, 'edit'])->middleware('auth');
// Route::put('/update/article/{id}', [ArticleController::class, 'update'])->middleware('auth');
// Route::delete('/delete/article/{id}', [ArticleController::class, 'destroy'])->middleware('auth');

//Catégories
Route::get('categories', [CategorieController::class, 'index']);
Route::get('cateogriesadmin', [CategorieController::class, 'indexadmin'])->middleware('auth');
Route::get('/create/categorie', [CategorieController::class, 'create'])->middleware('auth');
Route::post('/post/categorie', [CategorieController::class, 'store'])->middleware('auth');
Route::get('/edit/categorie/{id}', [CategorieController::class, 'edit'])->middleware('auth');
Route::put('/update/categorie/{id}', [CategorieController::class, 'update'])->middleware('auth');
Route::delete('/delete/categorie/{id}', [CategorieController::class, 'destroy'])->middleware('auth');

//Tags
Route::get('tags', [TagController::class, 'index']);
Route::get('tagsadmin', [TagController::class, 'indexadmin'])->middleware('auth');


Route::middleware(['auth', 'role:admin,webmaster,auteur,lecteur'])->group(function () {
    Route::post('/commentaires', [CommentaireController::class, 'store']);
    Route::post('/likes', [LikeController::class, 'store']);
    Route::delete('/likes', [LikeController::class, 'destroy']);
});


// //Commentaire
// Route::post('/commentaires', [CommentaireController::class, 'store'])->middleware('auth');

// // Likes
// Route::post('/likes', [LikeController::class, 'store'])->middleware('auth');
// Route::delete('/likes', [LikeController::class, 'destroy'])->middleware('auth');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
