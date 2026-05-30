<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\DeliveryRequest;
use Illuminate\Support\Facades\Validator;

class DeliveryRequestController extends Controller
{
    public function index(Request $request)
    {
        $requests = DeliveryRequest::where('user_id', $request->attributes->get('user')->id)
            ->latest()
            ->paginate(15);

        return response()->json($requests);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'package_details' => 'required|string',
            'fare' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $deliveryRequest = DeliveryRequest::create([
            'user_id' => $request->attributes->get('user')->id,
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
            'package_details' => $request->package_details,
            'fare' => $request->fare,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Delivery request created successfully.',
            'request' => $deliveryRequest
        ], 201);
    }
}
