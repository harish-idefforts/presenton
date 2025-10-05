import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-circular-process';
export const layoutName = 'Circular Process';
export const layoutDescription = 'Cyclical process layout with center focus and steps positioned around it. Perfect for continuous improvement cycles or balanced frameworks.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Compliance Cycle').meta({ description: "Main title. Max 8 words" }),
    centerLabel: z.string().min(3).max(40).default('Continuous Improvement').meta({ description: "Center label. Max 5 words" }),
    steps: z.array(z.object({
        label: z.string().min(3).max(30).meta({ description: "Step label. Max 4 words" }),
        description: z.string().min(10).max(200).meta({ description: "Step description. Max 10 words" }),
    })).min(4).max(6).default([
        { label: 'Plan', description: 'Identify compliance requirements and objectives' },
        { label: 'Execute', description: 'Implement compliance procedures and controls' },
        { label: 'Monitor', description: 'Track performance and identify issues' },
        { label: 'Review', description: 'Assess effectiveness and adjust approach' }
    ]).meta({ description: "Process steps. 4-6 steps" }),
    summaryText: z.string().max(250).optional().meta({ description: "Optional summary text. Max 15 words" }),
});

export { Schema };
export type CircularProcessLayoutData = z.infer<typeof Schema>;

const CircularProcessLayout: React.FC<{ data?: Partial<CircularProcessLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-8 text-center">{slideData?.title || 'Compliance Cycle'}</h1>

                    <div className="flex gap-8 items-center flex-1">
                        <div className="flex-1 flex flex-col gap-6">
                            {slideData?.steps?.slice(0, Math.ceil((slideData?.steps?.length || 4) / 2)).map((step, idx) => (
                                <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                    <h4 style={{ color: ab4cColors.primaryText }} className="font-semibold mb-1 text-sm">{step.label}</h4>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-xs">{step.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full flex items-center justify-center text-center p-6" style={{ backgroundColor: ab4cColors.accent, color: 'white' }}>
                                <span className="font-bold text-lg">{slideData?.centerLabel || 'Continuous Improvement'}</span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-6">
                            {slideData?.steps?.slice(Math.ceil((slideData?.steps?.length || 4) / 2)).map((step, idx) => (
                                <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                    <h4 style={{ color: ab4cColors.primaryText }} className="font-semibold mb-1 text-sm">{step.label}</h4>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-xs">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {slideData?.summaryText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-4">{slideData.summaryText}</p>
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

export default CircularProcessLayout;
