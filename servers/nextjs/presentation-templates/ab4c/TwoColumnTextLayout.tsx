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

export const layoutId = 'ab4c-two-column-text';
export const layoutName = 'Two Column Text';
export const layoutDescription = 'Standard two-column text layout, presenting a main title and two distinct content sections side-by-side. Each column supports a heading and either a detailed paragraph or a list of bullet points. Ideal for comparing concepts, outlining principles alongside frameworks, or presenting dual perspectives of a topic without visual elements.';

const twoColumnTextLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Understanding the Foundations of Trade Compliance').meta({
        description: "Main title for the slide, often used for foundational topics or comparative overviews",
    }),
    leftHeading: z.string().min(3).max(80).default('Key Principles').meta({
        description: "Heading for the left column, e.g., 'Key Principles' or 'Advantages'",
    }),
    leftContent: z.union([z.string().min(50).max(400), z.array(z.string().min(10).max(150))]).optional().default([
        '**Global Harmony:** International trade is governed by a complex web of agreements, striving for fair and equitable commerce.',
        '**Risk Management:** Compliance ensures regulatory adherence, mitigating risks such as penalties, supply chain disruptions, and reputational damage.',
    ]).meta({
        description: "Content for the left column, providing detailed information as a paragraph or a list of bullet points (max 4)",
    }),
    rightHeading: z.string().min(3).max(80).default('Regulatory Framework').meta({
        description: "Heading for the right column, e.g., 'Regulatory Framework' or 'Disadvantages'",
    }),
    rightContent: z.union([z.string().min(50).max(400), z.array(z.string().min(10).max(150))]).optional().default([
        '**Export Controls:** Regulations governing the movement of sensitive goods and technologies across borders.',
        '**Import Duties & Taxes:** Rules determining tariffs, taxes, and other charges on imported goods.',
    ]).meta({
        description: "Content for the right column, providing detailed information as a paragraph or a list of bullet points (max 4)",
    }),
});

export const Schema = twoColumnTextLayoutSchema;

export type TwoColumnTextLayoutData = z.infer<typeof twoColumnTextLayoutSchema>;

interface TwoColumnTextLayoutProps {
    data?: Partial<TwoColumnTextLayoutData>;
}

const TwoColumnTextLayout: React.FC<TwoColumnTextLayoutProps> = ({ data: slideData }) => {
    const renderContent = (content: string | string[]) => {
        if (Array.isArray(content)) {
            return (
                <ul className="list-disc pl-5 space-y-2">
                    {content.map((item, index) => (
                        <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item }}></li>
                    ))}
                </ul>
            );
        }
        return (
            <p style={{ color: ab4cColors.secondaryText }} className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: content }}></p>
        );
    };

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
                        {slideData?.title || 'Understanding the Foundations of Trade Compliance'}
                    </h1>

                    <div className="flex-1 grid grid-cols-2 gap-12">
                        {/* Left Column */}
                        {/* Left Column */}
                        <div>
                            <h2
                                style={{ color: ab4cColors.primaryText }}
                                className="text-2xl font-semibold mb-4"
                            >
                                {slideData?.leftHeading || 'Key Principles'}
                            </h2>
                            {renderContent(slideData?.leftContent || '')}
                        </div>

                        {/* Right Column */}
                        <div>
                            <h2
                                style={{ color: ab4cColors.primaryText }}
                                className="text-2xl font-semibold mb-4"
                            >
                                {slideData?.rightHeading || 'Regulatory Framework'}
                            </h2>
                            {renderContent(slideData?.rightContent || '')}
                        </div>
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

export default TwoColumnTextLayout;
