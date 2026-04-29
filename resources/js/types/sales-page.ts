export interface Benefit {
    title: string;
    description: string;
}

export interface Feature {
    title: string;
    description: string;
}

export interface SocialProof {
    name: string;
    role: string;
    quote: string;
}

export interface Pricing {
    price: string;
    description: string;
    cta_label: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface CTA {
    headline: string;
    button_label: string;
    sub_text: string;
}

export interface GeneratedContent {
    headline: string;
    sub_headline: string;
    hero_description: string;
    benefits: Benefit[];
    features: Feature[];
    social_proof: SocialProof[];
    pricing: Pricing;
    faq: FAQ[];
    cta: CTA;
}

export type TemplateType = 'modern' | 'bold' | 'warm';

export interface SalesPage {
    id: number;
    product_name: string;
    description: string;
    features: string;
    target_audience: string;
    price: string;
    usp: string | null;
    template: TemplateType;
    generated_content: GeneratedContent;
    created_at: string;
}

export interface SalesPageSummary {
    id: number;
    product_name: string;
    template: TemplateType;
    created_at: string;
}
