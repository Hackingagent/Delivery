<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\UserAccessToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateUser
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->bearerToken();

        if (! $header) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $hashed = hash('sha256', $header);

        $accessToken = UserAccessToken::query()
            ->where('token', $hashed)
            ->with('user')
            ->first();

        if (! $accessToken || $accessToken->isExpired()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $user = $accessToken->user;

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->attributes->set('user', $user);
        $request->attributes->set('user_access_token', $accessToken);

        return $next($request);
    }
}
