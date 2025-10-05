import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon'; // Assuming this is the correct path

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-three-column-cards';
export const layoutName = 'Three Column Cards';
export const layoutDescription = 'Three-column card layout presenting key concepts, tools, or solutions, each with a visual image, concise heading, and descriptive text. Includes an optional introductory paragraph and footer text. Ideal for showcasing distinct offerings, features, or strategic pillars with visual emphasis.';

const threeColumnCardsLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Tools and Frameworks for Systematic Analysis').meta({
        description: "Main title for a slide presenting three distinct concepts or offerings in card format",
    }),
    introduction: z.string().min(50).max(200).optional().default('Effective trade compliance relies heavily on robust tools and established frameworks that streamline processes, enhance accuracy, and provide actionable insights. Leveraging these resources is key to proactive risk management and operational excellence.').meta({
        description: "Optional introductory text providing context to the three cards presented",
    }),
    cards: z.array(z.object({
        image: ImageSchema.default({
            __image_url__: 'https://images.unsplash.com/photo-1557804506-669a67965da0?auto=format&fit=crop&w=640&q=80',
            __image_prompt__: 'Magnifying glass over a document with abstract data visualization'
        }).meta({
            description: "An illustrative image for each card, visually representing its content",
        }),
        heading: z.string().min(3).max(80).meta({
            description: "Concise heading for each card, summarizing its main idea",
        }),
        description: z.string().min(20).max(300).meta({
            description: "A short descriptive paragraph for each card, detailing the concept or offering",
        }),
    })).min(3).max(3).default([
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1557804506-669a67965da0?auto=format&fit=crop&w=640&q=80',
                __image_prompt__: 'Magnifying glass over a document with abstract data visualization'
            },
            heading: 'AI-Powered Trade Analytics',
            description: 'Utilize artificial intelligence to analyze vast datasets, identify emerging compliance risks, and predict future regulatory changes with high accuracy. Automate routine data checks.',
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1557804506-669a67965da0?auto=format&fit=crop&w=640&q=80',
                __image_prompt__: 'Hand holding a glowing global network icon with digital data streams'
            },
            heading: 'Global Regulatory Trackers',
            description: 'Access real-time updates and alerts on international trade regulations, sanctions, and customs policies. Ensure your operations remain agile and compliant across all jurisdictions.',
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1506765515384-028b60703703?auto=format&fit=crop&w=640&q=80',
                __image_prompt__: 'Business people collaborating around a table with a laptop and documents, focus on teamwork'
            },
            heading: 'Collaborative Workflow Platforms',
            description: 'Implement integrated platforms that facilitate seamless information sharing and task management among compliance, legal, and operational teams. Enhance cross-departmental efficiency.',
        },
    ]).meta({
        description: "Three content cards with images, headings, and descriptions",
    }),
    footerText: z.string().min(20).max(400).optional().default('These cutting-edge tools and robust frameworks are indispensable for any organization aiming to achieve superior trade compliance, reduce operational friction, and enhance overall strategic resilience.').meta({
        description: "Optional concluding text summarizing the overall message of the cards presentation",
    }),
});

export const Schema = threeColumnCardsLayoutSchema;

export type ThreeColumnCardsLayoutData = z.infer<typeof threeColumnCardsLayoutSchema>;

interface ThreeColumnCardsLayoutProps {
    data?: Partial<ThreeColumnCardsLayoutData>;
}

const ThreeColumnCardsLayout: React.FC<ThreeColumnCardsLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: ab4cColors.background,
                }}
            >
                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full px-12 pt-12 pb-8">
                    <h1
                        style={{ color: ab4cColors.primaryText }}
                        className="text-4xl lg:text-5xl font-bold text-center mb-6"
                    >
                        {slideData?.title || 'Tools and Frameworks for Systematic Analysis'}
                    </h1>
                    {slideData?.introduction && (
                        <p
                            style={{ color: ab4cColors.secondaryText }}
                            className="text-base text-center mb-10 max-w-3xl mx-auto"
                        >
                            {slideData.introduction}
                        </p>
                    )}

                    <div className="flex-1 grid grid-cols-3 gap-8 ">
                        {slideData?.cards?.map((card, cardIndex) => (
                            <div
                                key={cardIndex}
                                className="flex flex-col  rounded-lg p-6 shadow-md"
                                style={{ backgroundColor: ab4cColors.boxBackground }}
                            >
                                <div className="h-40 mb-4 rounded-md overflow-hidden">
                                     <img
                                        src={card.image.__image_url__ || ''}
                                        alt={card.image.__image_prompt__ || card.heading || ''}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3
                                    style={{ color: ab4cColors.primaryText }}
                                    className="text-xl font-semibold mb-3"
                                >
                                    {card.heading}
                                </h3>
                                <p
                                    style={{ color: ab4cColors.secondaryText }}
                                    className="text-sm leading-relaxed flex-1"
                                >
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {slideData?.footerText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-8 px-8">
                            {slideData.footerText}
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
                    style={{ background: ab4cColors.background }}
                >
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img
                        src="/ab4c-logo.png"
                        alt="AB4C Logo"
                        className="h-14 w-14 object-contain"
                    />
                </div>
            </div>
        </>
    );
};

export default ThreeColumnCardsLayout;
