import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-two-column-text';
export const layoutName = 'Two Column Text';
export const layoutDescription = 'A two-column text layout with headings, descriptions, and bullet lists in each column. Use this for explaining foundational concepts, comparing regulations and impacts, presenting dual aspects of a topic, or showing cause and effect relationships. Perfect for detailed explanations with supporting points.';

const twoColumnTextSchema = z.object({
    title: z.string().min(5).max(100).default('Understanding the Foundations of Trade Compliance').meta({
        description: "Main topic title explaining what dual aspects or concepts are being presented",
    }),
    leftHeading: z.string().min(3).max(80).default('Key Compliance Regulations & Frameworks').meta({
        description: "Heading for left column - first aspect, category, or concept",
    }),
    leftContent: z.string().min(20).max(300).default('Trade compliance forms the backbone of international business operations, ensuring organisations adhere to complex regulatory frameworks that govern global commerce. Understanding these foundations is essential for all departments involved in international trade activities.').meta({
        description: "Explanatory paragraph providing context and overview for the left column topic",
    }),
    leftBullets: z.array(z.string().min(10).max(150)).min(3).max(8).default([
        'World Trade Organization (WTO) Agreements: Multilateral trade rules governing international commerce',
        'Customs regulations: Country-specific import/export requirements and procedures',
        'Export control laws: Restrictions on technology and goods transfers',
        'Anti-dumping measures: Protection against unfair pricing practices',
        'Economic sanctions: Trade restrictions based on foreign policy objectives'
    ]).meta({
        description: "Detailed bullet points supporting the left column topic (3-8 items)",
    }),
    rightHeading: z.string().min(3).max(80).default('Impact on Business Operations').meta({
        description: "Heading for right column - second aspect, impacts, or related concept",
    }),
    rightContent: z.string().min(20).max(300).default('Non-compliance can result in significant financial penalties, operational disruptions, and reputational damage. Understanding these regulations enables proactive risk management and strategic decision-making.').meta({
        description: "Explanatory paragraph providing context and overview for the right column topic",
    }),
    rightBullets: z.array(z.string().min(10).max(150)).min(3).max(8).default([
        'Financial penalties up to millions of pounds',
        'Shipment delays and supply chain disruptions',
        'Loss of import/export privileges',
        'Damage to business relationships and reputation',
        'Increased scrutiny from regulatory authorities'
    ]).meta({
        description: "Detailed bullet points supporting the right column topic (3-8 items)",
    })
});

export const Schema = twoColumnTextSchema;

export type TwoColumnTextData = z.infer<typeof twoColumnTextSchema>;

interface TwoColumnTextLayoutProps {
    data?: Partial<TwoColumnTextData>
}

const TwoColumnTextLayout: React.FC<TwoColumnTextLayoutProps> = ({ data: slideData }) => {
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
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Understanding the Foundations of Trade Compliance'}
                    </h1>

                    {/* Two Columns */}
                    <div className="flex gap-8">
                        {/* Left Column */}
                        <div className="flex-1">
                            <h2
                                className="text-2xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.leftHeading || 'Key Compliance Regulations & Frameworks'}
                            </h2>
                            <p
                                className="text-sm leading-relaxed mb-4"
                                style={{ color: "#6b5d52" }}
                            >
                                {slideData?.leftContent || 'Trade compliance forms the backbone of international business operations.'}
                            </p>
                            <ul className="space-y-2">
                                {slideData?.leftBullets && slideData.leftBullets.length > 0 ? (
                                    slideData.leftBullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-3 mt-1">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1">
                            <h2
                                className="text-2xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.rightHeading || 'Impact on Business Operations'}
                            </h2>
                            <p
                                className="text-sm leading-relaxed mb-4"
                                style={{ color: "#6b5d52" }}
                            >
                                {slideData?.rightContent || 'Non-compliance can result in significant financial penalties.'}
                            </p>
                            <ul className="space-y-2">
                                {slideData?.rightBullets && slideData.rightBullets.length > 0 ? (
                                    slideData.rightBullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-3 mt-1">•</span>
                                            <span>{bullet}</span>
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

export default TwoColumnTextLayout;
