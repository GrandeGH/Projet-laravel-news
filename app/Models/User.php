<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', //ajouter
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     // Relations (Un utilisateur peut posséder plusieurs articles, commentaires, likes)
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    // Méthodes d'aide pour vérifier les rôles, très utiles pour les conditions et middleware
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isWebmaster()
    {
        return $this->role === 'webmaster';
    }

    public function isAuteur()
    {
        return $this->role === 'auteur';
    }

    public function isLecteur()
    {
        return $this->role === 'lecteur';
    }
}
