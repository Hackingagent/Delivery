<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAgentRequest;
use App\Http\Requests\Admin\UpdateAgentRequest;
use App\Http\Resources\AgentResource;
use App\Models\Agent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AgentController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Agent::query()->orderBy('name');

        if ($request->filled('status') && $request->status !== 'all') {
            $status = strtolower(str_replace(' ', '_', $request->status));
            if (in_array($status, Agent::STATUSES, true)) {
                $query->where('status', $status);
            }
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('license_id', 'like', "%{$search}%");
            });
        }

        return AgentResource::collection($query->get());
    }

    public function store(StoreAgentRequest $request): JsonResponse
    {
        $data = $request->validated();

        $agent = new Agent([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'pin_hash' => bcrypt($data['pin']),
            'license_id' => Agent::generateLicenseId(),
            'base_zone' => $data['base_zone'] ?? null,
            'vehicle_plate' => $data['vehicle_plate'] ?? null,
            'status' => $data['status'] ?? Agent::STATUS_OFFLINE,
            'is_active' => $data['is_active'] ?? true,
        ]);

        $agent->save();

        return response()->json([
            'message' => 'Agent created successfully.',
            'agent' => new AgentResource($agent),
        ], 201);
    }

    public function show(Agent $agent): JsonResponse
    {
        return response()->json([
            'agent' => new AgentResource($agent),
        ]);
    }

    public function update(UpdateAgentRequest $request, Agent $agent): JsonResponse
    {
        $data = $request->validated();

        if (isset($data['pin'])) {
            $agent->updatePin($data['pin']);
            unset($data['pin']);
        }

        $agent->fill($data);
        $agent->save();

        return response()->json([
            'message' => 'Agent updated successfully.',
            'agent' => new AgentResource($agent->fresh()),
        ]);
    }

    public function destroy(Agent $agent): JsonResponse
    {
        $agent->delete();

        return response()->json([
            'message' => 'Agent removed successfully.',
        ]);
    }
}
