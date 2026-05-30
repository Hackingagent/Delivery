<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class Agent extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\AgentFactory> */
    use HasFactory;

    use SoftDeletes;

    public const STATUS_OFFLINE = 'offline';

    public const STATUS_ONLINE = 'online';

    public const STATUS_IN_TRANSIT = 'in_transit';

    public const STATUSES = [
        self::STATUS_OFFLINE,
        self::STATUS_ONLINE,
        self::STATUS_IN_TRANSIT,
    ];

    protected $fillable = [
        'name',
        'phone',
        'pin_hash',
        'license_id',
        'base_zone',
        'vehicle_plate',
        'status',
        'avatar_path',
        'is_active',
        'last_login_at',
        'current_lat',
        'current_lng',
        'last_location_update_at',
    ];

    protected $hidden = [
        'pin_hash',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    public function accessTokens(): HasMany
    {
        return $this->hasMany(AgentAccessToken::class);
    }

    public function createAccessToken(string $name = 'mobile'): string
    {
        $plainTextToken = Str::random(64);

        $this->accessTokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken),
            'expires_at' => now()->addDays(30),
        ]);

        return $plainTextToken;
    }

    public function revokeAllTokens(): void
    {
        $this->accessTokens()->delete();
    }

    public static function generateLicenseId(): string
    {
        do {
            $licenseId = 'BAM-DL-'.strtoupper(Str::random(4));
        } while (static::withTrashed()->where('license_id', $licenseId)->exists());

        return $licenseId;
    }

    public function updatePin(string $pin): void
    {
        $this->pin_hash = bcrypt($pin);
        $this->save();
    }

    public function verifyPin(string $pin): bool
    {
        return password_verify($pin, $this->pin_hash);
    }

    public function displayStatus(): string
    {
        return match ($this->status) {
            self::STATUS_ONLINE => 'Online',
            self::STATUS_IN_TRANSIT => 'In Transit',
            default => 'Offline',
        };
    }
}
