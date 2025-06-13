<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = [
        'user_id',
        'article_id',
    ];

    //le like appartien à user et article
    public function user() {
        return $this->belongsTo(User::class); 
    }

    public function article() {
        return $this->belongsTo(Article::class); 
    }

    /** @use HasFactory<\Database\Factories\LikeFactory> */
    use HasFactory;
}
