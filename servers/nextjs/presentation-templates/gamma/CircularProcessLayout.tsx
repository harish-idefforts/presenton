import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-circular-process';
export const layoutName = 'Circular Process Diagram';
export const layoutDescription = 'A circular/cyclical process diagram with icons in the center circle and text descriptions positioned around it. Use this for continuous improvement cycles, cyclical processes, balanced frameworks, iterative methodologies, or interconnected concepts. Perfect for showing processes that loop or require ongoing iteration.';

const circularProcessSchema = z.object({
    title: z.string().min(5).max(100).default('Analytical Thinking for Compliance Professionals').meta({
        description: "Main title describing the cyclical process or framework being presented",
    }),
    subtitle: z.string().min(5).max(120).optional().default('Developing Critical Thinking Skills').meta({
        description: "Optional subtitle providing additional context about the process",
    }),
    description: z.string().min(30).max(500).default('Effective compliance requires sophisticated analytical skills to assess risks, evaluate alternatives, and make informed decisions that balance regulatory requirements with business objectives. Critical thinking enables professionals to identify potential compliance issues before they become costly problems.').meta({
        description: "Detailed description explaining the process and its importance",
    }),
    processSteps: z.array(z.object({
        position: z.number().int().min(1).max(6),
        icon: z.enum(['search', 'analyze', 'lightbulb', 'checkmark', 'refresh', 'users']).default('search'),
        heading: z.string().min(3).max(50),
        description: z.string().min(20).max(200)
    })).min(4).max(6).default([
        {
            position: 1,
            icon: 'search' as const,
            heading: 'Identify',
            description: 'Systematically identify potential compliance risks and regulatory requirements relevant to business operations.'
        },
        {
            position: 2,
            icon: 'analyze' as const,
            heading: 'Analyse',
            description: 'Evaluate the likelihood and potential impact of compliance risks using structured analytical frameworks.'
        },
        {
            position: 3,
            icon: 'lightbulb' as const,
            heading: 'Evaluate',
            description: 'Consider multiple solutions and their implications for both compliance and business objectives.'
        },
        {
            position: 4,
            icon: 'checkmark' as const,
            heading: 'Implement',
            description: 'Execute chosen solutions with appropriate monitoring and feedback mechanisms.'
        },
        {
            position: 5,
            icon: 'refresh' as const,
            heading: 'Review',
            description: 'Assess effectiveness of implemented solutions and adjust approaches based on outcomes and changing regulations.'
        }
    ]).meta({
        description: "Process steps arranged in circular pattern (4-6 steps) - each with position, icon, heading, and description",
    }),
    bottomText: z.string().min(20).max(300).optional().meta({
        description: "Optional concluding text about the iterative nature or benefits of the process",
    })
});

export const Schema = circularProcessSchema;

export type CircularProcessData = z.infer<typeof circularProcessSchema>;

interface CircularProcessLayoutProps {
    data?: Partial<CircularProcessData>
}

const CircularProcessLayout: React.FC<CircularProcessLayoutProps> = ({ data: slideData }) => {
    // Icon mapping
    const iconMap = {
        search: '🔍',
        analyze: '↔',
        lightbulb: '💡',
        checkmark: '✓',
        refresh: '⟲',
        users: '👥'
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
                <div className="relative z-10 h-full flex flex-col px-12 lg:px-16 pt-8 pb-24">
                    {/* Title */}
                    <h1
                        className="text-3xl sm:text-4xl font-bold mb-2"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Analytical Thinking for Compliance Professionals'}
                    </h1>

                    {/* Subtitle */}
                    {slideData?.subtitle && (
                        <h2
                            className="text-xl font-semibold mb-3"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.subtitle}
                        </h2>
                    )}

                    {/* Description */}
                    <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.description}
                    </p>

                    {/* Circular Diagram Layout */}
                    <div className="flex items-center justify-center relative">
                        {/* Center Circle */}
                        <div
                            className="w-48 h-48 rounded-full flex items-center justify-center"
                            style={{ background: "#e8e4dc" }}
                        >
                            <div className="text-center">
                                {slideData?.processSteps && slideData.processSteps.length > 0 && (
                                    <div className="flex items-center justify-center gap-2">
                                        {slideData.processSteps.slice(0, 4).map((step, idx) => (
                                            <span key={idx} className="text-2xl">
                                                {iconMap[step.icon] || iconMap.search}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Process Steps positioned around circle */}
                        {slideData?.processSteps && slideData.processSteps.length > 0 ? (
                            <div className="absolute inset-0 flex items-center justify-between">
                                {/* Left side steps */}
                                <div className="flex-1 pr-32 space-y-4">
                                    {slideData.processSteps
                                        .filter((_, idx) => idx % 2 === 0)
                                        .map((step, index) => (
                                            <div key={index} className="text-right">
                                                <h3
                                                    className="text-lg font-bold mb-1"
                                                    style={{ color: "#4a4035" }}
                                                >
                                                    {step.heading}
                                                </h3>
                                                <p
                                                    className="text-xs leading-relaxed"
                                                    style={{ color: "#6b5d52" }}
                                                >
                                                    {step.description}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* Right side steps */}
                                <div className="flex-1 pl-32 space-y-4">
                                    {slideData.processSteps
                                        .filter((_, idx) => idx % 2 !== 0)
                                        .map((step, index) => (
                                            <div key={index} className="text-left">
                                                <h3
                                                    className="text-lg font-bold mb-1"
                                                    style={{ color: "#4a4035" }}
                                                >
                                                    {step.heading}
                                                </h3>
                                                <p
                                                    className="text-xs leading-relaxed"
                                                    style={{ color: "#6b5d52" }}
                                                >
                                                    {step.description}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Bottom Text */}
                    {slideData?.bottomText && (
                        <p
                            className="text-xs leading-relaxed text-center mt-2"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.bottomText}
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

export default CircularProcessLayout;
