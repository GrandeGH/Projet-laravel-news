<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'user_id',
        'categorie_id',
        'titre',
        'slug',
        'content',
        'image',
        'published',
        'published_at',
    ];

    protected $casts = [
        'published' => 'boolean',
        'published_at' => 'datetime',
    ];

    // Relations (Un article appartient à un utilisateur et une catégorie,
    // a plusieurs tags, commentaires et likes)

    public function user() {
        return $this->belongsTo(User::class); //auteur de l'article | article appartient à user
    }

    public function categorie() {
        return $this->belongsTo(Categorie::class); // article appartient à catégorie
    }

    // Many to Many
    public function tags() {
        return $this->belongsToMany(Tag::class); // plusieurs article peut avoir plusieurs tags // CORRIGER au lieu de hasMany
    }

    public function commentaires() {
        return $this->hasMany(Commentaire::class); // article peut avoir plusieurs commentaires
    }

    //Likes
    public function likes() {
        return $this->hasMany(Like::class); // article peut avoir plusieurs likes
    }
    public function isLikedBy($user) {
    return $this->likes()->where('user_id', $user->id)->exists();
    }   

    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;
}
