<?php

namespace App\Http\Requests\Admin;

use App\Models\Agent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAgentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $agentId = $this->route('agent')?->id ?? $this->route('agent');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'phone' => [
                'sometimes',
                'required',
                'string',
                'max:20',
                Rule::unique('agents', 'phone')->ignore($agentId),
            ],
            'pin' => ['sometimes', 'string', 'digits:4'],
            'base_zone' => ['nullable', 'string', 'max:255'],
            'vehicle_plate' => ['nullable', 'string', 'max:50'],
            'status' => ['sometimes', Rule::in(Agent::STATUSES)],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
