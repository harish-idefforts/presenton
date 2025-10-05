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

export const layoutId = 'ab4c-new-three-column-cards';
export const layoutName = 'Three Column Cards';
export const layoutDescription = 'Three card-style columns with images, headings, and descriptions. Ideal for tools, frameworks, or feature comparisons.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Tools and Frameworks').meta({
        description: "Main slide title. Max 8 words",
    }),
    introduction: z.string().max(400).optional().meta({
        description: "Optional introduction text. Max 20 words",
    }),
    cards: z.array(z.object({
        image: ImageSchema.meta({ description: "Card image" }),
        title: z.string().min(3).max(40).meta({ description: "Card title. Max 5 words" }),
        description: z.string().min(20).max(400).meta({ description: "Card description. Max 20 words" }),
    })).min(3).max(3).default([
        {
            image: { __image_url__: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf', __image_prompt__: 'Business analysis tools' },
            title: 'Risk Assessment Matrix',
            description: 'Systematic evaluation of compliance risks across operations, enabling prioritization and mitigation planning.'
        },
        {
            image: { __image_url__: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', __image_prompt__: 'Data dashboard' },
            title: 'Compliance Dashboard',
            description: 'Real-time monitoring of regulatory requirements and compliance status across all business units.'
        },
        {
            image: { __image_url__: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', __image_prompt__: 'Team collaboration' },
            title: 'Training Framework',
            description: 'Structured approach to building compliance knowledge and capabilities across the organization.'
        }
    ]).meta({
        description: "Three cards with images, titles, and descriptions",
    }),
});

export { Schema };
export type ThreeColumnCardsLayoutData = z.infer<typeof Schema>;

interface ThreeColumnCardsLayoutProps {
    data?: Partial<ThreeColumnCardsLayoutData>;
}

const ThreeColumnCardsLayout: React.FC<ThreeColumnCardsLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-4">
                        {slideData?.title || 'Tools and Frameworks'}
                    </h1>

                    {slideData?.introduction && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-base mb-8">
                            {slideData.introduction}
                        </p>
                    )}

                    <div className="flex gap-6 flex-1 items-stretch">
                        {slideData?.cards?.slice(0, 3).map((card, idx) => (
                            <div key={idx} className="flex-1 rounded-lg overflow-hidden shadow-lg flex flex-col" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                <div className="h-32 overflow-hidden">
                                    <img
                                        src={card.image?.__image_url__ || ''}
                                        alt={card.image?.__image_prompt__ || ''}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">
                                        {card.title}
                                    </h3>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
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

export default ThreeColumnCardsLayout;
