import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-three-column-summary';
export const layoutName = 'Three Column Summary';
export const layoutDescription = 'Summary slide with description, three columns of bullet points, and optional quote or contact information.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Summary and Next Steps').meta({ description: "Main title. Max 8 words" }),
    description: z.string().min(20).max(600).default('Key takeaways and action items from this training session.').meta({ description: "Description. Max 30 words" }),
    columns: z.array(z.object({
        heading: z.string().min(3).max(80).meta({ description: "Column heading. Max 5 words" }),
        bullets: z.array(z.string().min(10).max(100)).min(2).max(4).meta({ description: "Bullets. 2-4 items, max 12 words each" }),
    })).length(3).default([
        { heading: 'Key Learnings', bullets: ['Understanding regulatory frameworks', 'Classification methodologies'] },
        { heading: 'Action Items', bullets: ['Review company procedures', 'Complete practice exercises'] },
        { heading: 'Resources', bullets: ['Reference guides available', 'Support team contact details'] }
    ]).meta({ description: "Three columns with headings and bullets" }),
    quote: z.string().max(400).optional().meta({ description: "Optional closing quote. Max 20 words" }),
});

export { Schema };
export type ThreeColumnSummaryLayoutData = z.infer<typeof Schema>;

const ThreeColumnSummaryLayout: React.FC<{ data?: Partial<ThreeColumnSummaryLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-3">{slideData?.title || 'Summary and Next Steps'}</h1>
                    <p style={{ color: ab4cColors.secondaryText }} className="text-base mb-6">{slideData?.description || ''}</p>

                    <div className="flex gap-6 flex-1">
                        {slideData?.columns?.map((col, idx) => (
                            <div key={idx} className="flex-1">
                                <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-3">{col.heading}</h3>
                                <ul className="space-y-2">
                                    {col.bullets.map((bullet, bidx) => (
                                        <li key={bidx} className="flex items-start">
                                            <span style={{ color: ab4cColors.accent }} className="mr-2 mt-1">•</span>
                                            <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {slideData?.quote && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-center text-base italic mt-4">"{slideData.quote}"</p>
                    )}
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

export default ThreeColumnSummaryLayout;
