<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('regulatory_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sector_id')->constrained()->cascadeOnDelete();
            $table->string('notifying_member');       // "Membre notifiant"
            $table->date('publication_date')->nullable();
            $table->string('document_symbol')->nullable();
            $table->string('notification_type')->nullable();
            $table->text('description')->nullable();  // "Description"
            $table->string('hs_ics_codes')->nullable(); // "HS/ICS code(s)"
            $table->text('objectives')->nullable();    // "Objectifs"
            $table->string('document_link')->nullable(); // "Documents" (Lien)
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('regulatory_documents');
    }
};