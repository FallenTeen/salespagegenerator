import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { TemplateType } from '@/types/sales-page';
import { AlertCircle, Sparkles, Square } from 'lucide-react';

interface FormData {
    product_name: string;
    description: string;
    features: string;
    target_audience: string;
    price: string;
    usp: string;
    template: TemplateType;
}

interface PageProps {
    errors: {
        ai_error?: string;
    };
}

const templates: { value: TemplateType; label: string; desc: string; swatch: string }[] = [
    { value: 'modern', label: 'Modern', desc: 'Clean, minimal & professional', swatch: 'bg-gray-100 border-gray-200' },
    { value: 'bold',   label: 'Bold',   desc: 'Dark, high-contrast & powerful', swatch: 'bg-gray-900 border-gray-900' },
    { value: 'warm',   label: 'Warm',   desc: 'Friendly, inviting & approachable', swatch: 'bg-orange-400 border-orange-400' },
];

export default function Create({ errors: pageErrors }: PageProps) {
    const [form, setForm] = useState<FormData>({
        product_name: '',
        description: '',
        features: '',
        target_audience: '',
        price: '',
        usp: '',
        template: 'modern',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof FormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/sales-pages', form, {
            onError: (errs) => {
                setErrors(errs as Partial<FormData>);
                setLoading(false);
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <>
            <Head title="Generate Sales Page" />

            <div className="flex flex-col gap-8 p-6 lg:p-8">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Generate Sales Page</h1>
                    <p className="mt-0.5 text-sm text-gray-500">Fill in the details below and AI will write your sales page.</p>
                </div>

                {pageErrors.ai_error && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        <div>
                            <p className="text-sm font-medium text-red-700">AI Service Error</p>
                            <p className="mt-0.5 text-sm text-red-600">{pageErrors.ai_error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 border-b border-gray-100 pb-3 text-sm font-semibold text-gray-900">
                            Product Information
                        </h2>

                        <div className="flex flex-col gap-5">
                            <Field label="Product / Service Name" error={errors.product_name} required>
                                <input
                                    type="text"
                                    value={form.product_name}
                                    onChange={(e) => handleChange('product_name', e.target.value)}
                                    placeholder="e.g. ProFlow CRM"
                                    className={inputClass(!!errors.product_name)}
                                />
                            </Field>

                            <Field label="Description" error={errors.description} required>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="What does your product do? What problem does it solve?"
                                    className={inputClass(!!errors.description)}
                                />
                            </Field>

                            <Field
                                label="Key Features"
                                hint="Separate each feature with a comma"
                                error={errors.features}
                                required
                            >
                                <textarea
                                    rows={2}
                                    value={form.features}
                                    onChange={(e) => handleChange('features', e.target.value)}
                                    placeholder="e.g. Real-time analytics, AI automation, Team collaboration"
                                    className={inputClass(!!errors.features)}
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Target Audience" error={errors.target_audience} required>
                                    <input
                                        type="text"
                                        value={form.target_audience}
                                        onChange={(e) => handleChange('target_audience', e.target.value)}
                                        placeholder="e.g. SaaS founders"
                                        className={inputClass(!!errors.target_audience)}
                                    />
                                </Field>

                                <Field label="Price" error={errors.price} required>
                                    <input
                                        type="text"
                                        value={form.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                        placeholder="e.g. $49/month"
                                        className={inputClass(!!errors.price)}
                                    />
                                </Field>
                            </div>

                            <Field label="Unique Selling Points" hint="Optional — what makes you stand out?">
                                <textarea
                                    rows={2}
                                    value={form.usp}
                                    onChange={(e) => handleChange('usp', e.target.value)}
                                    placeholder="e.g. 10x faster than competitors, No setup fees, 24/7 support"
                                    className={inputClass(false)}
                                />
                            </Field>
                        </div>
                    </div>

                    <div className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 border-b border-gray-100 pb-3 text-sm font-semibold text-gray-900">
                            Design Template
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {templates.map((tpl) => (
                                <button
                                    key={tpl.value}
                                    type="button"
                                    onClick={() => handleChange('template', tpl.value)}
                                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                                        form.template === tpl.value
                                            ? 'border-indigo-500 bg-indigo-50'
                                            : 'border-gray-100 hover:border-gray-200'
                                    }`}
                                >
                                    <div className={`mb-3 h-8 w-8 rounded-lg border ${tpl.swatch}`} />
                                    <div className="text-sm font-semibold text-gray-900">{tpl.label}</div>
                                    <div className="mt-0.5 text-xs text-gray-400">{tpl.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-2xl">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Generating with AI...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Generate Sales Page
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Sales Pages', href: '/sales-pages' },
        { title: 'Create', href: '/sales-pages/create' },
    ],
};

function Field({
    label,
    hint,
    error,
    required,
    children,
}: {
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="ml-0.5 text-red-400">*</span>}
                {hint && <span className="ml-1 font-normal text-gray-400">— {hint}</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

function inputClass(hasError: boolean): string {
    return `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
        hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
    }`;
}