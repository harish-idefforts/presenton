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

export const layoutId = 'ab4c-two-column-boxes';
export const layoutName = 'Two Column Boxes';
export const layoutDescription = 'Two-column layout featuring two prominent side-by-side content boxes, each with a clear heading and a list of bullet points. Includes an optional descriptive footer text to summarize or add context. Ideal for comparing two distinct sets of information, such as objectives vs. duration, benefits vs. challenges, or internal vs. external factors.';

const twoColumnBoxesLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Training Objectives and Duration').meta({
        description: "Main title for the slide, often used for comparing two related aspects like 'Objectives and Duration'",
    }),
    leftBoxTitle: z.string().min(3).max(80).default('Objectives').meta({
        description: "Title for the left content box, clearly defining its category (e.g., 'Objectives', 'Benefits')",
    }),
    leftBoxBullets: z.array(z.string().min(10).max(150)).min(3).max(8).default([
        'Understand key trade compliance regulations and their impact on global operations.',
        'Develop skills to identify, assess, and mitigate trade compliance risks.',
        'Learn best practices for documentation and record-keeping, and internal controls.'
    ]).meta({
        description: "Bullet points detailing the content of the left box, such as learning objectives or key benefits",
    }),
    rightBoxTitle: z.string().min(3).max(80).default('Duration').meta({
        description: "Title for the right content box, clearly defining its category (e.g., 'Duration', 'Challenges')",
    }),
    rightBoxBullets: z.array(z.string().min(10).max(150)).min(3).max(8).default([
        'Module 1: Foundations of Trade Compliance (2 hours)',
        'Module 2: Risk Assessment & Mitigation (3 hours)',
        'Module 3: Best Practices & Technology (2.5 hours)'
    ]).meta({
        description: "Bullet points detailing the content of the right box, such as time allocations or specific challenges",
    }),
    footerDescription: z.string().min(20).max(300).optional().default('This comprehensive training program is designed to equip participants with the essential knowledge and practical skills required to navigate the complexities of international trade compliance.').meta({
        description: "Optional descriptive text at the bottom of the slide, providing a summary or concluding thought",
    }),
});

export const Schema = twoColumnBoxesLayoutSchema;

export type TwoColumnBoxesLayoutData = z.infer<typeof twoColumnBoxesLayoutSchema>;

interface TwoColumnBoxesLayoutProps {
    data?: Partial<TwoColumnBoxesLayoutData>;
}

const TwoColumnBoxesLayout: React.FC<TwoColumnBoxesLayoutProps> = ({ data: slideData }) => {
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
                        className="text-4xl lg:text-5xl font-bold text-center mb-8"
                    >
                        {slideData?.title || 'Training Objectives and Duration'}
                    </h1>

                    <div className="flex-1 grid grid-cols-2 gap-8 items-center justify-center">
                        {/* Left Box */}
                        <div
                            className="bg-white rounded-lg p-6 shadow-md flex flex-col h-full"
                            style={{ backgroundColor: ab4cColors.boxBackground }}
                        >
                            <h2
                                style={{ color: ab4cColors.primaryText }}
                                className="text-2xl font-semibold mb-4"
                            >
                                {slideData?.leftBoxTitle || 'Objectives'}
                            </h2>
                            <ul className="list-disc pl-5 space-y-3 flex-1">
                                {slideData?.leftBoxBullets?.map((bullet, index) => (
                                    <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-base leading-relaxed">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Box */}
                        <div
                            className="bg-white rounded-lg p-6 shadow-md flex flex-col h-full"
                            style={{ backgroundColor: ab4cColors.boxBackground }}
                        >
                            <h2
                                style={{ color: ab4cColors.primaryText }}
                                className="text-2xl font-semibold mb-4"
                            >
                                {slideData?.rightBoxTitle || 'Duration'}
                            </h2>
                            <ul className="list-disc pl-5 space-y-3 flex-1">
                                {slideData?.rightBoxBullets?.map((bullet, index) => (
                                    <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-base leading-relaxed">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {slideData?.footerDescription && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mt-8 text-center px-8">
                            {slideData.footerDescription}
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

export default TwoColumnBoxesLayout;
