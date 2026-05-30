<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        
        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%");
            })
            ->where('id', '!=', $request->attributes->get('user')->id)
            ->limit(10)
            ->get(['id', 'name', 'phone']);

        return response()->json([
            'data' => $users
        ]);
    }
}
