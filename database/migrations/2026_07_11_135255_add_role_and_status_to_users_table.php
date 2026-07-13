<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('address')->nullable()->after('phone');

            $table->enum('role', ['visiteur', 'investisseur', 'exportateur', 'gestionnaire'])
                  ->default('visiteur')
                  ->after('address');

            $table->enum('status', ['pending', 'approved', 'rejected'])
                  ->default('pending')
                  ->after('role');

            $table->timestamp('approved_at')->nullable()->after('status');

            $table->foreignId('approved_by')
                  ->nullable()
                  ->after('approved_at')
                  ->constrained('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['approved_by']);
            $table->dropColumn(['phone', 'address', 'role', 'status', 'approved_at', 'approved_by']);
        });
    }
};