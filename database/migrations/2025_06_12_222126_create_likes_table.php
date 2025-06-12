<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Qui a aimé
            $table->foreignId('article_id')->constrained()->onDelete('cascade'); // Quel article
            $table->timestamps();

            $table->unique(['user_id', 'article_id']);
        });

            // S'assurer qu'un utilisateur ne peut liker un article qu'une seule fois
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
