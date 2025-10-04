import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'gamma-three-column-cards';
export const layoutName = 'Three Column Cards';
export const layoutDescription = 'A visually appealing layout with three card-style columns, each featuring an image, title, and description. Use this for presenting tools, frameworks, features, resources, benefits, or any set of three related items. Perfect for showcasing options, components, or parallel concepts with visual appeal.';

const threeColumnCardsSchema = z.object({
    title: z.string().min(5).max(100).default('Tools and Frameworks for Systematic Analysis').meta({
        description: "Main title describing the category or theme of the three items being presented",
    }),
    introduction: z.string().min(20).max(300).optional().meta({
        description: "Optional introductory paragraph providing context for the three items",
    }),
    cards: z.array(z.object({
        image: ImageSchema,
        title: z.string().min(3).max(80),
        description: z.string().min(20).max(300)
    })).length(3).default([
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
                __image_prompt__: 'Business risk assessment matrix document'
            },
            title: 'Risk Assessment Matrix',
            description: 'Systematically evaluate compliance risks by plotting likelihood against potential impact. This visual tool helps prioritise resources and attention whilst ensuring comprehensive risk coverage.'
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
                __image_prompt__: 'Compliance audit checklist document'
            },
            title: 'Compliance Audit Checklist',
            description: 'Structured checklists ensure comprehensive evaluation of compliance status across all relevant regulatory areas. These tools promote consistency in assessment approaches and identify gaps in current compliance programmes.'
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
                __image_prompt__: 'Regulatory monitoring systems dashboard'
            },
            title: 'Regulatory Monitoring Systems',
            description: 'Technology-enabled tools that track regulatory changes and deliver real-time notifications of relevant requirements. These systems enable proactive compliance and reduce risk of overlooking important regulatory updates.'
        }
    ]).meta({
        description: "Exactly three cards - each with image, title, and detailed description of the tool, feature, or concept",
    }),
    footerText: z.string().min(20).max(400).optional().default('These analytical tools support informed decision-making based on objective criteria rather than subjective judgements. Regular use of these frameworks improves compliance accuracy and builds confidence in regulatory decision-making across all departments.').meta({
        description: "Optional summary or concluding remarks about the three items presented",
    })
});

export const Schema = threeColumnCardsSchema;

export type ThreeColumnCardsData = z.infer<typeof threeColumnCardsSchema>;

interface ThreeColumnCardsLayoutProps {
    data?: Partial<ThreeColumnCardsData>
}

const ThreeColumnCardsLayout: React.FC<ThreeColumnCardsLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative mx-auto"
                style={{
                    background: "#f5f5f0",
                    fontFamily: "Inter, sans-serif"
                }}
            >
                {/* Main Content Area */}
                <div className="relative z-10 h-full flex flex-col px-12 lg:px-16 pt-10 pb-24">
                    {/* Title */}
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Tools and Frameworks for Systematic Analysis'}
                    </h1>

                    {/* Introduction */}
                    {slideData?.introduction && (
                        <p
                            className="text-sm leading-relaxed mb-6"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.introduction}
                        </p>
                    )}

                    {/* Three Cards */}
                    <div className="flex gap-6 mb-4">
                        {slideData?.cards && slideData.cards.length === 3 ? (
                            slideData.cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-lg overflow-hidden shadow-md"
                                    style={{ background: "#ffffff" }}
                                >
                                    {/* Card Image */}
                                    {card.image?.__image_url__ && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={card.image.__image_url__}
                                                alt={card.image.__image_prompt__ || card.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Card Content */}
                                    <div className="p-4">
                                        <h2
                                            className="text-lg font-semibold mb-2"
                                            style={{ color: "#4a4035" }}
                                        >
                                            {card.title}
                                        </h2>
                                        <p
                                            className="text-xs leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>

                    {/* Footer Text */}
                    {slideData?.footerText && (
                        <p
                            className="text-xs leading-relaxed"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.footerText}
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
                    style={{ background: "#f5f5f0" }}
                >
                    <span className="text-xs" style={{ color: "#6b5d52" }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: "#6b5d52" }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img
                        src="/gamma-logo.png"
                        alt="AB4C Logo"
                        className="h-14 w-14 object-contain"
                    />
                </div>
            </div>
        </>
    );
};

export default ThreeColumnCardsLayout;
