import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-exercise-activity';
export const layoutName = 'Exercise Activity';
export const layoutDescription = 'Practical exercise layout with description, structure details, learning objectives, and activity steps.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Practical Exercise').meta({ description: "Main title. Max 8 words" }),
    subtitle: z.string().min(5).max(200).default('Classification Workshop').meta({ description: "Subtitle. Max 10 words" }),
    description: z.string().min(30).max(600).default('Hands-on exercise to practice tariff classification using real product samples.').meta({ description: "Description. Max 30 words" }),
    duration: z.string().min(3).max(30).default('45 minutes').meta({ description: "Duration" }),
    teams: z.string().min(3).max(30).default('Groups of 3-4').meta({ description: "Team structure" }),
    materials: z.string().min(5).max(200).default('Product samples, tariff schedule, reference guides').meta({ description: "Required materials" }),
    objectives: z.array(z.string().min(10).max(100)).min(2).max(4).default(['Practice classification methodology', 'Build confidence with tariff schedules']).meta({ description: "Learning objectives. 2-4 items" }),
    steps: z.array(z.string().min(10).max(250)).min(3).max(6).default(['Review product characteristics', 'Research tariff classifications', 'Document findings and rationale']).meta({ description: "Activity steps. 3-6 items" }),
});

export { Schema };
export type ExerciseActivityLayoutData = z.infer<typeof Schema>;

const ExerciseActivityLayout: React.FC<{ data?: Partial<ExerciseActivityLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-1">{slideData?.title || 'Practical Exercise'}</h1>
                    <h2 style={{ color: ab4cColors.secondaryText }} className="text-xl mb-4">{slideData?.subtitle || ''}</h2>
                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData?.description || ''}</p>

                    <div className="flex gap-6 flex-1">
                        <div className="flex-1">
                            <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div><span className="font-semibold">Duration:</span> {slideData?.duration}</div>
                                    <div><span className="font-semibold">Teams:</span> {slideData?.teams}</div>
                                    <div className="col-span-2"><span className="font-semibold">Materials:</span> {slideData?.materials}</div>
                                </div>
                            </div>

                            <h3 style={{ color: ab4cColors.primaryText }} className="font-semibold mb-2">Learning Objectives</h3>
                            <ul className="space-y-1 mb-4">
                                {slideData?.objectives?.map((obj, idx) => (
                                    <li key={idx} className="flex items-start"><span style={{ color: ab4cColors.accent }} className="mr-2">•</span><span style={{ color: ab4cColors.secondaryText }} className="text-sm">{obj}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1">
                            <h3 style={{ color: ab4cColors.primaryText }} className="font-semibold mb-3">Activity Steps</h3>
                            <div className="space-y-2">
                                {slideData?.steps?.map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: ab4cColors.accent }}>{idx + 1}</div>
                                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
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

export default ExerciseActivityLayout;
