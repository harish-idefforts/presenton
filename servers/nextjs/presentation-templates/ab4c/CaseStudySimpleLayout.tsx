import React from 'react';
import * as z from "zod";

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-case-study-simple';
export const layoutName = 'Simple Case Study';
export const layoutDescription = 'Simple, single-column case study template focused on narrative flow. Includes a central scenario quote, followed by distinct sections for challenge, analysis & strategy, resolution, and outcome. Ideal for concise problem-solution stories or high-level summaries without visuals.';

const caseStudySimpleLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Case Study: Global Supply Chain Disruption').meta({
        description: "Main title of the slide",
    }),
    subtitle: z.string().min(10).max(120).default('Navigating unexpected logistical challenges and import restrictions').meta({
        description: "Concise subtitle summarizing the case study's main focus or challenge",
    }),
    scenario: z.string().min(50).max(500).default('A large multinational electronics manufacturer faced severe delays in critical component deliveries due to unforeseen trade policy changes and natural disasters impacting key shipping routes. This threatened production timelines and international distribution.').meta({
            description: "Opening quote or a brief, impactful description of the core scenario or problem",
    }),
    challenge: z.object({
        heading: z.string().min(3).max(80).default('The Challenge').meta({
            description: "Heading for the challenge section",
        }),
        content: z.string().min(50).max(300).optional().default('Identify immediate actions to unblock shipments and long-term strategies to build resilience against future supply chain shocks. Ensure compliance with new, evolving regulations.').meta({
            description: "Content for the challenge section",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(4).optional().default([
            'Urgent need for alternative sourcing and logistics.',
            'Unclear interpretation of new trade regulations.',
            'Risk of significant financial penalties and customer dissatisfaction.'
        ]).meta({
            description: "Key bullet points outlining the challenges, limited to 2-4 items for clarity",
        }),
    }).meta({
        description: "Details for the challenge section",
    }),
    analysis: z.object({
        heading: z.string().min(3).max(80).default('Analysis & Strategy').meta({
            description: "Heading for the analysis section",
        }),
        bullets: z.array(z.string().min(10).max(200)).min(3).max(5).default([
            'Engaged with local trade experts to clarify new regulations.',
            'Diversified supplier base and identified new shipping partners.',
            'Implemented real-time supply chain monitoring and alert systems.',
            'Developed contingency plans for critical components.'
        ]).meta({
            description: "Key bullet points detailing the analysis and strategic approach, limited to 3-5 items",
        }),
    }).meta({
        description: "Details for the analysis section",
    }),
    resolution: z.object({
        heading: z.string().min(3).max(80).default('Resolution').meta({
            description: "Heading for the resolution section",
        }),
        bullets: z.array(z.string().min(10).max(200)).min(2).max(4).default([
            'Successful negotiation of temporary customs waivers.',
            'Rerouting of shipments via unaffected logistic corridors.',
            'Proactive communication with clients about revised delivery schedules.',
            'Updated internal compliance protocols and training.'
        ]).meta({
            description: "Key bullet points describing the actions taken or resolutions, limited to 2-4 items",
        }),
    }).meta({
        description: "Details for the resolution section",
    }),
    outcome: z.string().min(50).max(400).default('The manufacturer successfully navigated the crisis, avoiding major production halts and minimizing financial impact. The incident led to a more robust and resilient supply chain, with enhanced global trade compliance strategies in place. Client relationships were maintained through transparent communication.').meta({
        description: "Final summary of the case study's impact, results, and key learnings",
    }),
});

export const Schema = caseStudySimpleLayoutSchema;

export type CaseStudySimpleLayoutData = z.infer<typeof caseStudySimpleLayoutSchema>;

interface CaseStudySimpleLayoutProps {
    data?: Partial<CaseStudySimpleLayoutData>;
}

const CaseStudySimpleLayout: React.FC<CaseStudySimpleLayoutProps> = ({ data: slideData }) => {
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
                <div className="relative z-10 flex flex-col h-full px-12 pt-12 pb-8">
                    <h1
                        style={{ color: ab4cColors.primaryText }}
                        className="text-4xl lg:text-5xl font-bold text-center mb-4"
                    >
                        {slideData?.title || 'Case Study: Global Supply Chain Disruption'}
                    </h1>
                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-lg text-center mb-8"
                    >
                        {slideData?.subtitle || 'Navigating unexpected logistical challenges and import restrictions'}
                    </p>

                    <div
                        className="bg-gradient-to-r from-gray-100 to-white rounded-lg p-6 mb-8 text-center"
                        style={{ backgroundColor: ab4cColors.boxBackground, borderLeft: `5px solid ${ab4cColors.accent}` }}
                    >
                        <p style={{ color: ab4cColors.primaryText }} className="text-base italic">
                            "{slideData?.scenario || 'A large multinational electronics manufacturer faced severe delays...'}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1">
                        {/* Challenge */}
                        <div>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                {slideData?.challenge?.heading || 'The Challenge'}
                            </h2>
                            {slideData?.challenge?.content && (
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-3">
                                    {slideData.challenge.content}
                                </p>
                            )}
                            <ul className="list-disc pl-5 space-y-1">
                                {slideData?.challenge?.bullets?.map((bullet, index) => (
                                    <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Analysis */}
                        <div>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                {slideData?.analysis?.heading || 'Analysis & Strategy'}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                {slideData?.analysis?.bullets?.map((bullet, index) => (
                                    <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resolution */}
                        <div>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                {slideData?.resolution?.heading || 'Resolution'}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                {slideData?.resolution?.bullets?.map((bullet, index) => (
                                    <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Outcome */}
                        <div>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                Outcome
                            </h2>
                            <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                {slideData?.outcome || 'The manufacturer successfully navigated the crisis...'}
                            </p>
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

export default CaseStudySimpleLayout;
