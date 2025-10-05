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

export const layoutId = 'ab4c-two-column-best-practices';
export const layoutName = 'Two-Column Best Practices';
export const layoutDescription = 'A two-column layout with labeled best practices, where each item has a bold label followed by description. Use this for best practices split by category, implementation guidelines, principles and practices, or dual-aspect frameworks. Perfect for detailed recommendations and structured guidance.';

const twoColumnBestPracticesLayoutSchema = z.object({
    title: z.string().min(5).max(100).default('Best Practices for Clear, Consistent Communication').meta({
        description: "Main title for the best practices slide, e.g., 'Best Practices for X'",
    }),
    leftHeading: z.string().min(3).max(80).default('Internal Communication').meta({
        description: "Heading for the left column of best practices, such as 'Internal Communication' or 'Key Principles'",
    }),
    leftItems: z.array(z.object({
        label: z.string().min(3).max(50).meta({
            description: "Bold label for an individual best practice (e.g., 'Standardized Terminology:')",
        }),
        description: z.string().min(10).max(200).meta({
            description: "Detailed description explaining the best practice",
        }),
    })).min(3).max(8).default([
        {
            label: 'Standardized Terminology:',
            description: 'Develop and disseminate a glossary of compliance terms used across all departments to ensure everyone speaks the same language.'
        },
        {
            label: 'Regular Updates:',
            description: 'Schedule regular briefings and newsletters for internal stakeholders on new regulations, policy changes, and enforcement actions.'
        },
        {
            label: 'Cross-Functional Training:',
            description: 'Implement joint training sessions for legal, compliance, sales, procurement, and logistics teams to foster shared understanding.'
        },
    ]).meta({
        description: "A list of best practices for the left category, each with a bold label and a descriptive paragraph",
    }),
    rightHeading: z.string().min(3).max(80).default('External Engagement').meta({
        description: "Heading for the right column of best practices, such as 'External Engagement' or 'Implementation Steps'",
    }),
    rightItems: z.array(z.object({
        label: z.string().min(3).max(50).meta({
            description: "Label for the practice",
        }),
        description: z.string().min(10).max(200).meta({
            description: "Description of the practice",
        }),
    })).min(3).max(8).default([
        {
            label: 'Clear Contracts:',
            description: 'Ensure all contracts with third parties explicitly define compliance expectations, responsibilities, and audit rights.'
        },
        {
            label: 'Vendor Due Diligence:',
            description: 'Communicate compliance requirements clearly during vendor selection and ongoing management. Conduct regular compliance audits.'
        },
        {
            label: 'Regulatory Interaction:',
            description: 'Establish clear protocols for interaction with regulatory bodies, ensuring consistent and accurate information is provided. Designate spokespersons.'
        },
    ]).meta({
        description: "A list of best practices for the right category, each with a bold label and a descriptive paragraph",
    }),
});

export const Schema = twoColumnBestPracticesLayoutSchema;

export type TwoColumnBestPracticesLayoutData = z.infer<typeof twoColumnBestPracticesLayoutSchema>;

interface TwoColumnBestPracticesLayoutProps {
    data?: Partial<TwoColumnBestPracticesLayoutData>;
}

const TwoColumnBestPracticesLayout: React.FC<TwoColumnBestPracticesLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Best Practices for Clear, Consistent Communication'}
                    </h1>

                    <div className="flex-1 grid grid-cols-2 gap-12">
                        {/* Left Column */}
                        <div>
                            <h2
                                style={{ color: ab4cColors.primaryText }}
                                className="text-2xl font-semibold mb-4"
                            >
                                {slideData?.leftHeading || 'Internal Communication'}
                            </h2>
                            <ul className="space-y-4">
                                {slideData?.leftItems?.map((item, index) => (
                                    <li key={index}>
                                        <p style={{ color: ab4cColors.primaryText }} className="text-base font-bold mb-1">
                                            {item.label}
                                        </p>
                                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {item.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column */}
                        <div>
                            <h2
                                style={{ color: ab4cColors.primaryText }}
                                className="text-2xl font-semibold mb-4"
                            >
                                {slideData?.rightHeading || 'External Engagement'}
                            </h2>
                            <ul className="space-y-4">
                                {slideData?.rightItems?.map((item, index) => (
                                    <li key={index}>
                                        <p style={{ color: ab4cColors.primaryText }} className="text-base font-bold mb-1">
                                            {item.label}
                                        </p>
                                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {item.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
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

export default TwoColumnBestPracticesLayout;
