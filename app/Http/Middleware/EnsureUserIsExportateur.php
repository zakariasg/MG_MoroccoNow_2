<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsExportateur
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role !== UserRole::Exportateur) {
            abort(403, "Cet espace est réservé aux bénéficiaires exportateurs.");
        }

        return $next($request);
    }
}