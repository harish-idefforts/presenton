import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-scenario-discussion';
export const layoutName = 'Scenario Discussion';
export const layoutDescription = 'Group discussion layout with scenario, framework description, and numbered step grid for interactive sessions.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Group Discussion').meta({ description: "Main title. Max 8 words" }),
    scenario: z.string().min(30).max(600).default('Your team discovers a potential compliance issue with recent shipments. How do you proceed?').meta({ description: "Scenario text. Max 30 words" }),
    frameworkDescription: z.string().min(20).max(400).default('Use the following framework to analyze and resolve the scenario:').meta({ description: "Framework intro. Max 20 words" }),
    steps: z.array(z.object({
        number: z.string().min(1).max(3).meta({ description: "Step number" }),
        label: z.string().min(3).max(80).meta({ description: "Step label. Max 5 words" }),
        description: z.string().min(10).max(250).meta({ description: "Step description. Max 15 words" }),
    })).min(4).max(6).default([
        { number: '1', label: 'Identify', description: 'Assess the nature and scope of the issue' },
        { number: '2', label: 'Analyze', description: 'Review relevant regulations and requirements' },
        { number: '3', label: 'Plan', description: 'Develop corrective action strategy' },
        { number: '4', label: 'Execute', description: 'Implement solutions and document process' }
    ]).meta({ description: "Discussion steps. 4-6 steps" }),
});

export { Schema };
export type ScenarioDiscussionLayoutData = z.infer<typeof Schema>;

const ScenarioDiscussionLayout: React.FC<{ data?: Partial<ScenarioDiscussionLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-4">{slideData?.title || 'Group Discussion'}</h1>

                    <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#fff3cd' }}>
                        <p style={{ color: ab4cColors.primaryText }} className="text-sm italic font-medium">
                            <span className="uppercase font-bold mr-2">SCENARIO:</span>
                            {slideData?.scenario || ''}
                        </p>
                    </div>

                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-4">{slideData?.frameworkDescription || ''}</p>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {slideData?.steps?.map((step, idx) => (
                            <div key={idx} className="p-4 rounded-lg flex gap-3" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: ab4cColors.accent }}>
                                    {step.number}
                                </div>
                                <div className="flex-1">
                                    <h4 style={{ color: ab4cColors.primaryText }} className="font-semibold mb-1">{step.label}</h4>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-xs">{step.description}</p>
                                </div>
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

export default ScenarioDiscussionLayout;
