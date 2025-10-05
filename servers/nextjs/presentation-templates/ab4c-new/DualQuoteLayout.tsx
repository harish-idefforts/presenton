import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-dual-quote';
export const layoutName = 'Dual Quote';
export const layoutDescription = 'Two side-by-side quote boxes or case studies for comparison. Perfect for before/after scenarios, comparative analysis, or parallel examples.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Comparative Analysis').meta({ description: "Main title. Max 8 words" }),
    subtitle: z.string().min(10).max(400).optional().meta({ description: "Optional subtitle. Max 20 words" }),
    leftBox: z.object({
        heading: z.string().min(3).max(50).meta({ description: "Left box heading. Max 6 words" }),
        quote: z.string().min(20).max(600).meta({ description: "Main quote or scenario. Max 30 words" }),
        keyLearning: z.string().min(3).max(40).optional().meta({ description: "Optional key learning label. Max 6 words" }),
        learningText: z.string().min(10).max(400).optional().meta({ description: "Optional learning description. Max 20 words" }),
    }).default({
        heading: 'Case Study 1: Supply Chain Disruption',
        quote: 'A major automotive manufacturer discovered that 30% of their suppliers were non-compliant with new environmental regulations, threatening production schedules worth £200 million.',
        keyLearning: 'Key Learning:',
        learningText: 'Early supplier engagement and cross-functional teamwork are essential for managing regulatory transitions affecting the supply chain.'
    }).meta({ description: "Left quote box content" }),
    rightBox: z.object({
        heading: z.string().min(3).max(50).meta({ description: "Right box heading. Max 6 words" }),
        quote: z.string().min(20).max(600).meta({ description: "Main quote or scenario. Max 30 words" }),
        keyLearning: z.string().min(3).max(40).optional().meta({ description: "Optional key learning label. Max 6 words" }),
        learningText: z.string().min(10).max(400).optional().meta({ description: "Optional learning description. Max 20 words" }),
    }).default({
        heading: 'Case Study 2: Documentation Error',
        quote: 'A pharmaceutical exporter faced £2.3 million in penalties due to incorrect product classifications on customs declarations. The error stemmed from miscommunication between departments.',
        keyLearning: 'Key Learning:',
        learningText: 'Clear communication protocols and verification procedures are critical for preventing costly documentation errors in regulatory compliance.'
    }).meta({ description: "Right quote box content" }),
});

export { Schema };
export type DualQuoteLayoutData = z.infer<typeof Schema>;

const DualQuoteLayout: React.FC<{ data?: Partial<DualQuoteLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-2">{slideData?.title || 'Comparative Analysis'}</h1>
                    {slideData?.subtitle && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData.subtitle}</p>
                    )}

                    <div className="flex gap-6 flex-1">
                        {/* Left Box */}
                        <div className="flex-1 p-6 rounded-lg border-l-4 flex flex-col" style={{ backgroundColor: ab4cColors.boxBackground, borderColor: ab4cColors.accent }}>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-lg font-bold mb-4">{slideData?.leftBox?.heading || ''}</h2>

                            <div className="mb-4">
                                <div className="relative pl-4">
                                    <div className="absolute left-0 top-0 text-4xl font-serif" style={{ color: ab4cColors.accent, opacity: 0.3 }}>"</div>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm italic leading-relaxed">
                                        {slideData?.leftBox?.quote || ''}
                                    </p>
                                </div>
                            </div>

                            {slideData?.leftBox?.learningText && (
                                <div className="mt-auto">
                                    <p style={{ color: ab4cColors.accent }} className="text-xs font-semibold mb-1">
                                        {slideData?.leftBox?.keyLearning || 'Key Learning:'}
                                    </p>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-xs">
                                        {slideData.leftBox.learningText}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right Box */}
                        <div className="flex-1 p-6 rounded-lg border-l-4 flex flex-col" style={{ backgroundColor: ab4cColors.boxBackground, borderColor: ab4cColors.accent }}>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-lg font-bold mb-4">{slideData?.rightBox?.heading || ''}</h2>

                            <div className="mb-4">
                                <div className="relative pl-4">
                                    <div className="absolute left-0 top-0 text-4xl font-serif" style={{ color: ab4cColors.accent, opacity: 0.3 }}>"</div>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm italic leading-relaxed">
                                        {slideData?.rightBox?.quote || ''}
                                    </p>
                                </div>
                            </div>

                            {slideData?.rightBox?.learningText && (
                                <div className="mt-auto">
                                    <p style={{ color: ab4cColors.accent }} className="text-xs font-semibold mb-1">
                                        {slideData?.rightBox?.keyLearning || 'Key Learning:'}
                                    </p>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-xs">
                                        {slideData.rightBox.learningText}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8" style={{ background: ab4cColors.background }}>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img src="/ab4c-new-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
                </div>
            </div>
        </>
    );
};

export default DualQuoteLayout;
