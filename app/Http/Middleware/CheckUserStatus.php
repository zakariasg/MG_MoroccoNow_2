<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Enums\UserStatus;
use App\Enums\UserRole;
use Illuminate\Support\Facades\Auth;

class CheckUserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Admins bypass status check
            if ($user->role === UserRole::Gestionnaire) {
                return $next($request);
            }

            // Check if status is pending or rejected
            if ($user->status === UserStatus::Pending || $user->status === UserStatus::Rejected) {
                if ($request->routeIs('waiting-approval') || $request->routeIs('logout')) {
                    return $next($request);
                }
                return redirect()->route('waiting-approval');
            }

            // Redirect approved users away from waiting-approval
            if ($user->status === UserStatus::Approved && $request->routeIs('waiting-approval')) {
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
}
