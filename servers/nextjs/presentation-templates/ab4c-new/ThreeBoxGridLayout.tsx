import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-three-box-grid';
export const layoutName = 'Three Box Grid';
export const layoutDescription = 'Three equal boxes with headings, descriptions, and bullets. Perfect for categorizations, types, or challenges.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Common Challenges').meta({ description: "Main title. Max 8 words" }),
    boxes: z.array(z.object({
        heading: z.string().min(3).max(80).meta({ description: "Box heading. Max 5 words" }),
        description: z.string().min(10).max(250).meta({ description: "Description. Max 15 words" }),
        bullets: z.array(z.string().min(5).max(200)).min(2).max(4).meta({ description: "Bullets. 2-4 items, max 10 words each" }),
    })).length(3).default([
        { heading: 'Documentation Errors', description: 'Incomplete or incorrect import documentation', bullets: ['Missing certificates', 'Inaccurate descriptions'] },
        { heading: 'Classification Issues', description: 'Incorrect tariff code assignments', bullets: ['Misclassified products', 'Outdated references'] },
        { heading: 'Compliance Gaps', description: 'Lack of regulatory awareness', bullets: ['Policy violations', 'Process deficiencies'] }
    ]).meta({ description: "Three boxes with headings, descriptions, and bullets" }),
});

export { Schema };
export type ThreeBoxGridLayoutData = z.infer<typeof Schema>;

const ThreeBoxGridLayout: React.FC<{ data?: Partial<ThreeBoxGridLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-8">{slideData?.title || 'Common Challenges'}</h1>

                    <div className="flex gap-6 flex-1">
                        {slideData?.boxes?.map((box, idx) => (
                            <div key={idx} className="flex-1 p-6 rounded-lg border-l-4" style={{ backgroundColor: ab4cColors.boxBackground, borderColor: ab4cColors.accent }}>
                                <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">{box.heading}</h3>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-4">{box.description}</p>
                                <ul className="space-y-2">
                                    {box.bullets.map((bullet, bidx) => (
                                        <li key={bidx} className="flex items-start">
                                            <span style={{ color: ab4cColors.accent }} className="mr-2">•</span>
                                            <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{bullet}</span>
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

export default ThreeBoxGridLayout;
