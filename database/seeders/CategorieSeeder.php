<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; //ajouter
use App\Models\Categorie;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Actualités', 'Jeux', 'Fanart', 'Personnages', 'Animés', 'Mangas'
        ];

        foreach ($categories as $categorie) {
            Categorie::create([
                'name' => $categorie,
                'slug' => Str::slug($categorie),
            ]);
        }
    }
}
