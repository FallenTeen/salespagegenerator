import { GeneratedContent } from '@/types/sales-page';
import { Sparkles } from 'lucide-react';

interface Props {
    content: GeneratedContent;
    productName: string;
}

export default function ModernTemplate({ content, productName }: Props) {
    return (
        <div className="bg-white font-sans text-gray-900">

            <section className="mx-auto max-w-4xl px-6 py-24 text-center">
                <div className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-6">
                    {productName}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
                    {content.headline}
                </h1>
                <p className="text-xl text-gray-500 mb-4">{content.sub_headline}</p>
                <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {content.hero_description}
                </p>
                <div className="mt-10">
                    <button className="rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors">
                        {content.cta.button_label}
                    </button>
                </div>
            </section>

            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">Why Choose Us</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {content.benefits.map((b, i) => (
                            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl mb-3"><Sparkles className="h-6 w-6 text-indigo-600" /></div>
                                <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">Features</h2>
                    <div className="divide-y divide-gray-100">
                        {content.features.map((f, i) => (
                            <div key={i} className="flex gap-6 py-5">
                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold">
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{f.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-indigo-600 py-20 text-white">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-center text-2xl font-bold mb-12">What Our Customers Say</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {content.social_proof.map((s, i) => (
                            <div key={i} className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                                <p className="text-indigo-100 text-sm leading-relaxed mb-4">"{s.quote}"</p>
                                <div>
                                    <p className="font-semibold text-white text-sm">{s.name}</p>
                                    <p className="text-indigo-200 text-xs">{s.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-md px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Simple Pricing</h2>
                    <div className="rounded-2xl border-2 border-indigo-200 p-8 shadow-lg">
                        <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                            {content.pricing.price}
                        </div>
                        <p className="text-gray-500 text-sm mb-6">{content.pricing.description}</p>
                        <button className="w-full rounded-full bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors">
                            {content.pricing.cta_label}
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">FAQ</h2>
                    <div className="space-y-4">
                        {content.faq.map((f, i) => (
                            <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-2">{f.question}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.cta.headline}</h2>
                    <p className="text-gray-500 mb-8">{content.cta.sub_text}</p>
                    <button className="rounded-full bg-indigo-600 px-10 py-4 text-base font-semibold text-white shadow-xl hover:bg-indigo-700 transition-colors">
                        {content.cta.button_label}
                    </button>
                </div>
            </section>
        </div>
    );
}