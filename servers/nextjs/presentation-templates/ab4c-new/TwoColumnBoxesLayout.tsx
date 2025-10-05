import React from 'react';
import * as z from "zod";

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-two-column-boxes';
export const layoutName = 'Two Column Boxes';
export const layoutDescription = 'Side-by-side content boxes ideal for objectives, comparisons, or dual-topic presentations. Each box contains a heading and bulleted list.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Training Objectives and Duration').meta({
        description: "Main slide title. Max 8 words",
    }),
    leftBoxTitle: z.string().min(3).max(40).default('Key Objectives').meta({
        description: "Left box heading. Max 5 words",
    }),
    leftBoxBullets: z.array(z.string().min(10).max(250)).min(3).max(6).default([
        'Master import/export documentation requirements',
        'Understand tariff classification systems',
        'Navigate regulatory compliance frameworks'
    ]).meta({
        description: "Left box bullet points. 3-6 items, max 15 words each",
    }),
    rightBoxTitle: z.string().min(3).max(40).default('Training Details').meta({
        description: "Right box heading. Max 5 words",
    }),
    rightBoxBullets: z.array(z.string().min(10).max(250)).min(3).max(6).default([
        'Duration: 4 weeks intensive training',
        'Format: Interactive workshops and case studies',
        'Certification: Professional compliance credential'
    ]).meta({
        description: "Right box bullet points. 3-6 items, max 15 words each",
    }),
    footerDescription: z.string().max(600).optional().meta({
        description: "Optional footer text. Max 30 words",
    }),
});

export { Schema };
export type TwoColumnBoxesLayoutData = z.infer<typeof Schema>;

interface TwoColumnBoxesLayoutProps {
    data?: Partial<TwoColumnBoxesLayoutData>;
}

const TwoColumnBoxesLayout: React.FC<TwoColumnBoxesLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-8">
                        {slideData?.title || 'Training Objectives and Duration'}
                    </h1>

                    <div className="flex gap-6 flex-1">
                        <div className="flex-1 rounded-lg p-6" style={{ backgroundColor: ab4cColors.boxBackground }}>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-2xl font-semibold mb-4">
                                {slideData?.leftBoxTitle || 'Key Objectives'}
                            </h2>
                            <ul className="space-y-3">
                                {slideData?.leftBoxBullets?.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-3 mt-1">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-base">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 rounded-lg p-6" style={{ backgroundColor: ab4cColors.boxBackground }}>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-2xl font-semibold mb-4">
                                {slideData?.rightBoxTitle || 'Training Details'}
                            </h2>
                            <ul className="space-y-3">
                                {slideData?.rightBoxBullets?.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-3 mt-1">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-base">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {slideData?.footerDescription && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mt-6">
                            {slideData.footerDescription}
                        </p>
                    )}
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

export default TwoColumnBoxesLayout;
