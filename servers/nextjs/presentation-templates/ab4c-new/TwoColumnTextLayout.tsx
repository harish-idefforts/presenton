import React from 'react';
import * as z from "zod";

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-two-column-text';
export const layoutName = 'Two Column Text';
export const layoutDescription = 'Two-column layout for presenting foundational concepts or dual aspects of a topic. Each column has a heading and bullet points.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Understanding the Foundations').meta({
        description: "Main slide title. Max 8 words",
    }),
    leftHeading: z.string().min(3).max(40).default('Core Principles').meta({
        description: "Left column heading. Max 5 words",
    }),
    leftBullets: z.array(z.string().min(10).max(250)).min(3).max(6).default([
        'Comprehensive regulatory framework understanding',
        'Cross-border compliance requirements',
        'Documentation and record-keeping standards'
    ]).meta({
        description: "Left column bullets. 3-6 items, max 15 words each",
    }),
    rightHeading: z.string().min(3).max(40).default('Key Applications').meta({
        description: "Right column heading. Max 5 words",
    }),
    rightBullets: z.array(z.string().min(10).max(250)).min(3).max(6).default([
        'Practical implementation in daily operations',
        'Risk assessment and mitigation strategies',
        'Audit preparation and compliance verification'
    ]).meta({
        description: "Right column bullets. 3-6 items, max 15 words each",
    }),
});

export { Schema };
export type TwoColumnTextLayoutData = z.infer<typeof Schema>;

interface TwoColumnTextLayoutProps {
    data?: Partial<TwoColumnTextLayoutData>;
}

const TwoColumnTextLayout: React.FC<TwoColumnTextLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-10">
                        {slideData?.title || 'Understanding the Foundations'}
                    </h1>

                    <div className="flex gap-8 flex-1">
                        <div className="flex-1">
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-2xl font-semibold mb-6">
                                {slideData?.leftHeading || 'Core Principles'}
                            </h2>
                            <ul className="space-y-4">
                                {slideData?.leftBullets?.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-3 mt-1 text-xl">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-base">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-px" style={{ backgroundColor: ab4cColors.accent, opacity: 0.3 }}></div>

                        <div className="flex-1">
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-2xl font-semibold mb-6">
                                {slideData?.rightHeading || 'Key Applications'}
                            </h2>
                            <ul className="space-y-4">
                                {slideData?.rightBullets?.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-3 mt-1 text-xl">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-base">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8" style={{ background: ab4cColors.background }}>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img src="/ab4c-new-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
                </div>
            </div>
        </>
    );
};

export default TwoColumnTextLayout;
