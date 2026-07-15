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
        // Only fetch users who are beneficiaries (investisseurs or exportateurs)
        $pendingUsers = User::whereIn('role', [UserRole::Investisseur, UserRole::Exportateur])
            ->where('status', UserStatus::Pending)
            ->latest()
            ->get();

        $approvedUsers = User::whereIn('role', [UserRole::Investisseur, UserRole::Exportateur])
            ->where('status', UserStatus::Approved)
            ->latest()
            ->get();

        $rejectedUsers = User::whereIn('role', [UserRole::Investisseur, UserRole::Exportateur])
            ->where('status', UserStatus::Rejected)
            ->latest()
            ->get();

        return Inertia::render('Admin/Approvals/Index', [
            'pendingUsers' => $pendingUsers,
            'approvedUsers' => $approvedUsers,
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
}
