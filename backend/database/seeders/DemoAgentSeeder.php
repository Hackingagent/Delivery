<?php

namespace Database\Seeders;

use App\Models\Agent;
use Illuminate\Database\Seeder;

class DemoAgentSeeder extends Seeder
{
    public function run(): void
    {
        $agent = Agent::query()->firstOrNew(['phone' => '+237671000001']);

        $agent->fill([
            'name' => 'Jude Courier',
            'pin_hash' => bcrypt('1234'),
            'base_zone' => 'Nkwen',
            'vehicle_plate' => 'NW 1234 A',
            'status' => Agent::STATUS_OFFLINE,
            'is_active' => true,
        ]);

        if (! $agent->exists) {
            $agent->license_id = 'BAM-DL-9821';
        }

        $agent->save();
    }
}
