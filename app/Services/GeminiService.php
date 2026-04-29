<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
        $this->model = config('services.gemini.model');
        $this->baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent";
    }

    public function generateSalesPage(array $data): array
    {
        $prompt = $this->buildPrompt($data);

        $response = Http::timeout(60)->post("{$this->baseUrl}?key={$this->apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
                'temperature' => 0.7,
            ]
        ]);

        if ($response->failed()) {
            throw new \Exception('Gemini API request failed: ' . $response->body());
        }

        $content = $response->json('candidates.0.content.parts.0.text');

        return json_decode($content, true);
    }

    protected function buildPrompt(array $data): string
    {
        return <<<PROMPT
You are an expert copywriter. Generate a complete sales page for the following product.

Product Name: {$data['product_name']}
Description: {$data['description']}
Key Features: {$data['features']}
Target Audience: {$data['target_audience']}
Price: {$data['price']}
Unique Selling Points: {$data['usp']}

Respond ONLY with a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "headline": "Main compelling headline",
  "sub_headline": "Supporting sub-headline",
  "hero_description": "2-3 sentence compelling intro paragraph",
  "benefits": [
    {"title": "Benefit title", "description": "Benefit description"}
  ],
  "features": [
    {"title": "Feature name", "description": "Feature description"}
  ],
  "social_proof": [
    {"name": "Customer Name", "role": "Job Title", "quote": "Testimonial quote"}
  ],
  "pricing": {
    "price": "{$data['price']}",
    "description": "What's included",
    "cta_label": "Buy Now"
  },
  "faq": [
    {"question": "Common question?", "answer": "Clear answer"}
  ],
  "cta": {
    "headline": "Final CTA headline",
    "button_label": "Action button text",
    "sub_text": "Risk-free guarantee or note"
  }
}
PROMPT;
    }
}
