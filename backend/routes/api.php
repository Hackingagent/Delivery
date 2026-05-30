<?php

use App\Http\Controllers\Api\Admin\AgentController;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Agent\AuthController as AgentAuthController;
use App\Http\Controllers\Api\User\AuthController as UserAuthController;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateAgent;
use App\Http\Middleware\AuthenticateUser;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);

Route::middleware(AuthenticateUser::class)->group(function () {
    Route::get('me', [UserAuthController::class, 'me']);
    Route::post('logout', [UserAuthController::class, 'logout']);
});

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
