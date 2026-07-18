<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_settings', function (Blueprint $table) {
            $table->id();
            $table->string('hero_line_1')->default('INVEST IN MOROCCO');
            $table->string('hero_line_2')->default('AND EXPORT TO');
            $table->string('hero_line_3')->default('THE WORLD');
            $table->string('hero_slide_1')->nullable();
            $table->string('hero_slide_2')->nullable();
            $table->string('hero_slide_3')->nullable();
            $table->unsignedInteger('stat_companies')->default(10);
            $table->unsignedInteger('stat_jobs')->default(830);
            $table->unsignedInteger('stat_smes')->default(75);
            $table->unsignedInteger('stat_partners')->default(10);
            $table->text('vision_text')->default('The Future Proof Industrial Platform To Capture Opportunities In A Changing World');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_settings');
    }
};
