import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { TemplateType } from '@/types/sales-page';
import { Plus, FileText, Square, SquareIcon, Sparkles } from 'lucide-react';

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

const templates: { value: TemplateType; label: string; desc: string; preview: React.ReactNode }[] = [
    { value: 'modern', label: 'Modern', desc: 'Clean, minimal & professional', preview: <Square className="h-6 w-6 text-gray-300" /> },
    { value: 'bold', label: 'Bold', desc: 'Dark, high-contrast & powerful', preview: <Square className="h-6 w-6 text-gray-900" /> },
    { value: 'warm', label: 'Warm', desc: 'Friendly, inviting & approachable', preview: <Square className="h-6 w-6 text-orange-400" /> },
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

            <div className="py-10">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    {pageErrors.ai_error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <strong>AI Service Error</strong>
                            </div>
                            <p className="mt-1">{pageErrors.ai_error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">


                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
                            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
                                Product Information
                            </h3>

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


                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3 mb-4">
                                Design Template
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {templates.map((tpl) => (
                                    <button
                                        key={tpl.value}
                                        type="button"
                                        onClick={() => handleChange('template', tpl.value)}
                                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                                            form.template === tpl.value
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-2xl mb-2">{tpl.preview}</div>
                                        <div className="font-semibold text-sm text-gray-900">{tpl.label}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{tpl.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
                                <span className="inline-flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Generate Sales Page
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Sales Pages',
            href: '/sales-pages',
        },
        {
            title: 'Create',
            href: '/sales-pages/create',
        },
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
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-400">*</span>}
                {hint && <span className="ml-1 font-normal text-gray-400">— {hint}</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

function inputClass(hasError: boolean): string {
    return `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
        hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
    }`;
}
