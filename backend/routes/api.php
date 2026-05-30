<?php

use App\Http\Controllers\Api\Admin\AgentController;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Admin\DeliveryRequestController as AdminDeliveryRequestController;
use App\Http\Controllers\Api\Agent\AuthController as AgentAuthController;
use App\Http\Controllers\Api\User\AuthController as UserAuthController;
use App\Http\Controllers\Api\User\DeliveryRequestController as UserDeliveryRequestController;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateAgent;
use App\Http\Middleware\AuthenticateUser;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);

Route::middleware(AuthenticateUser::class)->group(function () {
    Route::get('me', [UserAuthController::class, 'me']);
    Route::post('logout', [UserAuthController::class, 'logout']);

    Route::get('delivery-requests', [UserDeliveryRequestController::class, 'index']);
    Route::get('delivery-requests/{id}', [UserDeliveryRequestController::class, 'show']);
    Route::post('delivery-requests', [UserDeliveryRequestController::class, 'store']);
});

Route::prefix('admin')->group(function () {
    Route::post('login', [AdminAuthController::class, 'login']);

    Route::middleware(AuthenticateAdmin::class)->group(function () {
        Route::get('me', [AdminAuthController::class, 'me']);
        Route::post('logout', [AdminAuthController::class, 'logout']);

        Route::apiResource('agents', AgentController::class);
        
        Route::get('delivery-requests', [AdminDeliveryRequestController::class, 'index']);
        Route::post('delivery-requests/{id}/assign', [AdminDeliveryRequestController::class, 'assignAgent']);
    });
});

use App\Http\Controllers\Api\Agent\DeliveryController as AgentDeliveryController;

Route::prefix('agent')->group(function () {
    Route::post('login', [AgentAuthController::class, 'login']);

    Route::middleware(AuthenticateAgent::class)->group(function () {
        Route::get('me', [AgentAuthController::class, 'me']);
        Route::post('logout', [AgentAuthController::class, 'logout']);

        Route::get('deliveries', [AgentDeliveryController::class, 'index']);
        Route::post('deliveries/{id}/pickup', [AgentDeliveryController::class, 'pickup']);
        Route::post('deliveries/{id}/deliver', [AgentDeliveryController::class, 'deliver']);
        Route::post('location', [AgentDeliveryController::class, 'updateLocation']);
    });
});
