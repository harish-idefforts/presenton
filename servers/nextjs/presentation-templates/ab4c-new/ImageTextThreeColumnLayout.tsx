import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-image-text-three-column';
export const layoutName = 'Image Text Three Column';
export const layoutDescription = 'Three columns with small images at top and extensive text descriptions. Perfect for detailed explanations or comprehensive frameworks.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Communication Strategies').meta({ description: "Main title. Max 8 words" }),
    columns: z.array(z.object({
        image: ImageSchema.meta({ description: "Column image" }),
        heading: z.string().min(3).max(80).meta({ description: "Column heading. Max 5 words" }),
        description: z.string().min(50).max(400).meta({ description: "Detailed description. Max 50 words" }),
        bullets: z.array(z.string().min(5).max(200)).min(2).max(4).meta({ description: "Key points. 2-4 items, max 10 words each" }),
    })).length(3).default([
        {
            image: { __image_url__: 'https://images.unsplash.com/photo-1553877522-43269d4ea984', __image_prompt__: 'Team meeting' },
            heading: 'Clear Messaging',
            description: 'Establish consistent communication channels and protocols across all departments to ensure compliance information reaches stakeholders effectively and timely.',
            bullets: ['Standardized formats', 'Regular updates']
        },
        {
            image: { __image_url__: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', __image_prompt__: 'Documentation' },
            heading: 'Documentation Standards',
            description: 'Maintain comprehensive records of all compliance-related communications, decisions, and actions to support audit trails and regulatory requirements.',
            bullets: ['Audit trails', 'Version control']
        },
        {
            image: { __image_url__: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e', __image_prompt__: 'Collaboration' },
            heading: 'Cross-Functional Alignment',
            description: 'Foster collaboration between compliance, operations, and management teams to ensure unified understanding and implementation of regulatory requirements.',
            bullets: ['Team collaboration', 'Shared objectives']
        }
    ]).meta({ description: "Three columns with images, headings, descriptions, and bullets" }),
    footerText: z.string().max(250).optional().meta({ description: "Optional footer summary. Max 15 words" }),
});

export { Schema };
export type ImageTextThreeColumnLayoutData = z.infer<typeof Schema>;

const ImageTextThreeColumnLayout: React.FC<{ data?: Partial<ImageTextThreeColumnLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-6">{slideData?.title || 'Communication Strategies'}</h1>

                    <div className="flex gap-6 flex-1">
                        {slideData?.columns?.map((col, idx) => (
                            <div key={idx} className="flex-1 flex flex-col">
                                <div className="h-24 rounded overflow-hidden mb-3">
                                    <img src={col.image?.__image_url__ || ''} alt={col.image?.__image_prompt__ || ''} className="w-full h-full object-cover" />
                                </div>
                                <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">{col.heading}</h3>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-xs mb-3 leading-relaxed">{col.description}</p>
                                <ul className="space-y-1">
                                    {col.bullets.map((bullet, bidx) => (
                                        <li key={bidx} className="flex items-start">
                                            <span style={{ color: ab4cColors.accent }} className="mr-2">•</span>
                                            <span style={{ color: ab4cColors.secondaryText }} className="text-xs">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {slideData?.footerText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-xs text-center mt-3">{slideData.footerText}</p>
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

export default ImageTextThreeColumnLayout;
