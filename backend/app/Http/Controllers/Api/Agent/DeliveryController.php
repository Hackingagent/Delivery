<?php

namespace App\Http\Controllers\Api\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DeliveryRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DeliveryController extends Controller
{
    /**
     * List assigned deliveries for the authenticated agent.
     */
    public function index(Request $request)
    {
        $agent = $request->attributes->get('agent');
        
        $deliveries = DeliveryRequest::where('agent_id', $agent->id)
            ->with('user')
            ->whereIn('status', ['assigned', 'in_transit'])
            ->latest()
            ->get();

        return response()->json([
            'data' => $deliveries
        ]);
    }

    /**
     * Mark a delivery as picked up and upload an image.
     */
    public function pickup(Request $request, $id)
    {
        $agent = $request->attributes->get('agent');
        $delivery = DeliveryRequest::where('agent_id', $agent->id)->findOrFail($id);

        if ($delivery->status !== 'assigned') {
            return response()->json(['message' => 'Delivery is not in assigned state.'], 422);
        }

        $validator = Validator::make($request->all(), [
            'pickup_image' => 'required|image|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('pickup_image')) {
            $path = $request->file('pickup_image')->store('deliveries/pickup', 'public');
            $delivery->pickup_image_path = $path;
        }

        $delivery->status = 'in_transit';
        $delivery->picked_up_at = now();
        $delivery->save();

        return response()->json([
            'message' => 'Package picked up successfully.',
            'request' => $delivery
        ]);
    }

    /**
     * Mark a delivery as delivered and upload an image.
     */
    public function deliver(Request $request, $id)
    {
        $agent = $request->attributes->get('agent');
        $delivery = DeliveryRequest::where('agent_id', $agent->id)->findOrFail($id);

        if ($delivery->status !== 'in_transit') {
            return response()->json(['message' => 'Delivery is not in transit.'], 422);
        }

        $validator = Validator::make($request->all(), [
            'delivery_image' => 'required|image|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('delivery_image')) {
            $path = $request->file('delivery_image')->store('deliveries/delivery', 'public');
            $delivery->delivery_image_path = $path;
        }

        $delivery->status = 'delivered';
        $delivery->delivered_at = now();
        $delivery->save();

        return response()->json([
            'message' => 'Package delivered successfully.',
            'request' => $delivery
        ]);
    }

    /**
     * Update the agent's current GPS location.
     */
    public function updateLocation(Request $request)
    {
        $agent = $request->attributes->get('agent');

        $validator = Validator::make($request->all(), [
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $agent->update([
            'current_lat' => $request->lat,
            'current_lng' => $request->lng,
            'last_location_update_at' => now(),
        ]);

        return response()->json([
            'message' => 'Location updated successfully.'
        ]);
    }
}
