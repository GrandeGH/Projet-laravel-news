<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; //ajouter
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'Tales of Phantasia', 'Tales of Destiny', 'Tales of Eternia', 'Tales of Phantasia: Narikiri Dungeon',
            'Tales of Destiny 2', 'Tales of Symphonia', 'Tales of Legendia', 'Tales of Rebirth', 'Tales of the Abyss',
            'Tales of the Tempest', 'Tales of Innocence', 'Tales of Heart', 'Tales of Breaker', 'Tales of Commons', 'Tales of Wahrheit',
            'Tales of Vesperia', 'Tales of Graces', 'Tales of Xillia', 'Tales of Xillia 2', 'Tales of Zestiria',
            'Tales of Berseria', 'Tales of Arise', 'Tales of the World: Radiant Mythology', 'Tales of Asteria', 'Tales of Link', 
            'Tales of the Rays', 'Tales of Crestoria', 'Tales of Luminaria','Tales of Symphonia: Dawn of the New World', 'Personnage', 
            'Fanart', 'Titre crossover', 'Titre original', 'Divers', 'Personnage principal', 'Personnage secondaire', 'Ennemi', 'Boss',                          
        ];

        foreach ($tags as $tag) {
            Tag::create([
                'name' => $tag,
                'slug' => Str::slug($tag),
            ]);
        }
    }
}
