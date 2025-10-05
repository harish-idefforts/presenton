import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-content-image-callout';
export const layoutName = 'Content with Image and Callout';
export const layoutDescription = 'Technical content slide with bullet points, supporting image, and highlighted callout box for tips or warnings.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Tariff Classification').meta({
        description: "Main slide title. Max 8 words",
    }),
    bullets: z.array(z.string().min(10).max(250)).min(3).max(6).default([
        'Understand the Harmonized System (HS) code structure',
        'Identify correct classification based on product characteristics',
        'Navigate tariff schedule databases and resources'
    ]).meta({
        description: "Main content bullets. 3-6 items, max 15 words each",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
        __image_prompt__: 'Documents and classification charts'
    }).meta({
        description: "Supporting image. Max 30 words",
    }),
    calloutType: z.enum(["tip", "warning", "info"]).default("tip").meta({
        description: "Type of callout box",
    }),
    calloutText: z.string().min(20).max(400).default('Always verify classifications with official tariff resources to ensure compliance and avoid penalties.').meta({
        description: "Callout box content. Max 20 words",
    }),
});

export { Schema };
export type ContentWithImageAndCalloutLayoutData = z.infer<typeof Schema>;

interface ContentWithImageAndCalloutLayoutProps {
    data?: Partial<ContentWithImageAndCalloutLayoutData>;
}

const ContentWithImageAndCalloutLayout: React.FC<ContentWithImageAndCalloutLayoutProps> = ({ data: slideData }) => {
    const calloutColors = {
        tip: { bg: "#d4f4dd", border: "#4caf50" },
        warning: { bg: "#fff3cd", border: "#ff9800" },
        info: { bg: "#d4e9f7", border: "#2196f3" }
    };

    const calloutColor = calloutColors[slideData?.calloutType || "tip"];

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-8">
                        {slideData?.title || 'Tariff Classification'}
                    </h1>

                    <div className="flex gap-8 flex-1">
                        <div className="flex-1 flex flex-col justify-between">
                            <ul className="space-y-4 mb-6">
                                {slideData?.bullets?.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-3 mt-1 text-xl">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-base">{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className="p-4 rounded-lg border-l-4"
                                style={{ backgroundColor: calloutColor.bg, borderColor: calloutColor.border }}
                            >
                                <p style={{ color: ab4cColors.primaryText }} className="text-sm font-medium">
                                    <span className="uppercase font-bold mr-2">{slideData?.calloutType || 'TIP'}:</span>
                                    {slideData?.calloutText || ''}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={slideData?.image?.__image_url__ || ''}
                                    alt={slideData?.image?.__image_prompt__ || ''}
                                    className="w-full h-full object-cover"
                                />
                            </div>
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

export default ContentWithImageAndCalloutLayout;
