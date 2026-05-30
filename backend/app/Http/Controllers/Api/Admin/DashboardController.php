<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\DeliveryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = DeliveryRequest::where('status', 'delivered')->sum('fare');
        $onlineAgentsCount = Agent::where('status', 'online')->count();
        $completedTodayCount = DeliveryRequest::where('status', 'delivered')
            ->whereDate('delivered_at', now()->toDateString())
            ->count();
        
        // Mock weekly revenue for chart (last 7 days)
        $weeklyRevenue = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $dayName = now()->subDays($i)->format('D');
            $revenue = DeliveryRequest::where('status', 'delivered')
                ->whereDate('delivered_at', $date)
                ->sum('fare');
            
            $weeklyRevenue[] = [
                'day' => $dayName,
                'revenue' => (float)$revenue,
            ];
        }

        // Recent activities
        $recentActivities = DeliveryRequest::latest()
            ->with(['user', 'agent'])
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => [
                'total_revenue' => (float)$totalRevenue,
                'online_agents' => $onlineAgentsCount,
                'completed_today' => $completedTodayCount,
            ],
            'weekly_revenue' => $weeklyRevenue,
            'recent_activities' => $recentActivities->map(function ($item) {
                return [
                    'id' => $item->id,
                    'status' => $item->status,
                    'user_name' => $item->user->name ?? 'User',
                    'agent_name' => $item->agent->name ?? 'None',
                    'created_at' => $item->created_at,
                ];
            })
        ]);
    }
}
