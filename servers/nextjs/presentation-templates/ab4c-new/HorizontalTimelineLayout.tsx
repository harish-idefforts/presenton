import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-horizontal-timeline';
export const layoutName = 'Horizontal Timeline';
export const layoutDescription = 'Horizontal timeline with numbered phases or stages. Perfect for exercise structures, workshop agendas, or phased implementations.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Exercise Structure').meta({ description: "Main title. Max 8 words" }),
    subtitle: z.string().min(10).max(600).optional().meta({ description: "Optional subtitle or introduction. Max 30 words" }),
    topDescription: z.string().min(10).max(400).optional().meta({ description: "Optional description above timeline. Max 20 words" }),
    phases: z.array(z.object({
        number: z.string().min(1).max(2).meta({ description: "Phase number (1, 2, 3, 4)" }),
        label: z.string().min(3).max(80).meta({ description: "Phase label. Max 5 words" }),
        description: z.string().min(10).max(250).meta({ description: "Phase description. Max 15 words" }),
    })).length(4).default([
        { number: '1', label: 'Scenario Assignment', description: 'Teams receive compliance update scenarios requiring communication to specific audiences' },
        { number: '2', label: 'Preparation Phase', description: 'Teams develop communication strategies appropriate to their assigned audience' },
        { number: '3', label: 'Delivery Practice', description: 'Teams present their compliance updates to role-play audiences, receiving real-time feedback' },
        { number: '4', label: 'Reflection and Learning', description: 'Participants discuss challenges encountered and strategies developed for future communications' }
    ]).meta({ description: "Four timeline phases" }),
    keyLearning: z.string().min(3).max(40).optional().meta({ description: "Optional key learning heading. Max 6 words" }),
    learningText: z.string().min(10).max(400).optional().meta({ description: "Optional key learning text. Max 20 words" }),
});

export { Schema };
export type HorizontalTimelineLayoutData = z.infer<typeof Schema>;

const HorizontalTimelineLayout: React.FC<{ data?: Partial<HorizontalTimelineLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-2">{slideData?.title || 'Exercise Structure'}</h1>
                    {slideData?.subtitle && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData.subtitle}</p>
                    )}

                    {slideData?.topDescription && (
                        <div className="mb-6">
                            <p style={{ color: ab4cColors.secondaryText }} className="text-sm">{slideData.topDescription}</p>
                        </div>
                    )}

                    <div className="flex-1 flex flex-col justify-center">
                        {/* Timeline line */}
                        <div className="relative mb-8">
                            <div className="absolute top-1/2 left-0 right-0 h-0.5" style={{ backgroundColor: ab4cColors.accent, transform: 'translateY(-50%)' }}></div>

                            <div className="relative flex justify-between">
                                {slideData?.phases?.map((phase, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10" style={{ backgroundColor: ab4cColors.accent }}>
                                            {phase.number}
                                        </div>
                                        <h3 style={{ color: ab4cColors.primaryText }} className="font-semibold mb-2 text-center text-sm">{phase.label}</h3>
                                        <p style={{ color: ab4cColors.secondaryText }} className="text-xs text-center max-w-[180px]">{phase.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {slideData?.learningText && (
                            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                <h4 style={{ color: ab4cColors.accent }} className="font-semibold mb-2 text-sm">
                                    {slideData.keyLearning || 'Key Learning Outcomes'}
                                </h4>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                    {slideData.learningText}
                                </p>
                            </div>
                        )}
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

export default HorizontalTimelineLayout;
