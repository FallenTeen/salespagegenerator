import { Head, Link, router } from '@inertiajs/react';
import { SalesPage } from '@/types/sales-page';
import { AlertTriangle, ArrowLeft, Download, RefreshCw, Trash2 } from 'lucide-react';
import ModernTemplate from '@/components/SalesPages/ModernTemplate';
import BoldTemplate from '@/components/SalesPages/BoldTemplate';
import WarmTemplate from '@/components/SalesPages/WarmTemplate';

interface Props {
    page: SalesPage;
}

function isContentUsable(content: any): boolean {
    if (!content || typeof content !== 'object') return false;
    const required = ['headline', 'sub_headline', 'hero_description', 'benefits', 'features', 'social_proof', 'pricing', 'faq', 'cta'];
    return required.every((key) => key in content);
}

function ContentUnavailable({ productName, onDelete }: { productName: string; onDelete: () => void }) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Content could not be loaded</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    The AI-generated content for{' '}
                    <span className="font-medium text-gray-700">{productName}</span> is incomplete or
                    could not be processed. This can happen when the AI service returns an unexpected response.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/sales-pages/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Regenerate Page
                    </Link>
                    <Link
                        href="/sales-pages"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Pages
                    </Link>
                </div>
                <button
                    onClick={onDelete}
                    className="mt-4 text-xs text-red-400 underline-offset-2 transition-colors hover:text-red-500 hover:underline"
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
        const content = page.generated_content;
        const text = [
            `SALES PAGE: ${page.product_name}`,
            `Generated: ${new Date(page.created_at).toLocaleDateString()}`,
            `Template: ${page.template}`,
            '',
            '=== HEADLINE ===',
            content.headline,
            '',
            '=== SUB HEADLINE ===',
            content.sub_headline,
            '',
            '=== HERO DESCRIPTION ===',
            content.hero_description,
            '',
            '=== BENEFITS ===',
            ...content.benefits.map((b) => `• ${b.title}: ${b.description}`),
            '',
            '=== FEATURES ===',
            ...content.features.map((f) => `• ${f.title}: ${f.description}`),
            '',
            '=== SOCIAL PROOF ===',
            ...content.social_proof.map((s) => `"${s.quote}" — ${s.name}, ${s.role}`),
            '',
            '=== PRICING ===',
            `Price: ${content.pricing.price}`,
            `Includes: ${content.pricing.description}`,
            '',
            '=== CTA ===',
            content.cta.headline,
            content.cta.button_label,
            content.cta.sub_text,
            '',
            '=== FAQ ===',
            ...content.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`),
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

    const TemplateComponent = contentUsable
        ? { modern: ModernTemplate, bold: BoldTemplate, warm: WarmTemplate }[page.template]
        : null;

    return (
        <>
            <Head title={`Preview — ${page.product_name}`} />

            <div className="flex flex-col gap-0">
                <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/sales-pages"
                            className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Sales Pages
                        </Link>
                        <span className="text-gray-200">/</span>
                        <span className="text-sm font-medium text-gray-800 line-clamp-1">{page.product_name}</span>
                    </div>

                    {contentUsable && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleExport}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                <Download className="h-4 w-4" />
                                Export .txt
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {contentUsable && TemplateComponent ? (
                    <TemplateComponent content={page.generated_content} productName={page.product_name} />
                ) : (
                    <ContentUnavailable productName={page.product_name} onDelete={handleDelete} />
                )}
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