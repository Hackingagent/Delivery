<?php

use App\Http\Controllers\Api\Admin\AgentController;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Agent\AuthController as AgentAuthController;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateAgent;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::post('login', [AdminAuthController::class, 'login']);

    Route::middleware(AuthenticateAdmin::class)->group(function () {
        Route::get('me', [AdminAuthController::class, 'me']);
        Route::post('logout', [AdminAuthController::class, 'logout']);

        Route::apiResource('agents', AgentController::class);
    });
});

Route::prefix('agent')->group(function () {
    Route::post('login', [AgentAuthController::class, 'login']);

    Route::middleware(AuthenticateAgent::class)->group(function () {
        Route::get('me', [AgentAuthController::class, 'me']);
        Route::post('logout', [AgentAuthController::class, 'logout']);
    });
});
