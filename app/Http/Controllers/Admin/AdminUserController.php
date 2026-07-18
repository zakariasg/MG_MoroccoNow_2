<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\UserStatus;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        // Only fetch users who are beneficiaries (investors or exporters)
        $pendingUsers = User::whereIn('role', [UserRole::Investisseur, UserRole::Exportateur])
            ->where('status', UserStatus::Pending)
            ->latest()
            ->get();

        $approvedInvestors = User::where('role', UserRole::Investisseur)
            ->where('status', UserStatus::Approved)
            ->latest()
            ->get();

        $approvedExporters = User::where('role', UserRole::Exportateur)
            ->where('status', UserStatus::Approved)
            ->latest()
            ->get();

        $rejectedUsers = User::whereIn('role', [UserRole::Investisseur, UserRole::Exportateur])
            ->where('status', UserStatus::Rejected)
            ->latest()
            ->get();

        return Inertia::render('Admin/Approvals/Index', [
            'pendingUsers' => $pendingUsers,
            'approvedInvestors' => $approvedInvestors,
            'approvedExporters' => $approvedExporters,
            'rejectedUsers' => $rejectedUsers,
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Approvals/Show', [
            'beneficiary' => $user,
        ]);
    }

    public function approve(User $user)
    {
        $user->update([
            'status' => UserStatus::Approved,
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return redirect()->route('admin.approvals.index')->with('success', 'User approved successfully.');
    }

    public function reject(User $user)
    {
        $user->update([
            'status' => UserStatus::Rejected,
            'approved_at' => null,
            'approved_by' => null,
        ]);

        return redirect()->route('admin.approvals.index')->with('success', 'User rejected.');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'role' => 'required|in:investisseur,exportateur',
        ]);

        $user->update($validated);

        return redirect()->route('admin.approvals.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.approvals.index')->with('success', 'User deleted.');
    }
}
