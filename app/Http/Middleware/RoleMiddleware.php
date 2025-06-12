<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $roles): Response
    {
        // Vérifie si l'utilisateur est authentifié
        if (!auth()->check()) {
            return redirect('/login'); // Redirige vers la page de connexion s'il n'est pas connecté
        }

        $user = auth()->user();

        // Vérifie si le rôle de l'utilisateur fait partie des rôles autorisés passés au middleware
        if (!in_array($user->role, $roles)) {
            // Redirige l'utilisateur vers la page précédente avec un message d'erreur
            return redirect()->back()->with('error', 'Vous n\'avez pas les permissions nécessaires pour accéder à cette zone du Royaume.');
            // Autre option : Aborter la requête avec une erreur 403 (Forbidden)
            // abort(403, 'Accès non autorisé.');
        }

        return $next($request);
    }
}
