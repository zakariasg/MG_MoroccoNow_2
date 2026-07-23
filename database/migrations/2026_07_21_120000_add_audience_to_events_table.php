<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Sépare les événements de la session publique (page /events, sans formulaire)
     * de ceux de l'Espace Exportateur (onglet "Evénements", avec formulaire d'inscription).
     * Les événements existants restent "public" par défaut.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('audience')->default('public')->after('title'); // 'public' | 'exporter'
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('audience');
        });
    }
};