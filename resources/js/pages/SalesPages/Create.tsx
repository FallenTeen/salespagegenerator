import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { TemplateType } from '@/types/sales-page';
import {
    AlertCircle,
    Sparkles,
    Loader2,
    Monitor,
    Zap,
    Flame,
} from 'lucide-react';

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

const templates: {
    value: TemplateType;
    label: string;
    desc: string;
    preview: string;
    icon: React.ReactNode;
    accentClass: string;
}[] = [
    {
        value: 'modern',
        label: 'Modern',
        desc: 'Clean, minimal and professional',
        preview: 'bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900',
        icon: <Monitor className="h-4 w-4" />,
        accentClass: 'text-sky-600 dark:text-sky-400',
    },
    {
        value: 'bold',
        label: 'Bold',
        desc: 'Dark, high-contrast and powerful',
        preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
        icon: <Flame className="h-4 w-4" />,
        accentClass: 'text-slate-300',
    },
    {
        value: 'warm',
        label: 'Warm',
        desc: 'Friendly, inviting and approachable',
        preview: 'bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900 dark:to-orange-950',
        icon: <Zap className="h-4 w-4" />,
        accentClass: 'text-amber-600 dark:text-amber-400',
    },
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

            <div className="relative min-h-screen bg-white dark:bg-slate-950">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-100/70 blur-3xl dark:bg-violet-900/20" />
                    <div className="absolute top-1/2 -right-40 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-900/15" />
                </div>

                <div className="relative z-10 mx-auto px-6 py-10 lg:px-8 lg:py-14">
                    <div className="mb-10">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 dark:border-violet-900 dark:bg-violet-950">
                            <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                            <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                                AI-Powered
                            </span>
                        </div>
                        <h1 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                            Generate Sales Page
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Fill in the details below and our AI will craft a high-converting sales page for you.
                        </p>
                    </div>

                    {pageErrors.ai_error && (
                        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
                            <div>
                                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                                    AI Service Error
                                </p>
                                <p className="mt-0.5 text-sm text-red-600 dark:text-red-400">
                                    {pageErrors.ai_error}
                                </p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <Section title="Product Information" step="01">
                            <Field
                                label="Product / Service Name"
                                error={errors.product_name}
                                required
                            >
                                <Input
                                    type="text"
                                    value={form.product_name}
                                    onChange={(e) =>
                                        handleChange('product_name', e.target.value)
                                    }
                                    placeholder="e.g. ProFlow CRM"
                                    hasError={!!errors.product_name}
                                />
                            </Field>

                            <Field
                                label="Description"
                                error={errors.description}
                                required
                            >
                                <Textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) =>
                                        handleChange('description', e.target.value)
                                    }
                                    placeholder="What does your product do? What problem does it solve?"
                                    hasError={!!errors.description}
                                />
                            </Field>

                            <Field
                                label="Key Features"
                                hint="Separate each feature with a comma"
                                error={errors.features}
                                required
                            >
                                <Textarea
                                    rows={2}
                                    value={form.features}
                                    onChange={(e) =>
                                        handleChange('features', e.target.value)
                                    }
                                    placeholder="e.g. Real-time analytics, AI automation, Team collaboration"
                                    hasError={!!errors.features}
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field
                                    label="Target Audience"
                                    error={errors.target_audience}
                                    required
                                >
                                    <Input
                                        type="text"
                                        value={form.target_audience}
                                        onChange={(e) =>
                                            handleChange('target_audience', e.target.value)
                                        }
                                        placeholder="e.g. SaaS founders"
                                        hasError={!!errors.target_audience}
                                    />
                                </Field>

                                <Field
                                    label="Price"
                                    error={errors.price}
                                    required
                                >
                                    <Input
                                        type="text"
                                        value={form.price}
                                        onChange={(e) =>
                                            handleChange('price', e.target.value)
                                        }
                                        placeholder="e.g. $49/month"
                                        hasError={!!errors.price}
                                    />
                                </Field>
                            </div>

                            <Field
                                label="Unique Selling Points"
                                hint="Optional"
                            >
                                <Textarea
                                    rows={2}
                                    value={form.usp}
                                    onChange={(e) =>
                                        handleChange('usp', e.target.value)
                                    }
                                    placeholder="e.g. 10x faster than competitors, No setup fees, 24/7 support"
                                    hasError={false}
                                />
                            </Field>
                        </Section>

                        <Section title="Design Template" step="02">
                            <div className="grid grid-cols-3 gap-3">
                                {templates.map((tpl) => (
                                    <button
                                        key={tpl.value}
                                        type="button"
                                        onClick={() =>
                                            handleChange('template', tpl.value)
                                        }
                                        className={`group relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                                            form.template === tpl.value
                                                ? 'border-violet-500 bg-violet-50 shadow-sm shadow-violet-100 dark:bg-violet-950 dark:shadow-violet-900/20'
                                                : 'border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700'
                                        }`}
                                    >
                                        {form.template === tpl.value && (
                                            <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600">
                                                <svg
                                                    className="h-2.5 w-2.5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                        <div
                                            className={`mb-3 h-10 w-full rounded-xl ${tpl.preview}`}
                                        />
                                        <div
                                            className={`mb-0.5 flex items-center gap-1.5 text-sm font-semibold ${
                                                form.template === tpl.value
                                                    ? 'text-violet-700 dark:text-violet-300'
                                                    : 'text-slate-700 dark:text-slate-300'
                                            }`}
                                        >
                                            <span className={tpl.accentClass}>
                                                {tpl.icon}
                                            </span>
                                            {tpl.label}
                                        </div>
                                        <div className="text-xs leading-snug text-slate-400 dark:text-slate-500">
                                            {tpl.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Section>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-violet-900/30 dark:hover:shadow-violet-900/50"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="relative flex items-center gap-2.5">
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Generating with AI...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        Generate Sales Page
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
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

function Section({
    title,
    step,
    children,
}: {
    title: string;
    step: string;
    children: React.ReactNode;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
                    {step}
                </span>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {title}
                </h2>
            </div>
            <div className="flex flex-col gap-5 p-6">{children}</div>
        </div>
    );
}

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
        <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
                {required && (
                    <span className="text-violet-400">*</span>
                )}
                {hint && (
                    <span className="font-normal text-slate-400 dark:text-slate-500">
                        — {hint}
                    </span>
                )}
            </label>
            {children}
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                </p>
            )}
        </div>
    );
}

function Input({
    hasError,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError: boolean }) {
    return (
        <input
            {...props}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500 focus:ring-offset-0 focus:border-transparent dark:text-slate-100 dark:placeholder-slate-600 ${
                hasError
                    ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950'
                    : 'border-slate-200 bg-slate-50 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-800'
            }`}
        />
    );
}

function Textarea({
    hasError,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError: boolean }) {
    return (
        <textarea
            {...props}
            className={`w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500 focus:ring-offset-0 focus:border-transparent dark:text-slate-100 dark:placeholder-slate-600 ${
                hasError
                    ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950'
                    : 'border-slate-200 bg-slate-50 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-800'
            }`}
        />
    );
}