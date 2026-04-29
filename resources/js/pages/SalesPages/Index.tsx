import { Head, Link, router } from '@inertiajs/react';
import { SalesPageSummary } from '@/types/sales-page';
import { Plus, FileText } from 'lucide-react';

interface Props {
    pages: SalesPageSummary[];
}

const templateLabels = {
    modern: { label: 'Modern', color: 'bg-blue-100 text-blue-700' },
    bold: { label: 'Bold', color: 'bg-gray-900 text-white' },
    warm: { label: 'Warm', color: 'bg-amber-100 text-amber-700' },
};

export default function Index({ pages }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete "${name}"? This cannot be undone.`)) {
            router.delete(`/sales-pages/${id}`);
        }
    };

    return (
        <>
            <Head title="My Sales Pages" />

            <div className="py-10">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {pages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center">
                            <div className="text-5xl mb-4"><FileText className="h-12 w-12 text-gray-400" /></div>
                            <h3 className="text-lg font-semibold text-gray-700">No sales pages yet</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Generate your first AI-powered sales page!
                            </p>
                            <Link
                                href="/sales-pages/create"
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {pages.map((page) => {
                                const tpl = templateLabels[page.template];
                                return (
                                    <div
                                        key={page.id}
                                        className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">
                                                {page.product_name}
                                            </h3>
                                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${tpl.color}`}>
                                                {tpl.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-5">
                                            {new Date(page.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <div className="mt-auto flex items-center gap-3">
                                            <Link
                                                href={`/sales-pages/${page.id}`}
                                                className="flex-1 rounded-lg bg-indigo-50 px-3 py-2 text-center text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                                            >
                                                Preview
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(page.id, page.product_name)}
                                                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Sales Pages',
            href: '/sales-pages',
        },
    ],
};
