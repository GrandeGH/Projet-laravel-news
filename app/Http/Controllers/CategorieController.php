<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::all();
        return Inertia::render(('Categories/CategoriesIndex'), [
            'categories' => $categories
        ]);
    }

    public function indexadmin()
    {
        $categories = Categorie::all();
        return Inertia::render(('CategoriesAdmin/CategoriesIndex'), [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categorie::all();
        return Inertia::render(('CategoriesAdmin/CategoriesCreate'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $categorie = new Categorie();
        $categorie->name = $request->name;
        $categorie->slug = $reques->slug;
        $categorie->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $categorie = Categorie::with(['articles.user'])->find($id);
        return Inertia::render(('Categories/CategoriesShow'), ['categorie' =>$categorie]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categorie = Categorie::find($id);
        return Intertia::render('Admin/CategoriesAdmin/CategoriesEdit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $categorie = Categorie::find($id);

        $categorie->name = $request->name;
        $categorie->slug = $categorie->slug;
        $categorie->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categorie = Categorie::find($id);
        $categorie->delete();
    }
}
