<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use App\Models\Commentaire;
use App\Models\Tag;
use App\Models\Categorie;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/DashboardAdmin', [
            'stats' => [
                'users' => User::count(),
                'articles' => Article::count(),
                'commentaires' => Commentaire::count(),
                'categories' => Categorie::count(),
                'tags' => Tag::count(),
            ]
        ]);
    }

    public function allusers()
    {
        $users = User::select('id', 'name', 'role', 'email', 'created_at')->get();
        return Inertia::render('Admin/AllUsers', [
            'users' => $users
        ]);
    }
}
