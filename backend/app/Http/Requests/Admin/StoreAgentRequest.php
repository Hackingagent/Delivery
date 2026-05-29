<?php

namespace App\Http\Requests\Admin;

use App\Models\Agent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAgentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'unique:agents,phone'],
            'pin' => ['required', 'string', 'digits:4'],
            'base_zone' => ['nullable', 'string', 'max:255'],
            'vehicle_plate' => ['nullable', 'string', 'max:50'],
            'status' => ['nullable', Rule::in(Agent::STATUSES)],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
