import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-two-column-best-practices';
export const layoutName = 'Two Column Best Practices';
export const layoutDescription = 'Best practices layout with two columns of labeled items. Each item has a bold label followed by description.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Best Practices').meta({ description: "Main title. Max 8 words" }),
    leftColumn: z.array(z.object({
        label: z.string().min(3).max(30).meta({ description: "Practice label. Max 4 words" }),
        description: z.string().min(10).max(250).meta({ description: "Description. Max 15 words" }),
    })).min(3).max(5).default([
        { label: 'Regular Updates', description: 'Schedule periodic reviews of compliance requirements and procedures' },
        { label: 'Clear Documentation', description: 'Maintain detailed records of all compliance-related activities' }
    ]).meta({ description: "Left column practices. 3-5 items" }),
    rightColumn: z.array(z.object({
        label: z.string().min(3).max(30).meta({ description: "Practice label. Max 4 words" }),
        description: z.string().min(10).max(250).meta({ description: "Description. Max 15 words" }),
    })).min(3).max(5).default([
        { label: 'Team Training', description: 'Provide ongoing education on regulatory changes and best practices' },
        { label: 'Process Audits', description: 'Conduct regular internal audits to identify improvement opportunities' }
    ]).meta({ description: "Right column practices. 3-5 items" }),
});

export { Schema };
export type TwoColumnBestPracticesLayoutData = z.infer<typeof Schema>;

const TwoColumnBestPracticesLayout: React.FC<{ data?: Partial<TwoColumnBestPracticesLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-8">{slideData?.title || 'Best Practices'}</h1>

                    <div className="flex gap-8 flex-1">
                        <div className="flex-1 space-y-4">
                            {slideData?.leftColumn?.map((item, idx) => (
                                <div key={idx}>
                                    <span style={{ color: ab4cColors.primaryText }} className="font-semibold">{item.label}:</span>
                                    <span style={{ color: ab4cColors.secondaryText }} className="text-sm ml-2">{item.description}</span>
                                </div>
                            ))}
                        </div>

                        <div className="w-px" style={{ backgroundColor: ab4cColors.accent, opacity: 0.3 }}></div>

                        <div className="flex-1 space-y-4">
                            {slideData?.rightColumn?.map((item, idx) => (
                                <div key={idx}>
                                    <span style={{ color: ab4cColors.primaryText }} className="font-semibold">{item.label}:</span>
                                    <span style={{ color: ab4cColors.secondaryText }} className="text-sm ml-2">{item.description}</span>
                                </div>
                            ))}
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

export default TwoColumnBestPracticesLayout;
