<?php

namespace Database\Factories;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Agent>
 */
class AgentFactory extends Factory
{
    protected $model = Agent::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->unique()->numerify('+2376########'),
            'pin_hash' => bcrypt('1234'),
            'license_id' => Agent::generateLicenseId(),
            'base_zone' => fake()->randomElement(['Nkwen', 'Up Station', 'Commercial Avenue']),
            'vehicle_plate' => fake()->bothify('NW #### ?'),
            'status' => Agent::STATUS_OFFLINE,
            'is_active' => true,
        ];
    }
}
