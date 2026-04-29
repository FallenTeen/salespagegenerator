import { GeneratedContent } from '@/types/sales-page';
import { ArrowRight } from 'lucide-react';

interface Props {
    content: GeneratedContent;
    productName: string;
}

export default function BoldTemplate({ content, productName }: Props) {
    return (
        <div className="bg-gray-950 text-white font-sans">

            <section className="relative overflow-hidden px-6 py-28 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-gray-950 pointer-events-none" />
                <div className="relative mx-auto max-w-4xl">
                    <span className="mb-6 inline-block rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-300">
                        {productName}
                    </span>
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white leading-none mb-6">
                        {content.headline}
                    </h1>
                    <p className="text-xl text-gray-300 mb-4">{content.sub_headline}</p>
                    <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        {content.hero_description}
                    </p>
                    <button className="rounded-lg bg-violet-600 px-8 py-4 text-base font-bold text-white hover:bg-violet-500 transition-colors shadow-2xl shadow-violet-900/50 inline-flex items-center gap-2">
                        {content.cta.button_label}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-10">Why It Works</h2>
                    <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden">
                        {content.benefits.map((b, i) => (
                            <div key={i} className="bg-gray-950 p-6 hover:bg-gray-900 transition-colors">
                                <div className="text-violet-400 font-black text-xl mb-3">0{i + 1}</div>
                                <h3 className="font-bold text-white mb-2">{b.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{b.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-10">Features</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {content.features.map((f, i) => (
                            <div key={i} className="flex gap-4 rounded-xl border border-white/10 p-5 hover:border-violet-500/40 transition-colors">
                                <ArrowRight className="text-violet-400 h-4 w-4 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-white text-sm">{f.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{f.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-10">Testimonials</h2>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {content.social_proof.map((s, i) => (
                            <div key={i} className="rounded-xl border border-white/10 p-5">
                                <p className="text-sm text-gray-300 leading-relaxed mb-4 italic">"{s.quote}"</p>
                                <p className="text-xs font-bold text-white">{s.name}</p>
                                <p className="text-xs text-gray-500">{s.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="mx-auto max-w-sm px-6 text-center">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-8">Pricing</h2>
                    <div className="rounded-2xl border border-violet-500/40 bg-violet-950/30 p-8">
                        <div className="text-5xl font-black text-white mb-2">{content.pricing.price}</div>
                        <p className="text-gray-400 text-sm mb-6">{content.pricing.description}</p>
                        <button className="w-full rounded-lg bg-violet-600 py-3 font-bold text-white hover:bg-violet-500 transition-colors">
                            {content.pricing.cta_label}
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-10">FAQ</h2>
                    <div className="space-y-3">
                        {content.faq.map((f, i) => (
                            <div key={i} className="rounded-xl border border-white/10 p-5">
                                <h3 className="font-bold text-white mb-2 text-sm">{f.question}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 text-center border-t border-white/5">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="text-4xl font-black text-white mb-4">{content.cta.headline}</h2>
                    <p className="text-gray-400 mb-8">{content.cta.sub_text}</p>
                    <button className="rounded-lg bg-violet-600 px-10 py-4 text-base font-bold text-white hover:bg-violet-500 transition-colors inline-flex items-center gap-2">
                        {content.cta.button_label}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </section>
        </div>
    );
}