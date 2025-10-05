import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-case-study-complex';
export const layoutName = 'Complex Case Study';
export const layoutDescription = 'Comprehensive two-column case study template designed for in-depth analysis. Features a left column for scenario (with image), challenges, and solutions, and a right column for key results (callout box) and performance metrics (2x2 grid). Ideal for detailed project outcomes, problem-solution narratives, or business impact analysis.';

const caseStudyComplexLayoutSchema = z.object({
    title: z.string().min(3).max(80).default('Case Study: Electronics Import Compliance').meta({
        description: "Main, impactful title for the complex case study slide",
    }),
    scenario: z.object({
        heading: z.string().min(3).max(80).default('The Scenario: Global Electronics Trade').meta({
            description: "Heading for the scenario section",
        }),
        text: z.string().min(50).max(400).default('A large electronics distributor faced significant fines due to misclassification of imported components, leading to underpayment of duties. The issue was compounded by fragmented data and lack of clarity in regional customs regulations.').meta({
            description: "Detailed description of the scenario",
        }),
        image: ImageSchema.default({
            __image_url__: 'https://images.unsplash.com/photo-1593642702821-c1e483e0e7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
            __image_prompt__: 'Warehouse full of electronic components and boxes, logistics and supply chain'
        }).meta({
            description: "Illustrative image depicting the case study scenario, such as a warehouse or logistics",
        }),
    }).meta({
        description: "Details for the scenario section",
    }),
    challenges: z.object({
        heading: z.string().min(3).max(80).default('Challenges Faced').meta({
            description: "Heading for the challenges section",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(3).max(5).default([
            'Inaccurate HS code classification for complex electronic parts.',
            'Disparate data sources across global operations.',
            'Lack of real-time visibility into customs declarations.',
            'Evolving country-specific import tariffs and regulations.'
        ]).meta({
            description: "Bullet points detailing the challenges",
        }),
    }).meta({
        description: "Details for the challenges section",
    }),
    solutions: z.object({
        heading: z.string().min(3).max(80).default('Solutions Implemented').meta({
            description: "Heading for the solutions section",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(3).max(5).default([
            'Centralized HS code database with AI-powered classification suggestions.',
            'Integrated supply chain management system for unified data.',
            'Automated customs declaration review and submission process.',
            'Regular training and compliance workshops for logistics teams.'
        ]).meta({
            description: "Bullet points detailing the solutions",
        }),
    }).meta({
        description: "Details for the solutions section",
    }),
    results: z.object({
        text: z.string().min(50).max(300).default('Through strategic investment in compliance technology and training, the distributor successfully remediated past issues and established a robust framework for future import operations.').meta({
            description: "Summary text for the results",
        }),
        type: z.enum(["success", "warning", "info"]).default("success").meta({
            description: "Type of result (success, warning, info) for styling",
        }),
    }).meta({
        description: "Details for the results callout section",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(20).meta({
            description: "Metric value (e.g., 98%, $2M)",
        }),
        label: z.string().min(2).max(50).meta({
            description: "Label for the metric",
        }),
        description: z.string().min(20).max(150).optional().meta({
            description: "Optional description for the metric",
        }),
    })).min(2).max(4).default([
        {
            value: '98%',
            label: 'Compliance Accuracy',
            description: 'Achieved a near-perfect rate in customs declarations across all imports.',
        },
        {
            value: '25%',
            label: 'Reduction in Fines',
            description: 'Significant decrease in penalties due to minimized classification errors.',
        },
        {
            value: '$1.5M',
            label: 'Cost Savings',
            description: 'Avoided potential fines and streamlined duty payments.',
        },
    ]).meta({
        description: "A grid of 2 to 4 quantifiable business performance metrics, each with a value, label, and optional detailed description to highlight impact",
    }),
});

export const Schema = caseStudyComplexLayoutSchema;

export type CaseStudyComplexLayoutData = z.infer<typeof caseStudyComplexLayoutSchema>;

interface CaseStudyComplexLayoutProps {
    data?: Partial<CaseStudyComplexLayoutData>;
}

const CaseStudyComplexLayout: React.FC<CaseStudyComplexLayoutProps> = ({ data: slideData }) => {
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
                <div className="relative z-10 flex flex-col h-full px-12 pt-10 pb-8">
                    <h1
                        style={{ color: ab4cColors.primaryText }}
                        className="text-4xl lg:text-5xl font-bold text-center mb-6"
                    >
                        {slideData?.title || 'Case Study: Electronics Import Compliance'}
                    </h1>

                    <div className="grid grid-cols-2 gap-x-10 flex-1">
                        {/* Left Column - Scenario, Challenges, Solutions */}
                        <div className="flex flex-col space-y-6">
                            {/* Scenario */}
                            <div>
                                <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                    {slideData?.scenario?.heading || 'The Scenario'}
                                </h2>
                                <div className="rounded-lg overflow-hidden mb-4 shadow-sm" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                    <img
                                        src={slideData?.scenario?.image?.__image_url__ || ''}
                                        alt={slideData?.scenario?.image?.__image_prompt__ || slideData?.scenario?.heading || ''}
                                        className="w-full h-32 object-cover"
                                    />
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm p-4">
                                        {slideData?.scenario?.text || 'A large electronics distributor faced...'}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Challenges */}
                            <div>
                                <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                    {slideData?.challenges?.heading || 'Challenges Faced'}
                                </h2>
                                <ul className="list-disc pl-5 space-y-1">
                                    {slideData?.challenges?.bullets?.map((bullet, index) => (
                                        <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Solutions */}
                            <div>
                                <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                    {slideData?.solutions?.heading || 'Solutions Implemented'}
                                </h2>
                                <ul className="list-disc pl-5 space-y-1">
                                    {slideData?.solutions?.bullets?.map((bullet, index) => (
                                        <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column - Results & Metrics */}
                        <div className="flex flex-col space-y-6 justify-center">
                            {/* Results Callout */}
                            <div
                                className="rounded-lg p-6 shadow-md"
                                style={{
                                    backgroundColor: slideData?.results?.type === 'success'
                                        ? '#d4f4dd' // Light green
                                        : slideData?.results?.type === 'warning'
                                            ? '#fdf2d5' // Light yellow/orange
                                            : '#d4e9f7', // Light blue
                                    borderLeft: `5px solid ${slideData?.results?.type === 'success'
                                        ? '#68D391'
                                        : slideData?.results?.type === 'warning'
                                            ? '#F9A825'
                                            : '#6BBFE7'}`,
                                }}
                            >
                                <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                    Key Results
                                </h2>
                                <p style={{ color: ab4cColors.primaryText }} className="text-base">
                                    {slideData?.results?.text || 'Through strategic investment...'}
                                </p>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {slideData?.metrics?.map((metric, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm"
                                        style={{ backgroundColor: ab4cColors.boxBackground }}
                                    >
                                        <div style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-1">
                                            {metric.value}
                                        </div>
                                        <div style={{ color: ab4cColors.secondaryText }} className="text-sm text-center font-medium mb-2">
                                            {metric.label}
                                        </div>
                                        {metric.description && (
                                            <p style={{ color: ab4cColors.secondaryText }} className="text-xs text-center">
                                                {metric.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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

export default CaseStudyComplexLayout;
