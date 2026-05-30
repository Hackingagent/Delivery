<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('delivery_requests', function (Blueprint $table) {
            $table->string('pickup_image_path')->nullable()->after('picked_up_at');
            $table->string('delivery_image_path')->nullable()->after('delivered_at');
        });

        Schema::table('agents', function (Blueprint $table) {
            $table->decimal('current_lat', 10, 8)->nullable()->after('status');
            $table->decimal('current_lng', 11, 8)->nullable()->after('current_lat');
            $table->timestamp('last_location_update_at')->nullable()->after('current_lng');
        });
    }

    public function down(): void
    {
        Schema::table('delivery_requests', function (Blueprint $table) {
            $table->dropColumn(['pickup_image_path', 'delivery_image_path']);
        });

        Schema::table('agents', function (Blueprint $table) {
            $table->dropColumn(['current_lat', 'current_lng', 'last_location_update_at']);
        });
    }
};
