import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-numbered-steps';
export const layoutName = 'Numbered Steps';
export const layoutDescription = 'Clean numbered list layout with steps and descriptions. Perfect for sequential instructions or methodical approaches.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Implementation Steps').meta({ description: "Main title. Max 8 words" }),
    subtitle: z.string().min(10).max(600).optional().meta({ description: "Optional subtitle or introduction. Max 30 words" }),
    steps: z.array(z.object({
        heading: z.string().min(3).max(50).meta({ description: "Step heading. Max 6 words" }),
        description: z.string().min(10).max(400).meta({ description: "Step description. Max 20 words" }),
    })).min(4).max(6).default([
        { heading: 'Identify Key Requirements', description: 'Extract essential compliance obligations from regulatory text, focusing on specific actions, timelines, and responsibilities' },
        { heading: 'Translate to Plain Language', description: 'Convert legal terminology into clear, everyday language that can be understood by all team members regardless of their regulatory background' },
        { heading: 'Create Actionable Steps', description: 'Develop specific, measurable actions that departments can implement to ensure compliance with regulatory requirements' },
        { heading: 'Validate Understanding', description: 'Confirm interpretation accuracy through cross-departmental review and feedback to ensure consistent understanding across teams' }
    ]).meta({ description: "Sequential steps. 4-6 items" }),
    footerText: z.string().max(400).optional().meta({ description: "Optional footer summary. Max 20 words" }),
});

export { Schema };
export type NumberedStepsLayoutData = z.infer<typeof Schema>;

const NumberedStepsLayout: React.FC<{ data?: Partial<NumberedStepsLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-2">{slideData?.title || 'Implementation Steps'}</h1>
                    {slideData?.subtitle && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData.subtitle}</p>
                    )}

                    <div className="flex flex-col gap-6 flex-1">
                        {slideData?.steps?.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                    <div style={{ color: ab4cColors.accent }} className="text-2xl font-bold w-12">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                </div>
                                <div className="flex-1 border-b pb-3" style={{ borderColor: ab4cColors.boxBackground }}>
                                    <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-1">{step.heading}</h3>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {slideData?.footerText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-4">{slideData.footerText}</p>
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

export default NumberedStepsLayout;
