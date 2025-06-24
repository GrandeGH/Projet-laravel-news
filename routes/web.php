<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\AdminDashboardController;

use App\Http\Middleware\RoleMiddleware;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


//Accessible à tous
    //articles
Route::get('articles', [ArticleController::class, 'index'])->name('articles'); // name necessaire pour le login dans Controller
Route::get('/detail/article/{id}', [ArticleController::class, 'show']);
    //categorie
Route::get('categories', [CategorieController::class, 'index']);
Route::get('/detail/categorie/{id}', [CategorieController::class, 'show']);
    //tags
Route::get('tags', [TagController::class, 'index']);
Route::get('/detail/tag/{id}', [TagController::class, 'show']);


//articles pour roles
Route::middleware(['auth', 'role:admin,webmaster,auteur'])->group(function () {
    Route::get('/create/article', [ArticleController::class, 'create']);
    Route::post('/post/article', [ArticleController::class, 'store']);
    Route::get('/edit/article/{id}', [ArticleController::class, 'edit']);
    Route::put('/update/article/{id}', [ArticleController::class, 'update']);
    Route::delete('/delete/article/{id}', [ArticleController::class, 'destroy']);

    //dashboard
    Route::get('dashboard', [AdminDashboardController::class, 'dashboard']);
});


//categories et tags pour roles
Route::middleware(['auth', 'role:admin,webmaster'])->group(function () {
    //catégories
    Route::get('cateogriesadmin', [CategorieController::class, 'indexadmin']);
    Route::get('/create/categorie', [CategorieController::class, 'create']);
    Route::post('/post/categorie', [CategorieController::class, 'store']);
    Route::get('/edit/categorie/{id}', [CategorieController::class, 'edit']);
    Route::put('/update/categorie/{id}', [CategorieController::class, 'update']);
    Route::delete('/delete/categorie/{id}', [CategorieController::class, 'destroy']);
    
    //tags
    Route::get('tagsadmin', [TagController::class, 'indexadmin']);
    Route::get('/create/tag', [TagController::class, 'create']);
    Route::post('/post/tag', [TagController::class, 'store']);
    Route::get('/edit/tag/{id}', [TagController::class, 'edit']);
    Route::put('/update/tag/{id}', [TagController::class, 'update']);
    Route::delete('/delete/tag/{id}', [TagController::class, 'destroy']);

    // administratifs
    Route::get('allusers', [AdminDashboardController::class, 'allusers']);
});


//commentaire et like aux users
Route::middleware(['auth', 'role:admin,webmaster,auteur,lecteur'])->group(function () {
    //commentaires
    Route::post('/commentaires', [CommentaireController::class, 'store']);
    Route::delete('/delete/commentaire/{id}', [CommentaireController::class, 'destroy']);
    //likes
    Route::post('/likes', [LikeController::class, 'store']);
    Route::delete('/likes', [LikeController::class, 'destroy']);
});


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
