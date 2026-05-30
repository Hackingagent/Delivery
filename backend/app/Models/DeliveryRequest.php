<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliveryRequest extends Model
{
    protected $fillable = [
        'user_id',
        'agent_id',
        'pickup_location',
        'pickup_lat',
        'pickup_lng',
        'dropoff_location',
        'dropoff_lat',
        'dropoff_lng',
        'package_details',
        'fare',
        'status',
        'assigned_at',
        'picked_up_at',
        'delivered_at',
        'pickup_image_path',
        'delivery_image_path',
    ];

    protected $appends = ['pickup_image_url', 'delivery_image_url'];

    public function getPickupImageUrlAttribute()
    {
        return $this->pickup_image_path ? asset('storage/' . $this->pickup_image_path) : null;
    }

    public function getDeliveryImageUrlAttribute()
    {
        return $this->delivery_image_path ? asset('storage/' . $this->delivery_image_path) : null;
    }


    protected $casts = [
        'fare' => 'decimal:2',
        'assigned_at' => 'datetime',
        'picked_up_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }
}
