import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'gamma-case-study-complex';
export const layoutName = 'Case Study (Complex)';
export const layoutDescription = 'A comprehensive case study layout with scenario background, challenges, solutions, highlighted results, and quantitative metrics. Use this for detailed case studies with measurable outcomes, success stories with data, or complex scenarios requiring thorough analysis. Perfect for showing concrete results and impact.';

const caseStudyComplexSchema = z.object({
    title: z.string().min(5).max(80).default('Case Study: Electronics Import Compliance').meta({
        description: "Main case study title with specific company or scenario name",
    }),
    scenarioHeading: z.string().min(3).max(50).default('Scenario Background').meta({
        description: "Heading for scenario section - typically 'Background', 'Context', or 'Scenario'",
    }),
    scenarioText: z.string().min(30).max(150).default('TechCorp imports consumer electronics from Asia. The company faced compliance challenges related to classification, FCC requirements, and tariffs.').meta({
        description: "Brief scenario background explaining the situation and context (keep concise)",
    }),
    scenarioImage: ImageSchema.optional().default({
        __image_url__: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80',
        __image_prompt__: 'Smartphones and electronics on desk with compliance documents'
    }).meta({
        description: "Optional scenario image",
    }),
    challengesHeading: z.string().min(3).max(50).default('Compliance Challenges Identified').meta({
        description: "Challenges section heading",
    }),
    challengesBullets: z.array(z.string().min(10).max(80)).min(2).max(4).default([
        'Multiple products required precise HTS classification',
        'Electronic devices needed FCC authorization and labeling',
        'Section 301 tariffs required origin analysis',
        'Supply chain documentation gaps'
    ]).meta({
        description: "Challenges bullet points (keep concise - under 80 characters)",
    }),
    solutionsHeading: z.string().min(3).max(50).default('Solutions Implemented').meta({
        description: "Solutions section heading",
    }),
    solutionsBullets: z.array(z.string().min(10).max(80)).min(2).max(4).default([
        'Classification review with binding ruling requests',
        'FCC compliance program with authorization tracking',
        'Supply chain diversification to minimize tariffs',
        'Enhanced documentation for origin determination'
    ]).meta({
        description: "Solutions bullet points (keep concise - under 80 characters)",
    }),
    resultsText: z.string().min(20).max(120).default('TechCorp achieved 15% duty savings, reduced examinations by 50%, and avoided penalties.').meta({
        description: "Brief summary of key results achieved - displayed in highlighted callout box",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(20),
        label: z.string().min(3).max(40),
        description: z.string().min(10).max(60)
    })).min(2).max(4).default([
        {
            value: '15%',
            label: 'Duty Savings',
            description: 'Savings through proper classification'
        },
        {
            value: '50%',
            label: 'Examination Reduction',
            description: 'Reduced customs examinations'
        },
        {
            value: '$0',
            label: 'Penalties Avoided',
            description: 'Zero penalties through compliance'
        }
    ]).meta({
        description: "Quantitative metrics showing measurable outcomes - each with value, label, and brief description (2-4 metrics for optimal display, keep descriptions under 60 chars)",
    })
});

export const Schema = caseStudyComplexSchema;

export type CaseStudyComplexData = z.infer<typeof caseStudyComplexSchema>;

interface CaseStudyComplexLayoutProps {
    data?: Partial<CaseStudyComplexData>
}

const CaseStudyComplexLayout: React.FC<CaseStudyComplexLayoutProps> = ({ data: slideData }) => {
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
                <div className="relative z-10 h-full flex flex-col px-12 lg:px-16 pt-6 pb-24">
                    {/* Title */}
                    <h1
                        className="text-2xl sm:text-3xl font-bold mb-2"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Case Study: Electronics Import Compliance'}
                    </h1>

                    {/* Upper Section - Scenario and Image */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-[2]">
                            <h2
                                className="text-base font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.scenarioHeading || 'Scenario Background'}
                            </h2>
                            <p
                                className="text-xs leading-relaxed"
                                style={{ color: "#6b5d52" }}
                            >
                                {slideData?.scenarioText}
                            </p>
                        </div>
                        {slideData?.scenarioImage?.__image_url__ && (
                            <div className="flex-1 rounded-lg overflow-hidden shadow-md max-h-24">
                                <img
                                    src={slideData.scenarioImage.__image_url__}
                                    alt={slideData.scenarioImage.__image_prompt__ || 'Scenario'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Middle Section - Challenges and Solutions */}
                    <div className="flex gap-4 mb-3">
                        {/* Challenges */}
                        <div className="flex-1">
                            <h2
                                className="text-base font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.challengesHeading || 'Compliance Challenges Identified'}
                            </h2>
                            <ul className="space-y-1">
                                {slideData?.challengesBullets && slideData.challengesBullets.length > 0 ? (
                                    slideData.challengesBullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-xs leading-snug"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-1.5 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="flex-1">
                            <h2
                                className="text-base font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.solutionsHeading || 'Solutions Implemented'}
                            </h2>
                            <ul className="space-y-1">
                                {slideData?.solutionsBullets && slideData.solutionsBullets.length > 0 ? (
                                    slideData.solutionsBullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-xs leading-snug"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-1.5 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>
                    </div>

                    {/* Results Callout */}
                    <div
                        className="p-3 mb-4 rounded-lg border-l-4"
                        style={{ background: "#d4f4dd", borderColor: "#22c55e" }}
                    >
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 text-base">✓</span>
                            <p
                                className="text-xs font-semibold leading-relaxed"
                                style={{ color: "#166534" }}
                            >
                                {slideData?.resultsText}
                            </p>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex gap-4">
                        {slideData?.metrics && slideData.metrics.length > 0 ? (
                            slideData.metrics.map((metric, index) => (
                                <div key={index} className="flex-1 text-center">
                                    <div
                                        className="text-3xl font-bold mb-1"
                                        style={{ color: "#4a4035" }}
                                    >
                                        {metric.value}
                                    </div>
                                    <div
                                        className="text-sm font-semibold mb-1"
                                        style={{ color: "#4a4035" }}
                                    >
                                        {metric.label}
                                    </div>
                                    <div
                                        className="text-xs leading-relaxed"
                                        style={{ color: "#6b5d52" }}
                                    >
                                        {metric.description}
                                    </div>
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

export default CaseStudyComplexLayout;
