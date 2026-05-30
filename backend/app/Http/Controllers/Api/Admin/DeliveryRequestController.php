<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\DeliveryRequest;
use App\Models\Agent;
use Illuminate\Support\Facades\Validator;

class DeliveryRequestController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        
        $query = DeliveryRequest::with(['user', 'agent'])->latest();

        if ($status) {
            $query->where('status', $status);
        }

        $requests = $query->paginate(20);

        return response()->json($requests);
    }

    public function assignAgent(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'agent_id' => 'required|exists:agents,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $deliveryRequest = DeliveryRequest::findOrFail($id);

        if ($deliveryRequest->status !== 'pending') {
            return response()->json(['message' => 'Request is already assigned or completed.'], 422);
        }

        $deliveryRequest->update([
            'agent_id' => $request->agent_id,
            'status' => 'assigned',
            'assigned_at' => now(),
        ]);

        return response()->json([
            'message' => 'Agent assigned successfully.',
            'request' => $deliveryRequest->load('agent')
        ]);
    }
}
