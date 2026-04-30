import { Head, Link, router } from '@inertiajs/react';
import { SalesPage } from '@/types/sales-page';
import {
    AlertTriangle, ArrowLeft, Download,
    RefreshCw, Trash2, Clock, Eye,
} from 'lucide-react';
import ModernTemplate from '@/components/SalesPages/ModernTemplate';
import BoldTemplate from '@/components/SalesPages/BoldTemplate';
import WarmTemplate from '@/components/SalesPages/WarmTemplate';

interface Props {
    page: SalesPage;
}

const REQUIRED_CONTENT_KEYS = [
    'headline', 'sub_headline', 'hero_description',
    'benefits', 'features', 'social_proof', 'pricing', 'faq', 'cta',
] as const;

function isContentUsable(content: unknown): boolean {
    if (!content || typeof content !== 'object') return false;
    return REQUIRED_CONTENT_KEYS.every((k) => k in (content as Record<string, unknown>));
}

const TEMPLATE_META: Record<string, { label: string; color: string; bg: string }> = {
    modern: { label: 'Modern', color: '#0284C7', bg: '#F0F9FF' },
    bold:   { label: 'Bold',   color: '#18181B', bg: '#F4F4F5' },
    warm:   { label: 'Warm',   color: '#B45309', bg: '#FFFBEB' },
};

function ContentUnavailable({
    productName,
    onDelete,
}: {
    productName: string;
    onDelete: () => void;
}) {
    return (
        <div
            className="flex min-h-[70vh] items-center justify-center p-8"
            style={{ background: '#F7F6F3' }}
        >
            <div className="animate-slide-up w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                        background: '#FFFBEB',
                        border: '1px solid #FDE68A',
                        boxShadow: '0 4px 24px rgba(251,191,36,0.15)',
                    }}
                >
                    <AlertTriangle className="h-7 w-7" style={{ color: '#D97706' }} />
                </div>

                <h2
                    className="text-xl font-bold tracking-tight"
                    style={{ color: '#18181B' }}
                >
                    Content could not be loaded
                </h2>
                <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: '#71717A' }}
                >
                    The AI-generated content for{' '}
                    <span className="font-semibold" style={{ color: '#3F3F46' }}>
                        {productName}
                    </span>{' '}
                    is incomplete or could not be processed.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/sales-pages/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all"
                        style={{
                            background: '#4F46E5',
                            boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
                        }}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Regenerate Page
                    </Link>
                    <Link
                        href="/sales-pages"
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
                        style={{
                            background: '#FFFFFF',
                            color: '#3F3F46',
                            border: '1px solid #E4E4E7',
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Pages
                    </Link>
                </div>

                <button
                    onClick={onDelete}
                    className="mt-6 text-xs transition-colors"
                    style={{ color: '#A1A1AA' }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = '#E11D48';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = '#A1A1AA';
                    }}
                >
                    Delete this entry
                </button>
            </div>
        </div>
    );
}

export default function Show({ page }: Props) {
    const handleDelete = () => {
        if (confirm(`Delete "${page.product_name}"?`)) {
            router.delete(`/sales-pages/${page.id}`, {
                onSuccess: () => router.visit('/sales-pages'),
            });
        }
    };

    const handleExport = () => {
        const c = page.generated_content;
        const text = [
            `SALES PAGE: ${page.product_name}`,
            `Generated: ${new Date(page.created_at).toLocaleDateString()}`,
            `Template: ${page.template}`,
            '', '=== HEADLINE ===', c.headline,
            '', '=== SUB HEADLINE ===', c.sub_headline,
            '', '=== HERO DESCRIPTION ===', c.hero_description,
            '', '=== BENEFITS ===', ...c.benefits.map((b: any) => `- ${b.title}: ${b.description}`),
            '', '=== FEATURES ===', ...c.features.map((f: any) => `- ${f.title}: ${f.description}`),
            '', '=== SOCIAL PROOF ===', ...c.social_proof.map((s: any) => `"${s.quote}" - ${s.name}, ${s.role}`),
            '', '=== PRICING ===', `Price: ${c.pricing.price}`, `Includes: ${c.pricing.description}`,
            '', '=== CTA ===', c.cta.headline, c.cta.button_label, c.cta.sub_text,
            '', '=== FAQ ===', ...c.faq.map((f: any) => `Q: ${f.question}\nA: ${f.answer}`),
        ].join('\n');

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${page.product_name.replace(/\s+/g, '-').toLowerCase()}-sales-page.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const contentUsable = isContentUsable(page.generated_content);
    const COMPONENTS = {
        modern: ModernTemplate,
        bold:   BoldTemplate,
        warm:   WarmTemplate,
    };
    const TemplateComponent = contentUsable
        ? COMPONENTS[page.template as keyof typeof COMPONENTS]
        : null;

    const tplMeta = TEMPLATE_META[page.template];

    return (
        <>
            <Head title={`Preview — ${page.product_name}`} />

            <div className="flex min-h-screen flex-col">
                {/* Sticky Header */}
                <header
                    className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-3 lg:px-8"
                    style={{
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderBottom: '1px solid rgba(228,228,231,0.8)',
                        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
                    }}
                >
                    {/* Left: Navigation */}
                    <div className="flex min-w-0 items-center gap-2">
                        <Link
                            href="/sales-pages"
                            className="group inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-all"
                            style={{ color: '#71717A' }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = '#F4F4F5';
                                (e.currentTarget as HTMLElement).style.color = '#3F3F46';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = '';
                                (e.currentTarget as HTMLElement).style.color = '#71717A';
                            }}
                        >
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
                            <span className="hidden sm:inline">Sales Pages</span>
                        </Link>

                        <span style={{ color: '#D4D4D8' }}>/</span>

                        <div className="flex min-w-0 items-center gap-2">
                            <Eye className="h-3.5 w-3.5 shrink-0" style={{ color: '#4F46E5' }} />
                            <span
                                className="truncate text-sm font-semibold"
                                style={{ color: '#18181B' }}
                            >
                                {page.product_name}
                            </span>
                        </div>

                        {tplMeta && (
                            <span
                                className="hidden shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold sm:inline-block"
                                style={{ background: tplMeta.bg, color: tplMeta.color }}
                            >
                                {tplMeta.label}
                            </span>
                        )}

                        <span
                            className="hidden items-center gap-1.5 rounded-lg px-2 py-0.5 text-xs font-medium sm:inline-flex"
                            style={{ background: '#F4F4F5', color: '#71717A' }}
                        >
                            <Clock className="h-2.5 w-2.5" />
                            {new Date(page.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    {/* Right: Action buttons */}
                    {contentUsable && (
                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                onClick={handleExport}
                                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all"
                                style={{
                                    background: '#FFFFFF',
                                    color: '#3F3F46',
                                    border: '1px solid #E4E4E7',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = '#FAFAFA';
                                    (e.currentTarget as HTMLElement).style.borderColor = '#D4D4D8';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                                    (e.currentTarget as HTMLElement).style.borderColor = '#E4E4E7';
                                }}
                            >
                                <Download className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Export .txt</span>
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all"
                                style={{
                                    background: '#FFF1F2',
                                    color: '#E11D48',
                                    border: '1px solid #FFE4E6',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = '#FFE4E6';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = '#FFF1F2';
                                }}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1" style={{ background: '#F7F6F3' }}>
                    {contentUsable && TemplateComponent ? (
                        <div className="animate-fade-in">
                            <TemplateComponent
                                content={page.generated_content}
                                productName={page.product_name}
                            />
                        </div>
                    ) : (
                        <ContentUnavailable
                            productName={page.product_name}
                            onDelete={handleDelete}
                        />
                    )}
                </main>
            </div>
        </>
    );
}

Show.layout = (props: { page: SalesPage }) => ({
    breadcrumbs: [
        { title: 'Sales Pages', href: '/sales-pages' },
        { title: props.page.product_name, href: `/sales-pages/${props.page.id}` },
    ],
});