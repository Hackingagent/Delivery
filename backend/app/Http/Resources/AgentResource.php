<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'license_id' => $this->license_id,
            'base_zone' => $this->base_zone,
            'vehicle_plate' => $this->vehicle_plate,
            'status' => $this->status,
            'status_label' => $this->displayStatus(),
            'is_active' => $this->is_active,
            'avatar_path' => $this->avatar_path,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
