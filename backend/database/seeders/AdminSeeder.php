<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::query()->updateOrCreate(
            ['email' => 'admin@bamenda.cm'],
            [
                'name' => 'Super Admin',
                'password' => 'password123',
                'is_active' => true,
            ],
        );
    }
}
