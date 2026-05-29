<?php

namespace App\Http\Controllers\Api\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\LoginRequest;
use App\Http\Resources\AgentResource;
use App\Models\Agent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $agent = Agent::query()
            ->where('phone', $request->validated('phone'))
            ->first();

        if (! $agent || ! $agent->verifyPin($request->validated('pin'))) {
            return response()->json([
                'message' => 'Invalid phone number or PIN.',
            ], 422);
        }

        if (! $agent->is_active) {
            return response()->json([
                'message' => 'This courier account has been deactivated.',
            ], 403);
        }

        $agent->forceFill(['last_login_at' => now()])->save();

        $token = $agent->createAccessToken('mobile');

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'token_type' => 'Bearer',
            'agent' => new AgentResource($agent),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'agent' => new AgentResource($request->attributes->get('agent')),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->attributes->get('agent_access_token')?->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
