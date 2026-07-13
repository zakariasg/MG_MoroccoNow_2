<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Database\Seeder;

class GestionnaireSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Technique',
            'email' => 'admin@moroccoNow.test',
            'password' => bcrypt('password'),
            'role' => UserRole::Gestionnaire,
            'status' => UserStatus::Approved,
        ]);
    }
}