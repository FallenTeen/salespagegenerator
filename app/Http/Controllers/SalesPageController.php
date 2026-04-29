<?php

namespace App\Http\Controllers;

use App\Models\SalesPage;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesPageController extends Controller
{
    public function __construct(protected GeminiService $gemini) {}

    public function index()
    {
        $pages = auth()->user()
            ->salesPages()
            ->latest()
            ->get(['id', 'product_name', 'template', 'created_at']);

        return Inertia::render('SalesPages/Index', ['pages' => $pages]);
    }

    public function create()
    {
        return Inertia::render('SalesPages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name'    => 'required|string|max:255',
            'description'     => 'required|string',
            'features'        => 'required|string',
            'target_audience' => 'required|string|max:255',
            'price'           => 'required|string|max:100',
            'usp'             => 'nullable|string',
            'template'        => 'required|in:modern,bold,warm',
        ]);

        $generated = $this->gemini->generateSalesPage($validated);

        $page = auth()->user()->salesPages()->create([
            ...$validated,
            'generated_content' => $generated,
        ]);

        return redirect()->route('sales-pages.show', $page->id);
    }

    public function show(SalesPage $salesPage)
    {
        $this->authorize('view', $salesPage);

        return Inertia::render('SalesPages/Show', ['page' => $salesPage]);
    }

    public function destroy(SalesPage $salesPage)
    {
        $this->authorize('delete', $salesPage);
        $salesPage->delete();

        return redirect()->route('sales-pages.index');
    }
}
