'use client';

import { Messages } from '@/lib/i18n';
import { Container } from '@/components/ui/Container';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    Cell,
    Tooltip,
} from 'recharts';

interface EvidenceProps {
    messages: Messages;
}

// ============ DATA ============

// Blood Pressure Data (15 min post-intake)
const bloodPressureData = [
    { name: 'SBP', before: 127, after: 111, change: -16, percent: -12.6 },
    { name: 'DBP', before: 84, after: 71, change: -13, percent: -15.4 },
];

// Hypertensive Participants (n=4)
const hypertensiveData = [
    { id: 1, sbpBefore: 145, sbpAfter: 124, dbpBefore: 95, dbpAfter: 80 },
    { id: 2, sbpBefore: 152, sbpAfter: 130, dbpBefore: 98, dbpAfter: 82 },
    { id: 3, sbpBefore: 148, sbpAfter: 128, dbpBefore: 92, dbpAfter: 78 },
    { id: 4, sbpBefore: 142, sbpAfter: 122, dbpBefore: 90, dbpAfter: 76 },
];

// Vascular Health Grade Distribution
const vascularGradeData = [
    { grade: 'A', before: 1, after: 4 },
    { grade: 'B', before: 3, after: 5 },
    { grade: 'C', before: 5, after: 2 },
    { grade: 'D', before: 3, after: 1 },
];

// Saliva Nitrite Timeline (qualitative levels 0-10)
const salivaNitriteData = [
    { time: '0', label: 'Baseline', level: 1 },
    { time: '15', label: '15 min', level: 9 },
    { time: '60', label: '60 min', level: 8 },
    { time: '120', label: '120 min', level: 5 },
    { time: '180', label: '180 min', level: 3 },
    { time: 'AM', label: 'Next AM', level: 2 },
];

// ============ COMPONENTS ============

function CardWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-neutral-200/60 p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                {title}
            </h3>
            {children}
        </div>
    );
}

// Card A: Blood Pressure
function BloodPressureCard() {
    return (
        <CardWrapper title="Blood Pressure (15 min)">
            <div className="space-y-6">
                {bloodPressureData.map((item) => (
                    <div key={item.name} className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-semibold text-neutral-700">{item.name}</span>
                            <span className="text-lg font-bold text-emerald-600">
                                {item.change} mmHg
                                <span className="text-xs text-neutral-400 ml-1">({item.percent}%)</span>
                            </span>
                        </div>
                        <div className="flex gap-2 items-center h-8">
                            <div
                                className="h-6 rounded bg-neutral-300 transition-all duration-700"
                                style={{ width: `${(item.before / 160) * 100}%` }}
                            />
                            <span className="text-xs text-neutral-400 w-8">{item.before}</span>
                        </div>
                        <div className="flex gap-2 items-center h-8">
                            <div
                                className="h-6 rounded bg-emerald-500 transition-all duration-700"
                                style={{ width: `${(item.after / 160) * 100}%` }}
                            />
                            <span className="text-xs text-emerald-600 font-medium w-8">{item.after}</span>
                        </div>
                    </div>
                ))}
                <div className="flex gap-4 pt-2 text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-neutral-300" /> Before
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-emerald-500" /> After
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
}

// Card B: Hypertensive Participants
function HypertensiveCard() {
    const avgSbpDrop = Math.round(
        hypertensiveData.reduce((acc, d) => acc + (d.sbpBefore - d.sbpAfter), 0) / hypertensiveData.length
    );
    const avgDbpDrop = Math.round(
        hypertensiveData.reduce((acc, d) => acc + (d.dbpBefore - d.dbpAfter), 0) / hypertensiveData.length
    );

    return (
        <CardWrapper title="Hypertensive Group (n=4)">
            <div className="space-y-4">
                <div className="grid grid-cols-5 gap-1 text-xs text-neutral-400 font-medium pb-2 border-b border-neutral-100">
                    <span>#</span>
                    <span>SBP↓</span>
                    <span>DBP↓</span>
                    <span className="col-span-2 text-right">Trend</span>
                </div>
                {hypertensiveData.map((p) => (
                    <div key={p.id} className="grid grid-cols-5 gap-1 items-center text-sm">
                        <span className="text-neutral-400">P{p.id}</span>
                        <span className="font-semibold text-emerald-600">−{p.sbpBefore - p.sbpAfter}</span>
                        <span className="font-semibold text-emerald-600">−{p.dbpBefore - p.dbpAfter}</span>
                        <div className="col-span-2 h-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={[
                                    { x: 0, y: p.sbpBefore },
                                    { x: 1, y: p.sbpAfter },
                                ]}>
                                    <Line
                                        type="linear"
                                        dataKey="y"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ fill: '#10b981', r: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
                <div className="pt-3 mt-2 border-t border-neutral-100 flex justify-between text-sm">
                    <span className="text-neutral-500">Average Drop</span>
                    <span className="font-bold text-emerald-600">SBP −{avgSbpDrop} / DBP −{avgDbpDrop}</span>
                </div>
            </div>
        </CardWrapper>
    );
}

// Card C: Vascular Health Grade
function VascularGradeCard() {
    const gradeColors: Record<string, string> = {
        A: '#10b981',
        B: '#34d399',
        C: '#fbbf24',
        D: '#f87171',
    };

    return (
        <CardWrapper title="Vascular Health Grade Shift">
            <div className="space-y-4">
                <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={vascularGradeData}
                            layout="vertical"
                            margin={{ left: 0, right: 0 }}
                        >
                            <XAxis type="number" hide domain={[0, 6]} />
                            <YAxis
                                type="category"
                                dataKey="grade"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#737373' }}
                                width={24}
                            />
                            <Tooltip
                                formatter={(value, name) => [value ?? 0, name === 'before' ? 'Before' : 'After']}
                                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                            />
                            <Bar dataKey="before" fill="#d1d5db" radius={[0, 4, 4, 0]} barSize={10} />
                            <Bar dataKey="after" radius={[0, 4, 4, 0]} barSize={10}>
                                {vascularGradeData.map((entry) => (
                                    <Cell key={entry.grade} fill={gradeColors[entry.grade]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-xs text-neutral-400 pt-2">
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-neutral-300" /> Before
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-emerald-500" /> After
                    </span>
                </div>
                <p className="text-xs text-neutral-500 text-center pt-2">
                    Grade A/B increased from 4 → 9 participants
                </p>
            </div>
        </CardWrapper>
    );
}

// Card D: Saliva Nitrite Timeline
function SalivaNitriteCard() {
    return (
        <CardWrapper title="Saliva Nitrite Time Course">
            <div className="space-y-4">
                <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salivaNitriteData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#a3a3a3' }}
                                interval={0}
                            />
                            <YAxis
                                hide
                                domain={[0, 10]}
                            />
                            <Tooltip
                                formatter={(value) => [`Level ${value ?? 0}`, 'Nitrite']}
                                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="level"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
                                activeDot={{ r: 6, fill: '#059669' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                    <div className="bg-emerald-50 rounded-lg py-2 px-1">
                        <span className="font-bold text-emerald-600">Peak</span>
                        <p className="text-neutral-500">15 min</p>
                    </div>
                    <div className="bg-neutral-50 rounded-lg py-2 px-1">
                        <span className="font-bold text-neutral-600">Sustained</span>
                        <p className="text-neutral-500">60–120 min</p>
                    </div>
                    <div className="bg-neutral-50 rounded-lg py-2 px-1">
                        <span className="font-bold text-neutral-600">Residual</span>
                        <p className="text-neutral-500">Next AM</p>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
}

// ============ MAIN COMPONENT ============

export function Evidence({ messages }: EvidenceProps) {
    return (
        <section
            id="evidence"
            className="py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white"
        >
            <Container>
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
                        {messages.evidence.title}
                    </h2>
                    <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                        {messages.evidence.subtitle}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    <BloodPressureCard />
                    <HypertensiveCard />
                    <VascularGradeCard />
                    <SalivaNitriteCard />
                </div>

                {/* Study Notes */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-neutral-400 tracking-wide">
                        Self-controlled study; pre vs 15 min post-intake; n=12 (age 30–61)
                    </p>
                </div>
            </Container>
        </section>
    );
}
