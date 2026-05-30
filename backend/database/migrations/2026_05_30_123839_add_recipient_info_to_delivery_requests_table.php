<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('delivery_requests', function (Blueprint $table) {
            $table->string('recipient_name')->nullable();
            $table->string('recipient_phone')->nullable();
            $table->foreignId('recipient_user_id')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('delivery_requests', function (Blueprint $table) {
            $table->dropForeign(['recipient_user_id']);
            $table->dropColumn(['recipient_name', 'recipient_phone', 'recipient_user_id']);
        });
    }
};
