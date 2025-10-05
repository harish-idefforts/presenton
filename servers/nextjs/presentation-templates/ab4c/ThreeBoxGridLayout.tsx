import React from 'react';
import * as z from "zod";

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-three-box-grid';
export const layoutName = 'Three-Box Simple Grid';
export const layoutDescription = 'A clean three-column grid layout with equal boxes containing headings, descriptions, and bullet points. Use this for presenting three categories, types, sources, challenges, or approaches. Perfect for simple categorizations and grouped information without requiring visual elements.';

const threeBoxGridLayoutSchema = z.object({
    title: z.string().min(5).max(100).default('Common Sources of Misinterpretation').meta({
        description: "Main title for a slide categorizing and explaining three distinct concepts, challenges, or approaches",
    }),
    boxes: z.array(z.object({
        heading: z.string().min(3).max(80).meta({
            description: "Concise heading identifying the category or concept of the box",
        }),
        description: z.string().min(20).max(300).meta({
            description: "A detailed paragraph explaining the content of the category or type",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6).default([
            'Inconsistent terminology usage',
            'Lack of clear definitions'
        ]).meta({
            description: "Key bullet points further elaborating on the aspects or examples of the box's content",
        }),
    })).min(3).max(3).default([
        {
            heading: 'Regulatory Ambiguity',
            description: 'Complex and often conflicting regulations from different jurisdictions can lead to varied interpretations, creating compliance gaps.',
            bullets: [
                'Inconsistent terminology usage.',
                'Varied interpretations by different agencies.',
                'Lack of clear definitions for key terms.'
            ],
        },
        {
            heading: 'Communication Gaps',
            description: 'Breakdowns in communication between legal, compliance, and operational teams often result in misaligned understanding and execution of policies.',
            bullets: [
                'Insufficient cross-departmental training.',
                'Lack of standardized communication channels.',
                'Cultural and language barriers in global teams.'
            ],
        },
        {
            heading: 'Inadequate Documentation',
            description: 'Vague, incomplete, or outdated documentation makes it difficult to prove compliance and often leads to missteps during audits.',
            bullets: [
                'Missing critical details in records.',
                'Reliance on informal communication.',
                'Failure to update procedures periodically.'
            ],
        },
    ]).meta({
        description: "Three equal content boxes, each for a core category, type, or approach, with its own heading, detailed description, and supporting bullet points",
    }),
});

export const Schema = threeBoxGridLayoutSchema;

export type ThreeBoxGridLayoutData = z.infer<typeof threeBoxGridLayoutSchema>;

interface ThreeBoxGridLayoutProps {
    data?: Partial<ThreeBoxGridLayoutData>;
}

const ThreeBoxGridLayout: React.FC<ThreeBoxGridLayoutProps> = ({ data: slideData }) => {
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
                        className="text-4xl lg:text-5xl font-bold text-center mb-10"
                    >
                        {slideData?.title || 'Common Sources of Misinterpretation'}
                    </h1>

                    <div className="flex-1 grid grid-cols-3 gap-8 items-stretch">
                        {slideData?.boxes?.map((box, boxIndex) => (
                            <div
                                key={boxIndex}
                                className="flex flex-col  rounded-lg p-6 shadow-md"
                                style={{ backgroundColor: ab4cColors.boxBackground, borderLeft: `5px solid ${ab4cColors.accent}` }}
                            >
                                <h3
                                    style={{ color: ab4cColors.primaryText }}
                                    className="text-xl font-semibold mb-3"
                                >
                                    {box.heading}
                                </h3>
                                <p
                                    style={{ color: ab4cColors.secondaryText }}
                                    className="text-sm leading-relaxed mb-4 flex-grow"
                                >
                                    {box.description}
                                </p>
                                <ul className="list-disc pl-5 space-y-1 mt-auto">
                                    {box.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
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

export default ThreeBoxGridLayout;
