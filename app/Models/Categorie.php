<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = ['name', 'slug'];

    public function articles () {
        return $this->hasMany(Article::class); // une catégorie peut avoir plusieurs articles
    }

    /** @use HasFactory<\Database\Factories\CategorieFactory> */
    use HasFactory;
}
