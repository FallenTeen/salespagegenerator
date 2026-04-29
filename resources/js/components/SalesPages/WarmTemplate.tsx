import { GeneratedContent } from '@/types/sales-page';
import { Hand, Heart, Star, Target, Key, Rocket, Check, User, DollarSign, PartyPopper } from 'lucide-react';

interface Props {
    content: GeneratedContent;
    productName: string;
}

export default function WarmTemplate({ content, productName }: Props) {
    return (
        <div className="bg-amber-50 font-sans text-gray-800">

            <section className="px-6 py-24 text-center bg-gradient-to-b from-orange-100 to-amber-50">
                <div className="mx-auto max-w-3xl">
                    <span className="mb-4 inline-block rounded-full bg-orange-200 px-4 py-1.5 text-xs font-semibold text-orange-700 inline-flex items-center gap-1">
                        <Hand className="h-3 w-3" />
                        {productName}
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                        {content.headline}
                    </h1>
                    <p className="text-xl text-orange-700 font-medium mb-4">{content.sub_headline}</p>
                    <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-10">
                        {content.hero_description}
                    </p>
                    <button className="rounded-2xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-orange-600 transition-colors inline-flex items-center gap-2">
                        {content.cta.button_label}
                        <Rocket className="h-4 w-4" />
                    </button>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-12 inline-flex items-center gap-2">
                        Why people love us
                        <Heart className="h-5 w-5 text-red-500" />
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {content.benefits.map((b, i) => {
                            const icons = [Star, Target, Key, Rocket, Heart, Sparkles];
                            const IconComponent = icons[i % icons.length];
                            return (
                                <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-orange-100">
                                    <div className="mb-3 text-2xl"><IconComponent className="h-6 w-6 text-orange-500" /></div>
                                    <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-orange-500 py-20 text-white">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-center text-2xl font-bold mb-12 inline-flex items-center gap-2">
                        Everything you need
                        <Check className="h-5 w-5" />
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {content.features.map((f, i) => (
                            <div key={i} className="flex gap-3 rounded-2xl bg-white/15 p-5 backdrop-blur">
                                <Check className="text-orange-200 h-4 w-4 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-white">{f.title}</h3>
                                    <p className="text-sm text-orange-100 mt-1 leading-relaxed">{f.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-12 inline-flex items-center gap-2">
                        Real stories from real people
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/></svg>
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {content.social_proof.map((s, i) => (
                            <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-orange-100">
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{s.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-orange-200 flex items-center justify-center text-sm font-bold text-orange-700">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                                        <p className="text-xs text-gray-400">{s.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-orange-100">
                <div className="mx-auto max-w-sm px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 inline-flex items-center gap-2">
                        Simple, honest pricing
                        <DollarSign className="h-5 w-5" />
                    </h2>
                    <div className="rounded-3xl bg-white p-8 shadow-lg border border-orange-200">
                        <div className="text-4xl font-extrabold text-orange-600 mb-2">
                            {content.pricing.price}
                        </div>
                        <p className="text-gray-500 text-sm mb-6">{content.pricing.description}</p>
                        <button className="w-full rounded-2xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2">
                            {content.pricing.cta_label}
                            <PartyPopper className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-12 inline-flex items-center gap-2">
                        Got questions?
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                    </h2>
                    <div className="space-y-4">
                        {content.faq.map((f, i) => (
                            <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-orange-100">
                                <h3 className="font-bold text-gray-900 mb-2">{f.question}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-amber-50 to-orange-100 py-24 text-center">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{content.cta.headline}</h2>
                    <p className="text-gray-500 mb-8">{content.cta.sub_text}</p>
                    <button className="rounded-2xl bg-orange-500 px-10 py-4 text-base font-bold text-white shadow-xl hover:bg-orange-600 transition-colors inline-flex items-center gap-2">
                        {content.cta.button_label}
                        <Rocket className="h-4 w-4" />
                    </button>
                </div>
            </section>
        </div>
    );
}