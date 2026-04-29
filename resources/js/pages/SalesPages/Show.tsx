import { Head, Link, router } from '@inertiajs/react';
import { SalesPage } from '@/types/sales-page';
import { Download, Trash2 } from 'lucide-react';
import ModernTemplate from '@/components/SalesPages/ModernTemplate';
import BoldTemplate from '@/components/SalesPages/BoldTemplate';
import WarmTemplate from '@/components/SalesPages/WarmTemplate';

interface Props {
    page: SalesPage;
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

    const TemplateComponent = {
        modern: ModernTemplate,
        bold: BoldTemplate,
        warm: WarmTemplate,
    }[page.template];

    return (
        <>
            <Head title={`Preview — ${page.product_name}`} />

            <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur px-6 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                    <Link
                        href="/sales-pages"
                        className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        ← Back
                    </Link>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm font-medium text-gray-800">{page.product_name}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExport}
                        className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Download className="h-4 w-4" /> Export .txt
                    </button>
                    <button
                        onClick={handleDelete}
                        className="rounded-lg border border-red-200 px-4 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" /> Delete
                    </button>
                </div>
            </div>

            <TemplateComponent content={page.generated_content} productName={page.product_name} />
        </>
    );
}

Show.layout = (props: { page: SalesPage }) => ({
    breadcrumbs: [
        {
            title: 'Sales Pages',
            href: '/sales-pages',
        },
        {
            title: props.page.product_name,
            href: `/sales-pages/${props.page.id}`,
        },
    ],
});
