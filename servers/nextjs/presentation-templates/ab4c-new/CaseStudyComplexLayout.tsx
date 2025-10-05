import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-case-study-complex';
export const layoutName = 'Case Study Complex';
export const layoutDescription = 'Detailed case study layout with scenario, challenges, solutions, results callout, and metrics.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Complex Case Study').meta({
        description: "Main title. Max 8 words",
    }),
    scenarioText: z.string().min(20).max(400).default('Electronics manufacturer faced compliance challenges with new import regulations.').meta({
        description: "Scenario description. Max 20 words",
    }),
    scenarioImage: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a',
        __image_prompt__: 'Electronics manufacturing facility'
    }).meta({
        description: "Scenario image. Max 30 words",
    }),
    challenges: z.array(z.string().min(10).max(100)).min(2).max(4).default([
        'Complex tariff classifications for electronic components',
        'Multiple regulatory jurisdictions and requirements'
    ]).meta({
        description: "Challenge points. 2-4 items, max 12 words each",
    }),
    solutions: z.array(z.string().min(10).max(100)).min(2).max(4).default([
        'Deployed automated classification system',
        'Established compliance team and processes'
    ]).meta({
        description: "Solution points. 2-4 items, max 12 words each",
    }),
    resultsText: z.string().min(20).max(250).default('Achieved full regulatory compliance with improved operational efficiency.').meta({
        description: "Results summary. Max 15 words",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(10).meta({ description: "Metric value (e.g., 95%, 40%)" }),
        label: z.string().min(3).max(30).meta({ description: "Metric label. Max 4 words" }),
    })).min(2).max(3).default([
        { value: '95%', label: 'Compliance Rate' },
        { value: '40%', label: 'Time Reduction' }
    ]).meta({
        description: "Key metrics. 2-3 items",
    }),
});

export { Schema };
export type CaseStudyComplexLayoutData = z.infer<typeof Schema>;

interface CaseStudyComplexLayoutProps {
    data?: Partial<CaseStudyComplexLayoutData>;
}

const CaseStudyComplexLayout: React.FC<CaseStudyComplexLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-6">
                        {slideData?.title || 'Complex Case Study'}
                    </h1>

                    <div className="flex gap-6 mb-4">
                        <div className="flex-1">
                            <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">Scenario</h3>
                            <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-3">
                                {slideData?.scenarioText || ''}
                            </p>

                            <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">Challenges</h3>
                            <ul className="space-y-1 mb-3">
                                {slideData?.challenges?.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-2">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">Solutions</h3>
                            <ul className="space-y-1">
                                {slideData?.solutions?.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-2">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-64 h-40 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                            <img
                                src={slideData?.scenarioImage?.__image_url__ || ''}
                                alt={slideData?.scenarioImage?.__image_prompt__ || ''}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: '#d4f4dd' }}>
                        <p style={{ color: ab4cColors.primaryText }} className="text-sm font-semibold">
                            <span className="uppercase mr-2">RESULTS:</span>
                            {slideData?.resultsText || ''}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        {slideData?.metrics?.map((metric, idx) => (
                            <div key={idx} className="text-center p-4 rounded-lg" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                <div style={{ color: ab4cColors.accent }} className="text-3xl font-bold">
                                    {metric.value}
                                </div>
                                <div style={{ color: ab4cColors.secondaryText }} className="text-sm mt-1">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8" style={{ background: ab4cColors.background }}>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img src="/ab4c-new-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
                </div>
            </div>
        </>
    );
};

export default CaseStudyComplexLayout;
