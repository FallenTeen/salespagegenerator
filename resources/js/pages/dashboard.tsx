import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { SalesPageSummary } from '@/types/sales-page';
import {
    ArrowRight, Eye, FileText, Flame, Layers,
    Moon, Plus, Sun, Trash2, Sparkles, TrendingUp,
} from 'lucide-react';

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

const templateConfig: Record<string, {
    label: string;
    icon: React.ReactNode;
    pillClass: string;
    dotColor: string;
}> = {
    modern: {
        label: 'Modern',
        icon: <Sun className="h-3 w-3" />,
        pillClass: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
        dotColor: '#0EA5E9',
    },
    bold: {
        label: 'Bold',
        icon: <Flame className="h-3 w-3" />,
        pillClass: 'bg-zinc-900 text-white',
        dotColor: '#18181B',
    },
    warm: {
        label: 'Warm',
        icon: <Moon className="h-3 w-3" />,
        pillClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
        dotColor: '#F59E0B',
    },
};

function StatCard({
    label,
    value,
    sub,
    accent,
    delay,
}: {
    label: string;
    value: number;
    sub?: string;
    accent: string;
    delay: number;
}) {
    return (
        <div
            className="animate-slide-up rounded-2xl bg-white p-6"
            style={{
                animationDelay: `${delay}ms`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
                border: '1px solid #E4E4E7',
            }}
        >
            <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    {label}
                </span>
                <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: accent }}
                />
            </div>
            <p
                className="text-3xl font-bold tracking-tight"
                style={{ color: '#18181B' }}
            >
                {value}
            </p>
            {sub && (
                <p className="mt-1 text-xs text-zinc-400">{sub}</p>
            )}
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

            <div className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
                <div className="mx-auto px-6 py-8 lg:px-8 lg:py-10 bg-white">


                    <div
                        className="animate-slide-up mb-8 flex items-start justify-between gap-4"
                        style={{ animationDelay: '0ms' }}
                    >
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                                    style={{ background: '#EEF2FF' }}
                                >
                                    <TrendingUp className="h-4 w-4" style={{ color: '#4F46E5' }} />
                                </div>
                                <span
                                    className="text-xs font-semibold uppercase tracking-widest"
                                    style={{ color: '#4F46E5' }}
                                >
                                    Overview
                                </span>
                            </div>
                            <h1
                                className="text-2xl font-bold tracking-tight"
                                style={{ color: '#18181B' }}
                            >
                                Dashboard
                            </h1>
                            <p className="mt-1 text-sm" style={{ color: '#71717A' }}>
                                Your AI-generated sales pages at a glance.
                            </p>
                        </div>
                        <Link
                            href="/sales-pages/create"
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-px"
                            style={{
                                background: '#4F46E5',
                                boxShadow: '0 2px 8px rgba(79,70,229,0.3), 0 1px 2px rgba(79,70,229,0.2)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = '#4338CA';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = '#4F46E5';
                            }}
                        >
                            <Plus className="h-4 w-4" />
                            New Page
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            label="Total Pages"
                            value={stats.total}
                            sub="all time"
                            accent="#4F46E5"
                            delay={60}
                        />
                        <StatCard
                            label="Modern"
                            value={stats.modern}
                            sub="template"
                            accent="#0EA5E9"
                            delay={100}
                        />
                        <StatCard
                            label="Bold"
                            value={stats.bold}
                            sub="template"
                            accent="#18181B"
                            delay={140}
                        />
                        <StatCard
                            label="Warm"
                            value={stats.warm}
                            sub="template"
                            accent="#F59E0B"
                            delay={180}
                        />
                    </div>

                    {/* Recent Pages Section */}
                    <div
                        className="animate-slide-up"
                        style={{ animationDelay: '220ms' }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2
                                className="text-sm font-semibold"
                                style={{ color: '#3F3F46' }}
                            >
                                Recent Pages
                            </h2>
                            {pages.length > 6 && (
                                <Link
                                    href="/sales-pages"
                                    className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                                    style={{ color: '#4F46E5' }}
                                >
                                    View all
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            )}
                        </div>

                        {pages.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div
                                className="overflow-hidden rounded-2xl bg-white"
                                style={{
                                    border: '1px solid #E4E4E7',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                }}
                            >
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #F4F4F5', background: '#FAFAFA' }}>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: '#A1A1AA' }}>
                                                Product
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: '#A1A1AA' }}>
                                                Template
                                            </th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: '#A1A1AA' }}>
                                                Created
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-widest" style={{ color: '#A1A1AA' }}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recent.map((page, idx) => {
                                            const cfg = templateConfig[page.template];
                                            return (
                                                <tr
                                                    key={page.id}
                                                    className="group transition-colors"
                                                    style={{
                                                        borderBottom: idx < recent.length - 1 ? '1px solid #F4F4F5' : 'none',
                                                    }}
                                                    onMouseEnter={e => {
                                                        (e.currentTarget as HTMLElement).style.background = '#FAFAFA';
                                                    }}
                                                    onMouseLeave={e => {
                                                        (e.currentTarget as HTMLElement).style.background = '';
                                                    }}
                                                >
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className="line-clamp-1 font-medium"
                                                            style={{ color: '#18181B' }}
                                                        >
                                                            {page.product_name}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.pillClass}`}
                                                        >
                                                            {cfg.icon}
                                                            {cfg.label}
                                                        </span>
                                                    </td>
                                                    <td
                                                        className="px-6 py-4 text-sm"
                                                        style={{ color: '#71717A' }}
                                                    >
                                                        {new Date(page.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={`/sales-pages/${page.id}`}
                                                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                                                                style={{
                                                                    background: '#EEF2FF',
                                                                    color: '#4338CA',
                                                                }}
                                                                onMouseEnter={e => {
                                                                    (e.currentTarget as HTMLElement).style.background = '#E0E7FF';
                                                                }}
                                                                onMouseLeave={e => {
                                                                    (e.currentTarget as HTMLElement).style.background = '#EEF2FF';
                                                                }}
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                                Preview
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(page.id, page.product_name)}
                                                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
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

                    {/* View All CTA */}
                    {pages.length > 0 && (
                        <div
                            className="animate-slide-up mt-6 flex justify-center"
                            style={{ animationDelay: '260ms' }}
                        >
                            <Link
                                href="/sales-pages"
                                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
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
                                <Layers className="h-4 w-4" />
                                View All Sales Pages
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function EmptyState() {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
            style={{
                background: '#FFFFFF',
                border: '2px dashed #E4E4E7',
            }}
        >
            <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: '#F4F4F5' }}
            >
                <FileText className="h-6 w-6" style={{ color: '#A1A1AA' }} />
            </div>
            <h3 className="text-sm font-semibold" style={{ color: '#3F3F46' }}>
                No sales pages yet
            </h3>
            <p className="mt-1.5 text-xs" style={{ color: '#A1A1AA' }}>
                Generate your first AI-powered sales page to get started.
            </p>
            <Link
                href="/sales-pages/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all"
                style={{
                    background: '#4F46E5',
                    boxShadow: '0 2px 8px rgba(79,70,229,0.25)',
                }}
            >
                <Sparkles className="h-4 w-4" />
                Get Started
            </Link>
        </div>
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