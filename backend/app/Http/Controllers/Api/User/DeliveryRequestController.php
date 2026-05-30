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

    public function show(Request $request, $id)
    {
        $deliveryRequest = DeliveryRequest::where('user_id', $request->attributes->get('user')->id)
            ->with('agent')
            ->findOrFail($id);

        return response()->json([
            'data' => $deliveryRequest
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pickup_location' => 'required|string|max:255',
            'pickup_lat' => 'nullable|numeric',
            'pickup_lng' => 'nullable|numeric',
            'dropoff_location' => 'required|string|max:255',
            'dropoff_lat' => 'nullable|numeric',
            'dropoff_lng' => 'nullable|numeric',
            'package_details' => 'required|string',
            'fare' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $deliveryRequest = DeliveryRequest::create([
            'user_id' => $request->attributes->get('user')->id,
            'pickup_location' => $request->pickup_location,
            'pickup_lat' => $request->pickup_lat,
            'pickup_lng' => $request->pickup_lng,
            'dropoff_location' => $request->dropoff_location,
            'dropoff_lat' => $request->dropoff_lat,
            'dropoff_lng' => $request->dropoff_lng,
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
