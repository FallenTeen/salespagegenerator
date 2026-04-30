import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import {
    Sparkles,
    Shield,
    Zap,
    Users,
    FileText,
    Wand2,
    Target,
    Palette,
    BarChart3,
    ArrowRight,
    ChevronRight,
} from 'lucide-react';

interface Team {
    id: number;
    slug: string;
    name: string;
}
interface Auth {
    user: { id: number; name: string; email: string } | null;
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

    const revealRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('.sp-reveal');
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        (e.target as HTMLElement).style.opacity = '1';
                        (e.target as HTMLElement).style.transform =
                            'translateY(0)';
                    }
                }),
            { threshold: 0.1 },
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const rv: React.CSSProperties = {
        opacity: 0,
        transform: 'translateY(20px)',
        transition:
            'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
    };

    return (
        <>
            <Head title="SalesPage Pro">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=fraunces:300,400,600,700,900i&family=dm-sans:300,400,500"
                    rel="stylesheet"
                />
                <style>{`
                    :root {
    --cream:#F5F0E8;
    --ink:#0E0C09;

    /* Primary Blue - Deep elegant blue */
    --ember:#1D4ED8;        /* deep blue primary */
    --emberL:#2563EB;       /* blue-600 bright */

    /* Accent Blue - Softer, lighter blue */
    --gold:#3B82F6;         /* blue-500 accent */
    --goldM:#0C4A8C;        /* dark blue alt */

    /* background tetap */
    --surf:#FAF7F2;
    --surf2:#EDE8DF;

    --border:rgba(0, 0, 0, 0.11);
    --muted:#6B6456;
}
                    *, *::before, *::after { box-sizing:border-box; }
                    body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); -webkit-font-smoothing:antialiased; }
                    .ff { font-family:'Fraunces',serif; }

                    @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
                    @keyframes slideR  { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
                    @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                    @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }

                    .au  { animation:fadeUp .8s cubic-bezier(.16,1,.3,1) both; }
                    .ar  { animation:slideR .9s cubic-bezier(.16,1,.3,1) both; }
                    .d1{animation-delay:.08s} .d2{animation-delay:.18s} .d3{animation-delay:.3s}
                    .d4{animation-delay:.42s} .d5{animation-delay:.56s}

                    .nav-a { font-size:14px; color:var(--muted); text-decoration:none; font-weight:400; transition:color .15s; }
                    .nav-a:hover { color:var(--ink); }

                    .btn-dark { display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:var(--cream);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 24px;border-radius:5px;text-decoration:none;letter-spacing:.01em;transition:all .2s;position:relative;overflow:hidden; }
                    .btn-dark::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);transform:translateX(-100%);transition:transform .4s; }
                    .btn-dark:hover::after { transform:translateX(100%); }
                    .btn-dark:hover { background:#1c1a15;box-shadow:0 8px 24px rgba(9, 13, 14, 0.22);transform:translateY(-1px); }

                    .btn-out { display:inline-flex;align-items:center;gap:6px;color:var(--ink);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 20px;border-radius:5px;border:1px solid var(--border);text-decoration:none;transition:all .2s; }
                    .btn-out:hover { border-color:var(--ember);background:rgba(29,78,216,.06); }

                    .btn-ember { display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--ember);color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 28px;border-radius:5px;text-decoration:none;transition:all .2s; }
                    .btn-ember:hover { background:var(--emberL);box-shadow:0 8px 24px rgba(29,78,216,.3);transform:translateY(-1px); }

                    .badge { display:inline-flex;align-items:center;gap:7px;background:var(--ink);color:var(--gold);font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px;font-weight:500; }
                    .badge .dot { width:6px;height:6px;border-radius:50%;background:var(--ember);animation:pulse 2s ease infinite; }

                    .eyebrow { display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ember);margin-bottom:14px; }
                    .eline { width:22px;height:1px;background:var(--ember);flex-shrink:0; }

                    .feat-card { background:rgba(255,255,255,.05);border:1px solid rgba(59,130,246,.12);border-radius:8px;padding:28px;position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s,border-color .25s; }
                    .feat-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--ember),var(--gold));transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.16,1,.3,1); }
                    .feat-card:hover { transform:translateY(-4px);box-shadow:0 16px 40px rgba(29,78,216,.2);border-color:rgba(59,130,246,.2); }
                    .feat-card:hover::before { transform:scaleX(1); }

                    .lcard { background:#fff;border:1px solid var(--border);border-radius:8px;padding:28px;transition:all .22s cubic-bezier(.16,1,.3,1); }
                    .lcard:hover { transform:translateY(-3px);box-shadow:0 10px 32px rgba(29,78,216,.12);border-color:rgba(59,130,246,.22); }

                    .tcard { background:#fff;border:1px solid var(--border);border-radius:8px;padding:22px;transition:all .2s cubic-bezier(.16,1,.3,1); }
                    .tcard:hover { border-color:var(--ember);box-shadow:0 8px 28px rgba(29,78,216,.12);transform:translateY(-2px); }
                    .tlink { display:inline-flex;align-items:center;gap:4px;font-size:13px;color:var(--ember);text-decoration:none;font-weight:500;margin-top:10px;transition:gap .15s; }
                    .tcard:hover .tlink { gap:8px; }

                    .ditem { display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--muted);padding:9px 0;border-bottom:1px solid var(--surf2); }
                    .ditem:last-child { border-bottom:none; }
                    .ditem::before { content:'→';color:var(--ember);font-size:13px;margin-top:1px;flex-shrink:0; }

                    .orn { display:flex;align-items:center;gap:16px;color:var(--goldM); }
                    .orn::before,.orn::after { content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--goldM),transparent); }

                    .cta-blk { background:var(--ink);border-radius:16px;padding:72px 48px;position:relative;overflow:hidden;text-align:center; }
                    .cta-blk::before { content:'';position:absolute;top:-40%;right:5%;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,.18) 0%,transparent 70%);pointer-events:none; }
                    .cta-blk::after  { content:'';position:absolute;bottom:-30%;left:-5%;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 70%);pointer-events:none; }

                    .mockup { background:#1a1814;border-radius:12px;padding:24px;box-shadow:0 28px 72px rgba(14,12,9,.38),0 0 0 1px rgba(255,255,255,.06);animation:float 6s ease-in-out infinite; }
                    .mdot { width:10px;height:10px;border-radius:50%; }
                    .mrow { display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:6px;margin-bottom:5px;background:#242018; }
                    .mtog { width:34px;height:19px;border-radius:100px;position:relative;flex-shrink:0; }
                    .mtog::after { content:'';position:absolute;top:3px;left:3px;width:13px;height:13px;border-radius:50%;background:#fff;transition:left .2s; }
                    .mon { background:var(--ember); } .mon::after { left:18px!important; }
                    .moff { background:#3a3830; }
                    .msw { width:26px;height:26px;border-radius:4px;border:1px solid rgba(255,255,255,.1);display:inline-block; }

                    .fi { width:100%;background:#fff;border:1px solid var(--border);border-radius:5px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--ink);outline:none;transition:border-color .2s,box-shadow .2s; }
                    .fi::placeholder { color:#b0a898; }
                    .fi:focus { border-color:var(--ember);box-shadow:0 0 0 3px rgba(29,78,216,.1); }

                    .fl { font-size:13px;color:var(--muted);text-decoration:none;transition:color .15s; }
                    .fl:hover { color:var(--ink); }

                    @media(max-width:768px) {
                        .hgrid { grid-template-columns:1fr!important; }
                        .hright { display:none!important; }
                        .cta-blk { padding:48px 24px; }
                    }
                `}</style>
            </Head>

            <div
                ref={revealRef}
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--cream)',
                }}
            >
                {/* NAV */}
                <header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 50,
                        background: 'rgba(245,240,232,.88)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                        borderBottom: '1px solid var(--border)',
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1240,
                            margin: '0 auto',
                            padding: '0 32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 62,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 9,
                            }}
                        >
                            <div
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 6,
                                    background: 'var(--ink)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <Sparkles
                                    style={{
                                        width: 14,
                                        height: 14,
                                        color: 'var(--gold)',
                                    }}
                                />
                            </div>
                            <span
                                className="ff"
                                style={{
                                    fontSize: 17,
                                    fontWeight: 600,
                                    letterSpacing: '-.02em',
                                }}
                            >
                                SalesPage
                                <span style={{ color: 'var(--ember)' }}>
                                    Pro
                                </span>
                            </span>
                        </div>
                        <nav style={{ display: 'flex', gap: 28 }}>
                            <a href="#features" className="nav-a">
                                Features
                            </a>
                            <a href="#templates" className="nav-a">
                                Templates
                            </a>
                            <a href="#docs" className="nav-a">
                                Docs
                            </a>
                        </nav>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            {auth.user ? (
                                <Link
                                    href={dashboardHref}
                                    className="btn-dark"
                                    style={{
                                        padding: '8px 18px',
                                        fontSize: 13,
                                    }}
                                >
                                    <Zap style={{ width: 13, height: 13 }} />{' '}
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="nav-a">
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href="/register"
                                            className="btn-dark"
                                            style={{
                                                padding: '8px 18px',
                                                fontSize: 13,
                                            }}
                                        >
                                            Get started{' '}
                                            <ArrowRight
                                                style={{
                                                    width: 13,
                                                    height: 13,
                                                }}
                                            />
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1 }}>
                    {/* HERO */}
                    <section
                        style={{
                            maxWidth: 1240,
                            margin: '0 auto',
                            padding: '72px 32px 56px',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 64,
                            alignItems: 'center',
                        }}
                        className="hgrid"
                    >
                        <div>
                            <div
                                className="badge au d1"
                                style={{ marginBottom: 22 }}
                            >
                                <span className="dot" /> AI-Powered Sales Pages
                            </div>
                            <h1
                                className="ff au d2"
                                style={{
                                    fontSize: 'clamp(38px,5vw,62px)',
                                    fontWeight: 700,
                                    lineHeight: 1.06,
                                    letterSpacing: '-.03em',
                                    marginBottom: 18,
                                }}
                            >
                                Create Sales Pages
                                <br />
                                <em
                                    style={{
                                        fontStyle: 'italic',
                                        fontWeight: 300,
                                        background:
                                            'linear-gradient(120deg,var(--ember),var(--gold))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    that convert.
                                </em>
                            </h1>
                            <p
                                className="au d3"
                                style={{
                                    fontSize: 16,
                                    lineHeight: 1.8,
                                    color: 'var(--muted)',
                                    maxWidth: 390,
                                    marginBottom: 32,
                                }}
                            >
                                Transform your ideas into high-converting sales
                                pages with our AI-powered generator. No coding
                                required — launch in minutes.
                            </p>
                            <div
                                className="au d4"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 40,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Link
                                    href={
                                        auth.user
                                            ? dashboardHref
                                            : '/sales-pages/create'
                                    }
                                    className="btn-dark"
                                >
                                    <Sparkles
                                        style={{ width: 14, height: 14 }}
                                    />
                                    {auth.user
                                        ? 'Go to Dashboard'
                                        : 'Start Creating Free'}
                                </Link>
                                <Link href="#features" className="btn-out">
                                    See how it works{' '}
                                    <ChevronRight
                                        style={{ width: 13, height: 13 }}
                                    />
                                </Link>
                            </div>
                            <div
                                className="au d5"
                                style={{
                                    display: 'flex',
                                    gap: 32,
                                    paddingTop: 24,
                                    borderTop: '1px solid var(--border)',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {[
                                    ['12k+', 'Pages created'],
                                    ['94%', 'Conversion lift'],
                                    ['3 min', 'Avg build time'],
                                ].map(([n, l]) => (
                                    <div key={l}>
                                        <div
                                            className="ff"
                                            style={{
                                                fontSize: 32,
                                                fontWeight: 700,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {n}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 11,
                                                color: 'var(--muted)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '.08em',
                                                marginTop: 4,
                                            }}
                                        >
                                            {l}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mockup panel */}
                        <div
                            className="hright ar d3"
                            style={{ position: 'relative' }}
                        >
                            {/* glow kanan */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-10%',
                                    right: '-8%',
                                    width: 280,
                                    height: 280,
                                    borderRadius: '50%',
                                    background:
                                        'radial-gradient(circle, rgba(29,78,216,.2) 0%, transparent 70%)',
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* glow kiri */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '5%',
                                    left: '-6%',
                                    width: 180,
                                    height: 180,
                                    borderRadius: '50%',
                                    background:
                                        'radial-gradient(circle, rgba(59,130,246,.16) 0%, transparent 70%)',
                                    pointerEvents: 'none',
                                }}
                            />

                            <div
                                className="mockup"
                                style={{ position: 'relative', zIndex: 1 }}
                            >
                                {/* top bar */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        marginBottom: 16,
                                    }}
                                >
                                    <span
                                        className="mdot"
                                        style={{ background: '#ef4444' }}
                                    />
                                    <span
                                        className="mdot"
                                        style={{ background: '#f59e0b' }}
                                    />
                                    <span
                                        className="mdot"
                                        style={{ background: '#22c55e' }}
                                    />

                                    <span
                                        style={{
                                            flex: 1,
                                            height: 20,
                                            background: '#1e293b', // slate
                                            borderRadius: 4,
                                            marginLeft: 8,
                                        }}
                                    />
                                </div>

                                <div
                                    style={{
                                        fontSize: 10,
                                        color: '#64748b', // muted slate
                                        letterSpacing: '.1em',
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                    }}
                                >
                                    Page Features
                                </div>

                                {[
                                    {
                                        label: 'AI Copywriting',
                                        color: 'var(--ember)',
                                        on: true,
                                    },
                                    {
                                        label: 'Auto A/B Test',
                                        color: '#3b82f6',
                                        on: true,
                                    },
                                    {
                                        label: 'SEO Optimizer',
                                        color: '#22c55e',
                                        on: true,
                                    },
                                    {
                                        label: 'Analytics',
                                        color: '#6366f1',
                                        on: false,
                                    },
                                ].map((r) => (
                                    <div key={r.label} className="mrow">
                                        <span
                                            style={{
                                                fontSize: 13,
                                                color: '#cbd5f5', // light slate-blue
                                            }}
                                        >
                                            {r.label}
                                        </span>
                                        <div
                                            className={`mtog ${r.on ? 'mon' : 'moff'}`}
                                            style={
                                                r.on
                                                    ? { background: r.color }
                                                    : {}
                                            }
                                        />
                                    </div>
                                ))}

                                {/* theme box */}
                                <div
                                    style={{
                                        background: '#1e293b',
                                        borderRadius: 8,
                                        padding: '10px 12px',
                                        marginTop: 12,
                                        border: '1px solid rgba(255,255,255,.05)',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 10,
                                            color: '#64748b',
                                            letterSpacing: '.08em',
                                            textTransform: 'uppercase',
                                            marginBottom: 7,
                                        }}
                                    >
                                        Theme
                                    </div>

                                    <div style={{ display: 'flex', gap: 5 }}>
                                        {[
                                            '#2563EB',
                                            '#3B82F6',
                                            '#1e293b',
                                            '#F8FAFC',
                                            '#22c55e',
                                            '#6366f1',
                                        ].map((c) => (
                                            <span
                                                key={c}
                                                className="msw"
                                                style={{ background: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* stats */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 8,
                                        marginTop: 8,
                                    }}
                                >
                                    {[
                                        ['Conversion', '8.4%'],
                                        ['Avg session', '4m 12s'],
                                    ].map(([lbl, val]) => (
                                        <div
                                            key={lbl}
                                            style={{
                                                background: '#1e293b',
                                                borderRadius: 7,
                                                padding: '10px 12px',
                                                border: '1px solid rgba(255,255,255,.05)',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 10,
                                                    color: '#64748b',
                                                    marginBottom: 3,
                                                }}
                                            >
                                                {lbl}
                                            </div>

                                            <div
                                                className="ff"
                                                style={{
                                                    fontSize: 19,
                                                    fontWeight: 600,
                                                    color: '#f1f5f9',
                                                }}
                                            >
                                                {val}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 10,
                                                    color: '#22c55e',
                                                    marginTop: 2,
                                                }}
                                            >
                                                ↑ +12% this week
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ORNAMENT */}
                    <div
                        style={{
                            maxWidth: 1240,
                            margin: '0 auto',
                            padding: '0 32px 56px',
                        }}
                    >
                        <div className="orn">✦</div>
                    </div>

                    {/* AI PROMPT — logged in only */}
                    {auth.user && (
                        <section
                            style={{
                                maxWidth: 1240,
                                margin: '0 auto',
                                padding: '0 32px 72px',
                            }}
                        >
                            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 36,
                                    }}
                                >
                                    <div
                                        className="eyebrow"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        <span className="eline" /> AI Generator{' '}
                                        <span className="eline" />
                                    </div>
                                    <h2
                                        className="ff sp-reveal"
                                        style={{
                                            ...rv,
                                            fontSize: 'clamp(26px,3.5vw,42px)',
                                            fontWeight: 700,
                                            letterSpacing: '-.03em',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Your AI Prompt Studio
                                    </h2>
                                    <p
                                        style={{
                                            color: 'var(--muted)',
                                            lineHeight: 1.75,
                                            fontSize: 15,
                                        }}
                                    >
                                        Describe your product and let AI craft
                                        compelling copy for your audience.
                                    </p>
                                </div>
                                <div
                                    className="lcard sp-reveal"
                                    style={{ ...rv }}
                                >
                                    <div style={{ display: 'grid', gap: 16 }}>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    display: 'block',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                Product or Service Name
                                            </label>
                                            <input
                                                type="text"
                                                className="fi"
                                                placeholder="e.g. — SalesPage Pro"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    display: 'block',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                Target Audience
                                            </label>
                                            <textarea
                                                className="fi"
                                                rows={3}
                                                placeholder="Describe your ideal customer..."
                                                style={{ resize: 'vertical' }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    display: 'block',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                Key Benefits
                                            </label>
                                            <textarea
                                                className="fi"
                                                rows={3}
                                                placeholder="List the main benefits..."
                                                style={{ resize: 'vertical' }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    display: 'block',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                Tone of Voice
                                            </label>
                                            <select className="fi">
                                                {[
                                                    'Professional',
                                                    'Friendly',
                                                    'Urgent',
                                                    'Luxury',
                                                    'Casual',
                                                ].map((t) => (
                                                    <option
                                                        key={t}
                                                        value={t.toLowerCase()}
                                                    >
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Link
                                            href="/sales-pages/create"
                                            className="btn-ember"
                                        >
                                            <Wand2
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                }}
                                            />{' '}
                                            Generate Sales Page
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Quick templates */}
                            <div id="templates" style={{ marginTop: 56 }}>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 28,
                                    }}
                                >
                                    <div
                                        className="eyebrow"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        <span className="eline" /> Quick Start{' '}
                                        <span className="eline" />
                                    </div>
                                    <h3
                                        className="ff sp-reveal"
                                        style={{
                                            ...rv,
                                            fontSize: 'clamp(20px,3vw,32px)',
                                            fontWeight: 600,
                                            letterSpacing: '-.02em',
                                        }}
                                    >
                                        Prompt Templates
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            'repeat(auto-fit,minmax(230px,1fr))',
                                        gap: 12,
                                    }}
                                >
                                    {[
                                        {
                                            Icon: Target,
                                            title: 'Product Launch',
                                            desc: 'Create excitement with urgency and social proof for a new launch.',
                                        },
                                        {
                                            Icon: Shield,
                                            title: 'Trust Builder',
                                            desc: 'Build credibility with testimonials, guarantees, and authority.',
                                        },
                                        {
                                            Icon: Users,
                                            title: 'Community Focus',
                                            desc: 'Connect through shared values and a sense of belonging.',
                                        },
                                        {
                                            Icon: Palette,
                                            title: 'Educational',
                                            desc: 'Teach your audience and position your product as the solution.',
                                        },
                                    ].map(({ Icon, title, desc }) => (
                                        <div
                                            key={title}
                                            className="tcard sp-reveal"
                                            style={{ ...rv }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 9,
                                                    marginBottom: 8,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 28,
                                                        height: 28,
                                                        borderRadius: 5,
                                                        background:
                                                            'rgba(212,64,10,.08)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <Icon
                                                        style={{
                                                            width: 14,
                                                            height: 14,
                                                            color: 'var(--ember)',
                                                        }}
                                                    />
                                                </div>
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {title}
                                                </span>
                                            </div>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: 'var(--muted)',
                                                    lineHeight: 1.65,
                                                }}
                                            >
                                                {desc}
                                            </p>
                                            <Link
                                                href="/sales-pages/create"
                                                className="tlink"
                                            >
                                                Use Template{' '}
                                                <ArrowRight
                                                    style={{
                                                        width: 12,
                                                        height: 12,
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* FEATURES — dark */}
                    <section
                        id="features"
                        style={{
                            background: 'var(--ink)',
                            padding: '72px 0',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '8%',
                                width: 440,
                                height: 440,
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(circle,rgba(29,78,216,.14) 0%,transparent 70%)',
                                pointerEvents: 'none',
                            }}
                        />
                        <div
                            style={{
                                maxWidth: 1240,
                                margin: '0 auto',
                                padding: '0 32px',
                            }}
                        >
                            <div style={{ marginBottom: 44 }}>
                                <div
                                    className="eyebrow"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    <span
                                        className="eline"
                                        style={{ background: 'var(--gold)' }}
                                    />{' '}
                                    Platform
                                </div>
                                <h2
                                    className="ff sp-reveal"
                                    style={{
                                        ...rv,
                                        fontSize: 'clamp(26px,4vw,48px)',
                                        fontWeight: 700,
                                        letterSpacing: '-.03em',
                                        color: 'var(--cream)',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Everything you need
                                    <br />
                                    <em
                                        style={{
                                            fontStyle: 'italic',
                                            fontWeight: 300,
                                            color: 'var(--gold)',
                                        }}
                                    >
                                        to sell more.
                                    </em>
                                </h2>
                            </div>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit,minmax(250px,1fr))',
                                    gap: 12,
                                }}
                            >
                                {[
                                    {
                                        Icon: Zap,
                                        title: 'AI-Powered Generation',
                                        desc: 'Generate compelling copy and layouts using AI trained on thousands of high-converting pages.',
                                    },
                                    {
                                        Icon: Shield,
                                        title: 'Conversion Optimized',
                                        desc: 'Every template is engineered with proven psychology and design principles to maximize results.',
                                    },
                                    {
                                        Icon: Palette,
                                        title: 'Professional Templates',
                                        desc: 'Choose from expertly crafted templates for specific industries and use cases.',
                                    },
                                    {
                                        Icon: Users,
                                        title: 'Team Collaboration',
                                        desc: 'Share, review, and publish pages seamlessly across your entire team.',
                                    },
                                    {
                                        Icon: BarChart3,
                                        title: 'Built-in Analytics',
                                        desc: 'Real-time metrics, heatmaps, and A/B testing built right in — no third-party tools needed.',
                                    },
                                    {
                                        Icon: Target,
                                        title: 'Custom Domains',
                                        desc: 'Publish to your own domain in one click. Full SEO and white-label support.',
                                    },
                                ].map(({ Icon, title, desc }) => (
                                    <div
                                        key={title}
                                        className="feat-card sp-reveal"
                                        style={{ ...rv }}
                                    >
                                        <div
                                            style={{
                                                width: 38,
                                                height: 38,
                                                borderRadius: 7,
                                                background:
                                                    'rgba(29,78,216,.12)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: 16,
                                            }}
                                        >
                                            <Icon
                                                style={{
                                                    width: 16,
                                                    height: 16,
                                                    color: 'var(--emberL)',
                                                }}
                                            />
                                        </div>
                                        <h3
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 15,
                                                color: 'var(--cream)',
                                                marginBottom: 7,
                                            }}
                                        >
                                            {title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: 'rgba(245,240,232,.52)',
                                                lineHeight: 1.72,
                                            }}
                                        >
                                            {desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* DOCS */}
                    <section
                        id="docs"
                        style={{
                            maxWidth: 1240,
                            margin: '0 auto',
                            padding: '72px 32px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                marginBottom: 36,
                                flexWrap: 'wrap',
                                gap: 12,
                            }}
                        >
                            <div>
                                <div className="eyebrow">
                                    <span className="eline" /> Documentation
                                </div>
                                <h2
                                    className="ff sp-reveal"
                                    style={{
                                        ...rv,
                                        fontSize: 'clamp(24px,3.5vw,40px)',
                                        fontWeight: 700,
                                        letterSpacing: '-.03em',
                                    }}
                                >
                                    Get up and running.
                                </h2>
                            </div>
                            <a
                                href="/docs"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    fontSize: 14,
                                    color: 'var(--ember)',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                }}
                            >
                                Full docs{' '}
                                <ArrowRight style={{ width: 13, height: 13 }} />
                            </a>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit,minmax(280px,1fr))',
                                gap: 14,
                            }}
                        >
                            {[
                                {
                                    Icon: FileText,
                                    title: 'Getting Started',
                                    desc: 'Learn how to create your first page and understand the core concepts.',
                                    items: [
                                        'Set up your account and workspace',
                                        'Choose a template for your niche',
                                        'Customize content and design',
                                        'Publish to a custom domain',
                                    ],
                                },
                                {
                                    Icon: BarChart3,
                                    title: 'Advanced Features',
                                    desc: 'Master advanced tools to amplify your pages and skyrocket conversions.',
                                    items: [
                                        'A/B testing and analytics',
                                        'Custom domains and full branding',
                                        'SEO optimization and meta control',
                                        'Webhook and API integrations',
                                    ],
                                },
                            ].map(({ Icon, title, desc, items }) => (
                                <div
                                    key={title}
                                    className="lcard sp-reveal"
                                    style={{ ...rv }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 9,
                                            marginBottom: 14,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 6,
                                                background:
                                                    'rgba(29,78,216,.08)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Icon
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    color: 'var(--ember)',
                                                }}
                                            />
                                        </div>
                                        <h3
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 15,
                                            }}
                                        >
                                            {title}
                                        </h3>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: 'var(--muted)',
                                            lineHeight: 1.65,
                                            marginBottom: 14,
                                        }}
                                    >
                                        {desc}
                                    </p>
                                    {items.map((item) => (
                                        <div key={item} className="ditem">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FINAL CTA */}
                    <div
                        style={{
                            maxWidth: 1240,
                            margin: '0 auto',
                            padding: '0 32px 72px',
                        }}
                    >
                        <div className="cta-blk sp-reveal" style={{ ...rv }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        background: 'rgba(29,78,216,.12)',
                                        color: 'var(--emberL)',
                                        fontSize: 11,
                                        letterSpacing: '.1em',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        padding: '5px 14px',
                                        borderRadius: 100,
                                        marginBottom: 22,
                                        border: '1px solid rgba(29,78,216,.3)',
                                    }}
                                >
                                    <Sparkles
                                        style={{ width: 10, height: 10 }}
                                    />{' '}
                                    Join 12,000+ marketers
                                </span>
                                <h2
                                    className="ff"
                                    style={{
                                        fontSize: 'clamp(30px,5vw,58px)',
                                        fontWeight: 700,
                                        letterSpacing: '-.03em',
                                        color: 'var(--cream)',
                                        lineHeight: 1.06,
                                        marginBottom: 16,
                                    }}
                                >
                                    Ready to build pages
                                    <br />
                                    <em
                                        style={{
                                            fontStyle: 'italic',
                                            fontWeight: 300,
                                            color: 'var(--gold)',
                                        }}
                                    >
                                        that actually sell?
                                    </em>
                                </h2>
                                <p
                                    style={{
                                        color: 'rgba(245,240,232,.58)',
                                        fontSize: 15,
                                        lineHeight: 1.72,
                                        maxWidth: 380,
                                        margin: '0 auto 32px',
                                    }}
                                >
                                    Join thousands of businesses already using
                                    SalesPage Pro to boost their conversions.
                                </p>
                                <Link
                                    href={
                                        auth.user
                                            ? dashboardHref
                                            : '/sales-pages/create'
                                    }
                                    className="btn-ember"
                                    style={{
                                        fontSize: 15,
                                        padding: '14px 36px',
                                    }}
                                >
                                    <Sparkles
                                        style={{ width: 15, height: 15 }}
                                    />
                                    {auth.user
                                        ? 'Go to Dashboard'
                                        : 'Get Started — Free'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                {/* FOOTER */}
                <footer
                    style={{
                        maxWidth: 1240,
                        margin: '0 auto',
                        padding: '0 32px 36px',
                    }}
                >
                    <div
                        style={{
                            height: 1,
                            background:
                                'linear-gradient(90deg,transparent,var(--border),transparent)',
                            marginBottom: 24,
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 5,
                                    background: 'var(--ink)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Sparkles
                                    style={{
                                        width: 11,
                                        height: 11,
                                        color: 'var(--gold)',
                                    }}
                                />
                            </div>
                            <span
                                className="ff"
                                style={{ fontSize: 14, fontWeight: 600 }}
                            >
                                SalesPage
                                <span style={{ color: 'var(--ember)' }}>
                                    Pro
                                </span>
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: 20 }}>
                            {['Privacy', 'Terms', 'Contact'].map((l) => (
                                <a key={l} href="#" className="fl">
                                    {l}
                                </a>
                            ))}
                        </div>
                        <p style={{ fontSize: 12, color: '#aaa49a' }}>
                            © {new Date().getFullYear()} SalesPage Pro. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
