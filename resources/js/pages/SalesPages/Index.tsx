import { Head, Link, router } from '@inertiajs/react';
import { SalesPageSummary } from '@/types/sales-page';
import { FileText, Flame, Moon, Plus, Sun, Eye, Trash2 } from 'lucide-react';

interface Props {
    pages: SalesPageSummary[];
}

const templateMeta: Record<string, { label: string; badgeClass: string; icon: React.ReactNode }> = {
    modern: {
        label: 'Modern',
        badgeClass: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
        icon: <Sun className="h-3 w-3" />,
    },
    bold: {
        label: 'Bold',
        badgeClass: 'bg-gray-900 text-white',
        icon: <Flame className="h-3 w-3" />,
    },
    warm: {
        label: 'Warm',
        badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
        icon: <Moon className="h-3 w-3" />,
    },
};

export default function Index({ pages }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete "${name}"? This cannot be undone.`)) {
            router.delete(`/sales-pages/${id}`);
        }
    };

    return (
        <>
            <Head title="Sales Pages" />

            <div className="flex flex-col gap-8 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Sales Pages</h1>
                        <p className="mt-0.5 text-sm text-gray-500">All your AI-generated sales pages in one place.</p>
                    </div>
                    <Link
                        href="/sales-pages/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                    >
                        <Plus className="h-4 w-4" />
                        New Page
                    </Link>
                </div>

                {pages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                            <FileText className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-700">No sales pages yet</h3>
                        <p className="mt-1 text-xs text-gray-400">Generate your first AI-powered sales page to get started.</p>
                        <Link
                            href="/sales-pages/create"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                        >
                            <Plus className="h-4 w-4" />
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pages.map((page) => {
                            const meta = templateMeta[page.template];
                            return (
                                <div
                                    key={page.id}
                                    className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <h3 className="line-clamp-2 font-semibold leading-snug text-gray-900">
                                            {page.product_name}
                                        </h3>
                                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.badgeClass}`}>
                                            {meta.icon}
                                            {meta.label}
                                        </span>
                                    </div>
                                    <p className="mb-5 text-xs text-gray-400">
                                        {new Date(page.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2">
                                        <Link
                                            href={`/sales-pages/${page.id}`}
                                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            Preview
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page.id, page.product_name)}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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