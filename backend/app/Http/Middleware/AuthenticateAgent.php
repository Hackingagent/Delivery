<?php

namespace App\Http\Middleware;

use App\Models\AgentAccessToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAgent
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->bearerToken();

        if (! $header) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $accessToken = AgentAccessToken::query()
            ->where('token', hash('sha256', $header))
            ->with('agent')
            ->first();

        if (! $accessToken || $accessToken->isExpired()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $agent = $accessToken->agent;

        if (! $agent || ! $agent->is_active) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->attributes->set('agent', $agent);
        $request->attributes->set('agent_access_token', $accessToken);

        return $next($request);
    }
}
