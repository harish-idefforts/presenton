import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-two-column-boxes';
export const layoutName = 'Two Column Boxes';
export const layoutDescription = 'A slide layout featuring two side-by-side content boxes with headings and bullet points. Use this for training objectives and duration, comparing two concepts side-by-side, presenting goals and details, or showing contrasting information. Perfect for structured comparisons and dual-topic presentations.';

const twoColumnBoxesSchema = z.object({
    title: z.string().min(5).max(60).default('Training Objectives & Duration').meta({
        description: "Main slide title - clearly state the topic (keep under 60 chars)",
    }),
    leftBoxTitle: z.string().min(3).max(40).default('Primary Goals').meta({
        description: "Heading for left content box (under 40 chars)",
    }),
    leftBoxBullets: z.array(z.string().min(5).max(80)).min(3).max(6).default([
        'Enhance cross-departmental collaboration',
        'Develop effective communication skills',
        'Foster adaptability and problem-solving',
        'Strengthen attention to detail',
        'Cultivate collaborative mindset'
    ]).meta({
        description: "Left box bullet points (3-6 items, under 80 chars each)",
    }),
    rightBoxTitle: z.string().min(3).max(40).default('Training Details').meta({
        description: "Heading for right content box (under 40 chars)",
    }),
    rightBoxBullets: z.array(z.string().min(5).max(80)).min(3).max(6).default([
        'Duration: Full-day programme (8 hours)',
        'Format: Interactive workshops',
        'Participants: Cross-functional teams',
        'Materials: Digital resources',
        'Assessment: Knowledge quiz'
    ]).meta({
        description: "Right box bullet points (3-6 items, under 80 chars each)",
    }),
    footerDescription: z.string().min(20).max(180).optional().default('This training equips professionals with essential skills for effective cross-departmental collaboration and compliance management.').meta({
        description: "Optional summary text below boxes (keep under 180 chars)",
    })
});

export const Schema = twoColumnBoxesSchema;

export type TwoColumnBoxesData = z.infer<typeof twoColumnBoxesSchema>;

interface TwoColumnBoxesLayoutProps {
    data?: Partial<TwoColumnBoxesData>
}

const TwoColumnBoxesLayout: React.FC<TwoColumnBoxesLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Training Objectives & Duration'}
                    </h1>

                    {/* Two Column Boxes */}
                    <div className="flex gap-6">
                        {/* Left Box */}
                        <div
                            className="flex-1 rounded-lg p-5 shadow-sm"
                            style={{ background: "#e8e4dc" }}
                        >
                            <h2
                                className="text-xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.leftBoxTitle || 'Primary Goals'}
                            </h2>
                            <ul className="space-y-2">
                                {slideData?.leftBoxBullets && slideData.leftBoxBullets.length > 0 ? (
                                    slideData.leftBoxBullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>

                        {/* Right Box */}
                        <div
                            className="flex-1 rounded-lg p-5 shadow-sm"
                            style={{ background: "#e8e4dc" }}
                        >
                            <h2
                                className="text-xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.rightBoxTitle || 'Training Details'}
                            </h2>
                            <ul className="space-y-2">
                                {slideData?.rightBoxBullets && slideData.rightBoxBullets.length > 0 ? (
                                    slideData.rightBoxBullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>
                    </div>

                    {/* Footer Description */}
                    {slideData?.footerDescription && (
                        <div className="mt-4">
                            <p
                                className="text-xs leading-relaxed"
                                style={{ color: "#6b5d52" }}
                            >
                                {slideData.footerDescription}
                            </p>
                        </div>
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

export default TwoColumnBoxesLayout;
