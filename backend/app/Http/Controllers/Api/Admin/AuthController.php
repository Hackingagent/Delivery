<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $admin = Admin::query()
            ->where('email', $request->validated('email'))
            ->first();

        if (! $admin || ! Hash::check($request->validated('password'), $admin->password)) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 422);
        }

        if (! $admin->is_active) {
            return response()->json([
                'message' => 'This admin account has been deactivated.',
            ], 403);
        }

        $admin->forceFill(['last_login_at' => now()])->save();

        $token = $admin->createAccessToken('mobile');

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'token_type' => 'Bearer',
            'admin' => new AdminResource($admin),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'admin' => new AdminResource($request->attributes->get('admin')),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $accessToken = $request->attributes->get('admin_access_token');
        $accessToken?->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
