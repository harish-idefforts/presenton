import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-statistics-highlight';
export const layoutName = 'Statistics Highlight';
export const layoutDescription = 'Large impactful statistics or numbers with descriptions. Perfect for emphasizing key metrics, data points, or important figures.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('The Critical Importance of Precision').meta({ description: "Main title" }),
    subtitle: z.string().min(10).max(600).optional().meta({ description: "Optional subtitle or introductory paragraph providing context" }),
    statistics: z.array(z.object({
        number: z.string().min(1).max(30).meta({ description: "Large number or statistic (e.g., '£45M', '73%', '15min')" }),
        label: z.string().min(3).max(200).meta({ description: "Stat label or heading" }),
        description: z.string().min(10).max(250).meta({ description: "Detailed description explaining the statistic" }),
    })).min(2).max(3).default([
        { number: '£45M', label: 'Average Annual Penalty', description: 'Cost of compliance failures for major UK importers due to documentation errors and procedural oversights' },
        { number: '73%', label: 'Human Error Factor', description: 'Percentage of compliance incidents attributed to attention-to-detail failures rather than system inadequacies' },
        { number: '15min', label: 'Review Time Investment', description: 'Average additional time required for thorough document review that prevents costly compliance errors' }
    ]).meta({ description: "Key statistics. 2-3 items with numbers, labels, and descriptions" }),
    footerText: z.string().max(600).optional().meta({ description: "Optional footer paragraph summarizing key takeaways or implications" }),
});

export { Schema };
export type StatisticsHighlightLayoutData = z.infer<typeof Schema>;

const StatisticsHighlightLayout: React.FC<{ data?: Partial<StatisticsHighlightLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-2">{slideData?.title || 'Key Compliance Metrics'}</h1>
                    {slideData?.subtitle && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-8">{slideData.subtitle}</p>
                    )}

                    <div className={`flex gap-8 flex-1 items-center ${slideData?.statistics?.length === 2 ? 'justify-center' : 'justify-between'}`}>
                        {slideData?.statistics?.map((stat, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center text-center">
                                <div style={{ color: ab4cColors.accent }} className="text-7xl font-bold mb-3">{stat.number}</div>
                                <h3 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">{stat.label}</h3>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm leading-relaxed max-w-xs">{stat.description}</p>
                            </div>
                        ))}
                    </div>

                    {slideData?.footerText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-4">{slideData.footerText}</p>
                    )}
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

export default StatisticsHighlightLayout;
