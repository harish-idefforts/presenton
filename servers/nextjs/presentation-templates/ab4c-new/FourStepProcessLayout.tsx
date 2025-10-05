import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-four-step-process';
export const layoutName = 'Four Step Process';
export const layoutDescription = 'Sequential four-step process flow with arrows. Perfect for workflows, procedures, or methodological approaches.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Our Process').meta({ description: "Main title. Max 8 words" }),
    subtitle: z.string().min(10).max(400).optional().meta({ description: "Optional subtitle. Max 20 words" }),
    steps: z.array(z.object({
        label: z.string().min(3).max(80).meta({ description: "Step label. Max 5 words" }),
        description: z.string().min(10).max(250).meta({ description: "Step description. Max 15 words" }),
    })).length(4).default([
        { label: 'Identify Key Requirements', description: 'Extract essential compliance obligations from regulatory text, focusing on specific actions and timelines' },
        { label: 'Translate to Plain Language', description: 'Convert legal terminology into clear, everyday language that can be understood by all team members' },
        { label: 'Create Actionable Steps', description: 'Develop specific, measurable actions that departments can implement to ensure compliance' },
        { label: 'Validate Understanding', description: 'Confirm interpretation accuracy through cross-departmental review and feedback' }
    ]).meta({ description: "Four sequential steps" }),
    footerText: z.string().max(250).optional().meta({ description: "Optional footer summary. Max 15 words" }),
});

export { Schema };
export type FourStepProcessLayoutData = z.infer<typeof Schema>;

const FourStepProcessLayout: React.FC<{ data?: Partial<FourStepProcessLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-2">{slideData?.title || 'Our Process'}</h1>
                    {slideData?.subtitle && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData.subtitle}</p>
                    )}

                    <div className="flex gap-4 items-center flex-1">
                        {slideData?.steps?.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <div className="flex-1 p-5 rounded-lg flex flex-col" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3 text-lg" style={{ backgroundColor: ab4cColors.accent }}>
                                        {idx + 1}
                                    </div>
                                    <h3 style={{ color: ab4cColors.primaryText }} className="text-base font-semibold mb-2">{step.label}</h3>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-xs leading-relaxed">{step.description}</p>
                                </div>
                                {idx < 3 && (
                                    <div className="flex-shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={ab4cColors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
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

export default FourStepProcessLayout;
