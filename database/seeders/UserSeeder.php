<?php

namespace Database\Seeders;

use App\Models\User; //ajouter le mode User
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Georges',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('georgesgrande'),
            'role' => 'admin',
            'email_verified_at' => now(), // Nécessaire pour les utilisateurs créés par seeder s'ils doivent être "vérifiés"
        ]);
        User::create([
            'name' => 'Nanashi',
            'email' => 'webmaster@gmail.com',
            'password' => Hash::make('nanashipassword'),
            'role' => 'webmaster',
            'email_verified_at' => now(), // Nécessaire pour les utilisateurs créés par seeder s'ils doivent être "vérifiés"
        ]);
        User::create([
            'name' => 'Isma',
            'email' => 'auteur@gmail.com',
            'password' => Hash::make('ismapassword'),
            'role' => 'auteur',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Jade',
            'email' => 'lecteur@gmail.com',
            'password' => Hash::make('jadepassword'),
            'role' => 'lecteur',
            'email_verified_at' => now(),
        ]);

                // Optionnel : créez des utilisateurs supplémentaires avec le factory pour le remplissage de données
        // User::factory(10)->create();
    }
}
