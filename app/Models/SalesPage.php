<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPage extends Model
{
    protected $fillable = [
        'user_id',
        'product_name',
        'description',
        'features',
        'target_audience',
        'price',
        'usp',
        'template',
        'generated_content',
    ];

    protected $casts = [
        'generated_content' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class); // User Model COnnect
    }
}
