import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-three-box-grid';
export const layoutName = 'Three-Box Simple Grid';
export const layoutDescription = 'A clean three-column grid layout with equal boxes containing headings, descriptions, and bullet points. Use this for presenting three categories, types, sources, challenges, or approaches. Perfect for simple categorizations and grouped information without requiring visual elements.';

const threeBoxGridSchema = z.object({
    title: z.string().min(5).max(100).default('Common Sources of Misinterpretation').meta({
        description: "Main title describing the three categories, types, or sources being presented",
    }),
    boxes: z.array(z.object({
        heading: z.string().min(3).max(80),
        description: z.string().min(20).max(300),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6)
    })).length(3).default([
        {
            heading: 'Regulatory Language Complexity',
            description: 'Legal terminology and technical jargon can create confusion across departments. Complex regulatory language often contains nuanced requirements that require careful interpretation and translation into operational procedures.',
            bullets: [
                'Ambiguous terminology in regulations',
                'Multiple interpretations of single requirements',
                'Cross-referencing between different regulatory frameworks'
            ]
        },
        {
            heading: 'Communication Gaps',
            description: 'Insufficient communication between departments leads to incomplete understanding of compliance requirements. This often results in operational decisions that inadvertently violate regulatory standards.',
            bullets: [
                'Lack of regular compliance updates',
                'Inconsistent messaging across teams',
                'Absence of feedback mechanisms'
            ]
        },
        {
            heading: 'Documentation Inconsistencies',
            description: 'Inconsistent documentation practices create opportunities for misinterpretation and non-compliance. Standardised documentation ensures consistent understanding across all departments.',
            bullets: [
                'Varying document formats and templates',
                'Incomplete or outdated procedures',
                'Lack of version control systems'
            ]
        }
    ]).meta({
        description: "Exactly three boxes - each with heading, description paragraph, and bullet points representing categories, types, or sources",
    })
});

export const Schema = threeBoxGridSchema;

export type ThreeBoxGridData = z.infer<typeof threeBoxGridSchema>;

interface ThreeBoxGridLayoutProps {
    data?: Partial<ThreeBoxGridData>
}

const ThreeBoxGridLayout: React.FC<ThreeBoxGridLayoutProps> = ({ data: slideData }) => {
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
                        className="text-4xl sm:text-5xl font-bold mb-8"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Common Sources of Misinterpretation'}
                    </h1>

                    {/* Three Boxes Grid */}
                    <div className="flex gap-6">
                        {slideData?.boxes && slideData.boxes.length === 3 ? (
                            slideData.boxes.map((box, index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-lg p-6 border-l-4"
                                    style={{
                                        background: "#e8e4dc",
                                        borderColor: "#6b5d52"
                                    }}
                                >
                                    {/* Heading */}
                                    <h2
                                        className="text-xl font-bold mb-3"
                                        style={{ color: "#4a4035" }}
                                    >
                                        {box.heading}
                                    </h2>

                                    {/* Description */}
                                    <p
                                        className="text-sm leading-relaxed mb-4"
                                        style={{ color: "#6b5d52" }}
                                    >
                                        {box.description}
                                    </p>

                                    {/* Bullets */}
                                    <ul className="space-y-2">
                                        {box.bullets.map((bullet, bIndex) => (
                                            <li
                                                key={bIndex}
                                                className="flex items-start text-sm leading-relaxed"
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

export default ThreeBoxGridLayout;
