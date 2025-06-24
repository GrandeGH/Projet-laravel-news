<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render(('Profile/MonProfil'), [
            'user' => $request->user()
        ]);
    }

    public function edit() {

    }
}
