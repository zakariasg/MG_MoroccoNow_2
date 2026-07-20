<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('market_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('country_name');
            $table->string('year')->nullable();
            $table->json('slides')->nullable(); // array of image paths shown as a rotating slideshow
            $table->string('document_path')->nullable(); // optional PDF profile
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('market_profiles');
    }
};
