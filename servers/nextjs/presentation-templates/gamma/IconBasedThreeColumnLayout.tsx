import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-icon-three-column';
export const layoutName = 'Icon-Based Three Column';
export const layoutDescription = 'A three-column layout with icon-based sections, each featuring a large icon, heading, description paragraph, and bullet points. Use this for presenting tools, frameworks, systems, methods, verification processes, or technology solutions. Perfect for structured categorizations requiring visual icons rather than photographs.';

const iconBasedThreeColumnSchema = z.object({
    title: z.string().min(5).max(100).default('Checklists, Audits, and Verification Methods').meta({
        description: "Main title describing the category of tools, systems, or frameworks being presented",
    }),
    description: z.string().min(20).max(300).optional().meta({
        description: "Optional introductory paragraph providing context for the three items",
    }),
    columns: z.array(z.object({
        icon: z.enum(['checklist', 'audit', 'search', 'database', 'ai', 'star', 'shield', 'globe', 'users', 'settings']).default('checklist'),
        heading: z.string().min(3).max(80),
        description: z.string().min(20).max(300),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6)
    })).length(3).default([
        {
            icon: 'checklist' as const,
            heading: 'Standardised Checklists',
            description: 'Comprehensive checklists ensure consistent review processes across all compliance activities. These tools reduce reliance on memory and experience, providing structured approaches that capture all essential requirements.',
            bullets: [
                'Pre-shipment verification checklists',
                'Document review protocols',
                'Customer communication verification',
                'Regulatory change implementation checklists'
            ]
        },
        {
            icon: 'audit' as const,
            heading: 'Regular Audit Procedures',
            description: 'Systematic audits identify potential compliance gaps before they become violations. Regular audit schedules ensure continuous improvement in compliance accuracy and effectiveness.',
            bullets: [
                'Monthly documentation audits',
                'Quarterly process reviews',
                'Annual comprehensive assessments',
                'Spot checks on high-risk activities'
            ]
        },
        {
            icon: 'search' as const,
            heading: 'Multi-Level Verification',
            description: 'Implementing multiple verification points creates redundancy that catches errors before they impact compliance. These systems balance thoroughness with operational efficiency.',
            bullets: [
                'Peer review processes',
                'Supervisor approval requirements',
                'System-generated alerts',
                'External verification for high-risk activities'
            ]
        }
    ]).meta({
        description: "Exactly three columns - each with icon, heading, description, and bullet points representing tools, systems, or frameworks",
    }),
    footerText: z.string().min(20).max(400).optional().meta({
        description: "Optional summary or concluding remarks about the tools/systems presented",
    })
});

export const Schema = iconBasedThreeColumnSchema;

export type IconBasedThreeColumnData = z.infer<typeof iconBasedThreeColumnSchema>;

interface IconBasedThreeColumnLayoutProps {
    data?: Partial<IconBasedThreeColumnData>
}

const IconBasedThreeColumnLayout: React.FC<IconBasedThreeColumnLayoutProps> = ({ data: slideData }) => {
    // Icon mapping to simple emoji/symbols
    const iconMap = {
        checklist: '☰',
        audit: 'AD',
        search: '🔍',
        database: '💾',
        ai: 'AI',
        star: '⭐',
        shield: '🛡️',
        globe: '🌐',
        users: '👥',
        settings: '⚙️'
    };

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
                        {slideData?.title || 'Checklists, Audits, and Verification Methods'}
                    </h1>

                    {/* Description */}
                    {slideData?.description && (
                        <p
                            className="text-sm leading-relaxed mb-5"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.description}
                        </p>
                    )}

                    {/* Three Columns */}
                    <div className="flex gap-6">
                        {slideData?.columns && slideData.columns.length === 3 ? (
                            slideData.columns.map((column, index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-lg p-5"
                                    style={{ background: "#e8e4dc" }}
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl font-bold"
                                        style={{ background: "#6b5d52", color: "#f5f5f0" }}
                                    >
                                        {iconMap[column.icon] || iconMap.checklist}
                                    </div>

                                    {/* Heading */}
                                    <h2
                                        className="text-xl font-bold mb-3"
                                        style={{ color: "#4a4035" }}
                                    >
                                        {column.heading}
                                    </h2>

                                    {/* Description */}
                                    <p
                                        className="text-xs leading-relaxed mb-3"
                                        style={{ color: "#6b5d52" }}
                                    >
                                        {column.description}
                                    </p>

                                    {/* Bullets */}
                                    <ul className="space-y-1">
                                        {column.bullets.map((bullet, bIndex) => (
                                            <li
                                                key={bIndex}
                                                className="flex items-start text-xs leading-relaxed"
                                                style={{ color: "#6b5d52" }}
                                            >
                                                <span className="mr-2 mt-0.5">•</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : null}
                    </div>

                    {/* Footer Text */}
                    {slideData?.footerText && (
                        <p
                            className="text-xs leading-relaxed mt-4"
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

export default IconBasedThreeColumnLayout;
