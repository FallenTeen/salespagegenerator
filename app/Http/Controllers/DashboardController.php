<?php

namespace App\Http\Controllers;

use App\Models\SalesPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();

        $pages = $user->salesPages()
            ->latest()
            ->get(['id', 'product_name', 'template', 'created_at']);

        $stats = [
            'total'   => $pages->count(),
            'modern'  => $pages->where('template', 'modern')->count(),
            'bold'    => $pages->where('template', 'bold')->count(),
            'warm'    => $pages->where('template', 'warm')->count(),
        ];

        return Inertia::render('dashboard', [
            'pages' => $pages,
            'stats' => $stats,
        ]);
    }
}