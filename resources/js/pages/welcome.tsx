import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Sparkles,
    Shield,
    Zap,
    Users,
    FileText,
    Wand2,
    Target,
    Palette,
    BarChart3,
} from 'lucide-react';
import { route } from 'ziggy-js';

interface Team {
    id: number;
    slug: string;
    name: string;
}

interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface PageProps {
    auth: Auth;
    currentTeam?: Team;
    canRegister?: boolean;
    [key: string]: unknown;
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth, currentTeam } = usePage<PageProps>().props;

    const dashboardHref =
        auth.user && currentTeam
            ? `/${currentTeam.slug}/dashboard`
            : '/register';

    return (
        <>
            <Head title="SalesPage Pro">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <header className="w-full border-b border-[#e3e3e0] dark:border-[#3E3E3A]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-[#f53003] dark:text-[#FF4433]" />
                            <span className="text-xl font-semibold">
                                SalesPage Pro
                            </span>
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={dashboardHref}
                                        className="inline-flex items-center rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        <Zap className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC]"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="flex-1">
                    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                                Create Stunning
                                <span className="text-[#f53003] dark:text-[#FF4433]">
                                    {' '}
                                    Sales Pages
                                </span>
                                <br />
                                in Minutes
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-[#706f6c] dark:text-[#A1A09A]">
                                Transform your ideas into high-converting sales
                                pages with our AI-powered generator. No coding
                                skills required.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={auth.user ? dashboardHref : '/sales-pages/create'}
                                    className="inline-flex items-center rounded-sm bg-[#1b1b18] px-6 py-2.5 text-sm font-semibold text-white"
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {auth.user
                                        ? 'Go to Dashboard'
                                        : 'Start Creating'}
                                </Link>
                                <Link
                                    href="#features"
                                    className="text-sm leading-6 font-semibold text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC]"
                                >
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {auth.user && (
                        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <div className="mb-6 flex items-center justify-center gap-3">
                                    <Wand2 className="h-8 w-8 text-[#f53003] dark:text-[#FF4433]" />
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                        AI Prompt Generator
                                    </h2>
                                </div>
                                <p className="text-lg leading-8 text-[#706f6c] dark:text-[#A1A09A]">
                                    Generate compelling sales page content with
                                    our AI-powered prompt system
                                </p>
                            </div>

                            <div className="mx-auto mt-12 max-w-3xl">
                                <div className="rounded-lg bg-white p-8 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="product-name"
                                                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
                                            >
                                                Product or Service Name
                                            </label>
                                            <input
                                                type="text"
                                                id="product-name"
                                                className="mt-2 block w-full rounded-sm border border-[#e3e3e0] bg-[#FDFDFC] px-3 py-2 text-sm placeholder-[#706f6c] focus:border-[#f53003] focus:ring-1 focus:ring-[#f53003] focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                                                placeholder="Enter your product or service name"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="target-audience"
                                                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
                                            >
                                                Target Audience
                                            </label>
                                            <textarea
                                                id="target-audience"
                                                rows={3}
                                                className="mt-2 block w-full rounded-sm border border-[#e3e3e0] bg-[#FDFDFC] px-3 py-2 text-sm placeholder-[#706f6c] focus:border-[#f53003] focus:ring-1 focus:ring-[#f53003] focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                                                placeholder="Describe your ideal customer"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="key-benefits"
                                                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
                                            >
                                                Key Benefits
                                            </label>
                                            <textarea
                                                id="key-benefits"
                                                rows={3}
                                                className="mt-2 block w-full rounded-sm border border-[#e3e3e0] bg-[#FDFDFC] px-3 py-2 text-sm placeholder-[#706f6c] focus:border-[#f53003] focus:ring-1 focus:ring-[#f53003] focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                                                placeholder="List the main benefits of your product"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="tone"
                                                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
                                            >
                                                Tone of Voice
                                            </label>
                                            <select
                                                id="tone"
                                                className="mt-2 block w-full rounded-sm border border-[#e3e3e0] bg-[#FDFDFC] px-3 py-2 text-sm focus:border-[#f53003] focus:ring-1 focus:ring-[#f53003] focus:outline-none dark:border-[#3E3E3A] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                                            >
                                                <option value="professional">
                                                    Professional
                                                </option>
                                                <option value="friendly">
                                                    Friendly
                                                </option>
                                                <option value="urgent">
                                                    Urgent
                                                </option>
                                                <option value="luxury">
                                                    Luxury
                                                </option>
                                                <option value="casual">
                                                    Casual
                                                </option>
                                            </select>
                                        </div>

                                        <div className="flex justify-center pt-4">
                                            <Link
                                                href="/sales-pages/create"
                                                className="inline-flex items-center rounded-sm bg-[#1b1b18] px-6 py-2.5 text-sm font-semibold text-white hover:bg-black dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                                            >
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                Generate Sales Page
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto mt-12 max-w-3xl">
                                <h3 className="mb-8 text-center text-2xl font-bold">
                                    Quick Prompt Templates
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                        <div className="mb-3 flex items-center gap-3">
                                            <Target className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                            <h4 className="font-semibold">
                                                Product Launch
                                            </h4>
                                        </div>
                                        <p className="mb-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Create excitement for your new
                                            product with urgency and social
                                            proof
                                        </p>
                                        <Link
                                            href="/sales-pages/create"
                                            className="text-sm text-[#f53003] hover:underline dark:text-[#FF4433]"
                                        >
                                            Use Template →
                                        </Link>
                                    </div>
                                    <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                        <div className="mb-3 flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                            <h4 className="font-semibold">
                                                Trust Builder
                                            </h4>
                                        </div>
                                        <p className="mb-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Build credibility with testimonials,
                                            guarantees, and authority
                                        </p>
                                        <Link
                                            href="/sales-pages/create"
                                            className="text-sm text-[#f53003] hover:underline dark:text-[#FF4433]"
                                        >
                                            Use Template →
                                        </Link>
                                    </div>
                                    <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                        <div className="mb-3 flex items-center gap-3">
                                            <Users className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                            <h4 className="font-semibold">
                                                Community Focus
                                            </h4>
                                        </div>
                                        <p className="mb-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Connect with your audience through
                                            shared values and belonging
                                        </p>
                                        <Link
                                            href="/sales-pages/create"
                                            className="text-sm text-[#f53003] hover:underline dark:text-[#FF4433]"
                                        >
                                            Use Template →
                                        </Link>
                                    </div>
                                    <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                        <div className="mb-3 flex items-center gap-3">
                                            <Palette className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                            <h4 className="font-semibold">
                                                Educational
                                            </h4>
                                        </div>
                                        <p className="mb-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                            Teach your audience while
                                            positioning your product as the
                                            solution
                                        </p>
                                        <Link
                                            href="/sales-pages/create"
                                            className="text-sm text-[#f53003] hover:underline dark:text-[#FF4433]"
                                        >
                                            Use Template →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    <section
                        id="features"
                        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
                    >
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base leading-7 font-semibold text-[#f53003] dark:text-[#FF4433]">
                                Powerful Features
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                Everything you need to create amazing sales
                                pages
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff2f2] dark:bg-[#1D0002]">
                                        <Zap className="h-6 w-6 text-[#f53003] dark:text-[#FF4433]" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        AI-Powered Generation
                                    </h3>
                                    <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Generate compelling sales copy and
                                        layouts using advanced AI technology
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff2f2] dark:bg-[#1D0002]">
                                        <Shield className="h-6 w-6 text-[#f53003] dark:text-[#FF4433]" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        Professional Templates
                                    </h3>
                                    <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Choose from expertly designed templates
                                        optimized for conversions
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff2f2] dark:bg-[#1D0002]">
                                        <Users className="h-6 w-6 text-[#f53003] dark:text-[#FF4433]" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        Team Collaboration
                                    </h3>
                                    <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Work together with your team to create
                                        and manage sales pages
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="mb-8 flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-[#f53003] dark:text-[#FF4433]" />
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Documentation
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="mb-4 flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                        <h3 className="text-lg font-semibold">
                                            Getting Started
                                        </h3>
                                    </div>
                                    <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Learn how to create your first sales
                                        page and understand the basic features.
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                            <span>
                                                Create an account and set up
                                                your workspace
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                            <span>
                                                Choose a template that fits your
                                                needs
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                            <span>
                                                Customize your content and
                                                design
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                    <div className="mb-4 flex items-center gap-3">
                                        <BarChart3 className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                        <h3 className="text-lg font-semibold">
                                            Advanced Features
                                        </h3>
                                    </div>
                                    <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        Explore advanced features to enhance
                                        your sales pages and boost conversions.
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                            <span>
                                                A/B testing and analytics
                                                integration
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                            <span>
                                                Custom domains and branding
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                            <span>SEO optimization tools</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Ready to create amazing sales pages?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#706f6c] dark:text-[#A1A09A]">
                                Join thousands of businesses already using
                                SalesPage Pro to boost their conversions.
                            </p>
                            <div className="mt-10">
                                <Link
                                    href={auth.user ? dashboardHref : '/sales-pages/create'}
                                    className="inline-flex items-center rounded-sm bg-[#1b1b18] px-6 py-2.5 text-sm font-semibold text-white hover:bg-black dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {auth.user
                                        ? 'Go to Dashboard'
                                        : 'Get Started Now'}
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="border-t border-[#e3e3e0] pt-8 dark:border-[#3E3E3A]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-[#f53003] dark:text-[#FF4433]" />
                                <span className="text-sm font-medium">
                                    SalesPage Pro
                                </span>
                            </div>
                            <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                © 2024 SalesPage Pro. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
