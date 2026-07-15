<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'account_type' => 'required|in:investor,exporter',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $role = $request->account_type === 'investor'
            ? UserRole::Investisseur
            : UserRole::Exportateur;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $role,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // No auto-login: the account is "pending" until approved
        return redirect()->route('login')->with('status', 'registration-pending');
    }
}