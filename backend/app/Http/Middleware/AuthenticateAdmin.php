<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Models\AdminAccessToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->bearerToken();

        if (! $header) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $hashed = hash('sha256', $header);

        $accessToken = AdminAccessToken::query()
            ->where('token', $hashed)
            ->with('admin')
            ->first();

        if (! $accessToken || $accessToken->isExpired()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $admin = $accessToken->admin;

        if (! $admin || ! $admin->is_active) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->attributes->set('admin', $admin);
        $request->attributes->set('admin_access_token', $accessToken);

        return $next($request);
    }
}
