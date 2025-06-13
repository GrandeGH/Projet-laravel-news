<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name', 'slug'];

    public function articles() {
        return $this->belongsToMany(Article::class); //un tag peut associer plusieurs aricles
    }

    /** @use HasFactory<\Database\Factories\TagFactory> */
    use HasFactory;
}
