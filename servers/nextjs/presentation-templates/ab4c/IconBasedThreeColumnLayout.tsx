import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-icon-based-three-column';
export const layoutName = 'Icon-Based Three Column';
export const layoutDescription = 'A three-column layout with icon-based sections, each featuring a large icon, heading, description paragraph, and bullet points. Use this for presenting tools, frameworks, systems, methods, verification processes, or technology solutions. Perfect for structured categorizations requiring visual icons rather than photographs.';

const iconBasedThreeColumnLayoutSchema = z.object({
    title: z.string().min(5).max(100).default('Practical Tools and Technologies for Compliance Management').meta({
        description: "Main title for a three-column slide detailing tools, frameworks, or solutions",
    }),
    description: z.string().min(20).max(300).optional().default('Leveraging the right tools and technologies is critical for modern compliance management. These solutions streamline processes, enhance data accuracy, and provide real-time insights to ensure regulatory adherence and operational efficiency.').meta({
        description: "Optional introductory text providing context for the presented tools or technologies",
    }),
    columns: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/checklist-bold.svg',
            __icon_query__: 'checklist icon'
        }).meta({
            description: "An icon visually representing the theme or concept of the column. Required for this icon-based layout",
        }),
        heading: z.string().min(3).max(80).meta({
            description: "Heading for the column",
        }),
        description: z.string().min(20).max(300).meta({
            description: "A detailed paragraph explaining the tool, framework, or solution presented in the column",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6).default([
            'Automated compliance checks.',
            'Centralized document repository.'
        ]).meta({
            description: "Key bullet points highlighting specific features, benefits, or use-cases of the column's topic",
        }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/checklist-bold.svg',
                __icon_query__: 'checklist'
            },
            heading: 'Compliance Checklists & Workflows',
            description: 'Automate routine compliance checks and manage workflows with digital checklists. Ensure every step is followed and documented for audit readiness.',
            bullets: [
                'Automated compliance checks.',
                'Centralized document repository.',
                'Customizable workflow templates.'
            ],
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/database-bold.svg',
                __icon_query__: 'database'
            },
            heading: 'Integrated Data Management',
            description: 'Consolidate compliance-related data from various sources into a single, secure platform. Improve data accuracy and accessibility for reporting and analysis.',
            bullets: [
                'Unified data dashboards.',
                'Real-time data synchronization.',
                'Secure storage and access controls.'
            ],
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/ai-bold.svg',
                __icon_query__: 'AI artificial intelligence'
            },
            heading: 'AI-Powered Risk Analytics',
            description: 'Leverage artificial intelligence to identify potential compliance risks, anomalies, and emerging threats. Proactive alerts enable timely intervention and mitigation strategies.',
            bullets: [
                'Predictive risk modeling.',
                'Anomaly detection.',
                'Automated regulatory change monitoring.'
            ],
        },
    ]).meta({
        description: "Three columns with icons, headings, descriptions, and bullet points",
    }),
    footerText: z.string().min(20).max(400).optional().default('These cutting-edge tools are foundational for building a resilient and efficient compliance program, transforming regulatory challenges into strategic advantages.').meta({
        description: "Optional concluding statement summarizing the importance or strategic value of the presented information",
    }),
});

export const Schema = iconBasedThreeColumnLayoutSchema;

export type IconBasedThreeColumnLayoutData = z.infer<typeof iconBasedThreeColumnLayoutSchema>;

interface IconBasedThreeColumnLayoutProps {
    data?: Partial<IconBasedThreeColumnLayoutData>;
}

const IconBasedThreeColumnLayout: React.FC<IconBasedThreeColumnLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Practical Tools and Technologies for Compliance Management'}
                    </h1>
                    {slideData?.description && (
                        <p
                            style={{ color: ab4cColors.secondaryText }}
                            className="text-base text-center mb-10 max-w-3xl mx-auto"
                        >
                            {slideData.description}
                        </p>
                    )}

                    <div className="flex-1 grid grid-cols-3 gap-8 ">
                        {slideData?.columns?.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                className="flex flex-col  rounded-lg p-6 shadow-md"
                                style={{ backgroundColor: ab4cColors.boxBackground }}
                            >
                                <div className="h-20 mb-4 flex items-center justify-center">
                                    <RemoteSvgIcon
                                        url={column.icon.__icon_url__}
                                        strokeColor={ab4cColors.accent}
                                        className="w-16 h-16"
                                        color={ab4cColors.accent}
                                        title={column.icon.__icon_query__}
                                    />
                                </div>
                                <h3
                                    style={{ color: ab4cColors.primaryText }}
                                    className="text-xl font-semibold mb-3 text-center"
                                >
                                    {column.heading}
                                </h3>
                                <p
                                    style={{ color: ab4cColors.secondaryText }}
                                    className="text-sm leading-relaxed mb-4 text-center"
                                >
                                    {column.description}
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {column.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
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

export default IconBasedThreeColumnLayout;
