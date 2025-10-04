import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-two-column-best-practices';
export const layoutName = 'Two-Column Best Practices';
export const layoutDescription = 'A two-column layout with labeled best practices, where each item has a bold label followed by description. Use this for best practices split by category, implementation guidelines, principles and practices, or dual-aspect frameworks. Perfect for detailed recommendations and structured guidance.';

const twoColumnBestPracticesSchema = z.object({
    title: z.string().min(5).max(120).default('Best Practices for Clear, Consistent Communication').meta({
        description: "Main title describing the best practices, principles, or guidelines being presented",
    }),
    leftHeading: z.string().min(3).max(80).default('Internal Communication Excellence').meta({
        description: "Heading for left column - first category or aspect of best practices",
    }),
    leftItems: z.array(z.object({
        label: z.string().min(3).max(50),
        description: z.string().min(10).max(200)
    })).min(3).max(8).default([
        {
            label: 'Regular Updates:',
            description: 'Scheduled compliance briefings for all departments'
        },
        {
            label: 'Visual Aids:',
            description: 'Use infographics and flowcharts to simplify complex requirements'
        },
        {
            label: 'Two-Way Dialogue:',
            description: 'Encourage questions and feedback from all team members'
        },
        {
            label: 'Documentation:',
            description: 'Maintain comprehensive records of all compliance communications'
        },
        {
            label: 'Training Integration:',
            description: 'Include communication skills in compliance training programmes'
        },
        {
            label: 'Success Metrics:',
            description: 'Track communication effectiveness through compliance performance indicators'
        }
    ]).meta({
        description: "Left column items - each with bold label and description (3-8 items for optimal display)",
    }),
    rightHeading: z.string().min(3).max(80).default('External Stakeholder Engagement').meta({
        description: "Heading for right column - second category or aspect of best practices",
    }),
    rightItems: z.array(z.object({
        label: z.string().min(3).max(50),
        description: z.string().min(10).max(200)
    })).min(3).max(8).default([
        {
            label: 'Cultural Sensitivity:',
            description: 'Adapt communication styles to different cultural contexts and business practices'
        },
        {
            label: 'Regulatory Liaison:',
            description: 'Maintain professional relationships with key regulatory contacts'
        },
        {
            label: 'Customer Education:',
            description: 'Proactively inform customers about compliance requirements affecting their orders'
        },
        {
            label: 'Supplier Coordination:',
            description: 'Ensure suppliers understand and comply with relevant regulatory requirements'
        },
        {
            label: 'Industry Collaboration:',
            description: 'Participate in trade associations and industry forums for compliance best practices'
        },
        {
            label: 'Crisis Communication:',
            description: 'Prepare protocols for communicating during compliance emergencies'
        }
    ]).meta({
        description: "Right column items - each with bold label and description (3-8 items for optimal display)",
    })
});

export const Schema = twoColumnBestPracticesSchema;

export type TwoColumnBestPracticesData = z.infer<typeof twoColumnBestPracticesSchema>;

interface TwoColumnBestPracticesLayoutProps {
    data?: Partial<TwoColumnBestPracticesData>
}

const TwoColumnBestPracticesLayout: React.FC<TwoColumnBestPracticesLayoutProps> = ({ data: slideData }) => {
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
                <div className="relative z-10 h-full flex flex-col px-12 lg:px-16 pt-8 pb-24">
                    {/* Title */}
                    <h1
                        className="text-3xl sm:text-4xl font-bold mb-6"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Best Practices for Clear, Consistent Communication'}
                    </h1>

                    {/* Two Columns */}
                    <div className="flex gap-8">
                        {/* Left Column */}
                        <div className="flex-1">
                            <h2
                                className="text-2xl font-bold mb-4"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.leftHeading || 'Internal Communication Excellence'}
                            </h2>

                            <ul className="space-y-3">
                                {slideData?.leftItems && slideData.leftItems.length > 0 ? (
                                    slideData.leftItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>
                                                <strong style={{ color: "#4a4035" }}>{item.label}</strong>{' '}
                                                {item.description}
                                            </span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1">
                            <h2
                                className="text-2xl font-bold mb-4"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.rightHeading || 'External Stakeholder Engagement'}
                            </h2>

                            <ul className="space-y-3">
                                {slideData?.rightItems && slideData.rightItems.length > 0 ? (
                                    slideData.rightItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>
                                                <strong style={{ color: "#4a4035" }}>{item.label}</strong>{' '}
                                                {item.description}
                                            </span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>
                    </div>
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

export default TwoColumnBestPracticesLayout;
