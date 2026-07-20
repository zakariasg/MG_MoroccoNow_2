<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Start/end dates without time (English display, date only).
            // event_date is kept as the "start date" column for backward compatibility.
            $table->date('end_date')->nullable()->after('event_date');
            $table->date('registration_deadline')->nullable()->after('end_date');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['end_date', 'registration_deadline']);
        });
    }
};