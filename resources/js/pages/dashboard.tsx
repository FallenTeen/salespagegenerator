import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { SalesPageSummary } from '@/types/sales-page';
import { ArrowRight, Eye, FileText, Flame, Layers, Moon, Plus, Sun, Trash2 } from 'lucide-react';

interface Stats {
    total: number;
    modern: number;
    bold: number;
    warm: number;
}

interface Props {
    pages: SalesPageSummary[];
    stats: Stats;
    currentTeam?: { slug: string } | null;
}

const templateMeta: Record<string, { label: string; badgeClass: string; icon: React.ReactNode }> = {
    modern: {
        label: 'Modern',
        badgeClass: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
        icon: <Sun className="h-3.5 w-3.5" />,
    },
    bold: {
        label: 'Bold',
        badgeClass: 'bg-gray-900 text-white',
        icon: <Flame className="h-3.5 w-3.5" />,
    },
    warm: {
        label: 'Warm',
        badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
        icon: <Moon className="h-3.5 w-3.5" />,
    },
};

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
            {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
        </div>
    );
}

export default function Dashboard({ pages, stats }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete "${name}"? This cannot be undone.`)) {
            router.delete(`/sales-pages/${id}`);
        }
    };

    const recent = pages.slice(0, 6);

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                        <p className="mt-0.5 text-sm text-gray-500">Overview of your AI-generated sales pages.</p>
                    </div>
                    <Link
                        href="/sales-pages/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                    >
                        <Plus className="h-4 w-4" />
                        New Page
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Total Pages" value={stats.total} sub="all time" />
                    <StatCard label="Modern" value={stats.modern} sub="template" />
                    <StatCard label="Bold" value={stats.bold} sub="template" />
                    <StatCard label="Warm" value={stats.warm} sub="template" />
                </div>

                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-700">Recent Pages</h2>
                        {pages.length > 6 && (
                            <Link
                                href="/sales-pages"
                                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                            >
                                View all <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        )}
                    </div>

                    {pages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
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
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/60">
                                        <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-widest text-gray-400">Product</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-widest text-gray-400">Template</th>
                                        <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-widest text-gray-400">Created</th>
                                        <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recent.map((page) => {
                                        const meta = templateMeta[page.template];
                                        return (
                                            <tr key={page.id} className="transition-colors hover:bg-gray-50/50">
                                                <td className="px-5 py-3.5">
                                                    <span className="line-clamp-1 font-medium text-gray-900">{page.product_name}</span>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.badgeClass}`}>
                                                        {meta.icon}
                                                        {meta.label}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-400">
                                                    {new Date(page.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/sales-pages/${page.id}`}
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            Preview
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(page.id, page.product_name)}
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {pages.length > 0 && (
                    <div className="flex justify-center">
                        <Link
                            href="/sales-pages"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                            <Layers className="h-4 w-4" />
                            View All Sales Pages
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});