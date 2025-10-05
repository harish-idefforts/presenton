import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-icon-three-column';
export const layoutName = 'Icon Three Column';
export const layoutDescription = 'Three columns with icon badges, headings, descriptions, and bullet points. Ideal for tools, verification methods, or frameworks.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Verification Methods').meta({ description: "Main title. Max 8 words" }),
    introduction: z.string().max(400).optional().meta({ description: "Optional intro. Max 20 words" }),
    columns: z.array(z.object({
        icon: z.enum(['checklist', 'audit', 'search', 'database', 'ai', 'star', 'shield', 'globe', 'users', 'settings']).meta({ description: "Icon type" }),
        heading: z.string().min(3).max(80).meta({ description: "Column heading. Max 5 words" }),
        description: z.string().min(10).max(250).meta({ description: "Description. Max 15 words" }),
        bullets: z.array(z.string().min(5).max(200)).min(2).max(4).meta({ description: "Bullets. 2-4 items, max 10 words each" }),
    })).length(3).default([
        { icon: 'checklist', heading: 'Documentation Review', description: 'Systematic verification of all compliance documents', bullets: ['Invoice accuracy', 'Certificate validity'] },
        { icon: 'audit', heading: 'Internal Audits', description: 'Regular compliance process assessments', bullets: ['Process evaluation', 'Gap identification'] },
        { icon: 'database', heading: 'Database Checks', description: 'Cross-reference with regulatory databases', bullets: ['Classification verification', 'Restriction checks'] }
    ]).meta({ description: "Three columns with icons, headings, descriptions, and bullets" }),
});

export { Schema };
export type IconBasedThreeColumnLayoutData = z.infer<typeof Schema>;

const IconBasedThreeColumnLayout: React.FC<{ data?: Partial<IconBasedThreeColumnLayoutData> }> = ({ data: slideData }) => {
    const iconMap: Record<string, string> = {
        checklist: '✓', audit: '📋', search: '🔍', database: '💾', ai: '🤖', star: '⭐', shield: '🛡', globe: '🌐', users: '👥', settings: '⚙'
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-3">{slideData?.title || 'Verification Methods'}</h1>
                    {slideData?.introduction && <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData.introduction}</p>}

                    <div className="flex gap-6 flex-1">
                        {slideData?.columns?.map((col, idx) => (
                            <div key={idx} className="flex-1 flex flex-col">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto" style={{ backgroundColor: ab4cColors.accent, color: 'white' }}>
                                    {iconMap[col.icon] || '•'}
                                </div>
                                <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2 text-center">{col.heading}</h3>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-3 text-center">{col.description}</p>
                                <ul className="space-y-1">
                                    {col.bullets.map((bullet, bidx) => (
                                        <li key={bidx} className="flex items-start">
                                            <span style={{ color: ab4cColors.accent }} className="mr-2">•</span>
                                            <span style={{ color: ab4cColors.secondaryText }} className="text-xs">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8" style={{ background: ab4cColors.background }}>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img src="/ab4c-new-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
                </div>
            </div>
        </>
    );
};

export default IconBasedThreeColumnLayout;
