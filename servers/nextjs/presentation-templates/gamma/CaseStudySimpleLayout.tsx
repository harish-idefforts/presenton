import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-case-study-simple';
export const layoutName = 'Case Study (Simple)';
export const layoutDescription = 'A structured case study layout with scenario quote, challenge, analysis, resolution, and outcome sections. Use this for presenting real-world examples, compliance scenarios, problem-solving stories, or practical applications. Perfect for illustrating how concepts are applied in practice.';

const caseStudySimpleSchema = z.object({
    title: z.string().min(5).max(80).default('Case Study').meta({
        description: "Main case study title - typically 'Case Study' followed by topic or company name",
    }),
    subtitle: z.string().min(5).max(120).default('Identifying and Resolving Compliance Ambiguities').meta({
        description: "Specific case study topic or focus area being examined",
    }),
    scenario: z.string().min(30).max(500).default('A UK-based electronics manufacturer received conflicting guidance from different regulatory bodies regarding the classification of a new product containing dual-use technology. The ambiguity threatened to delay a major export contract worth £2.5 million.').meta({
        description: "Opening scenario description setting up the case study context",
    }),
    challengeHeading: z.string().min(3).max(50).default('The Challenge').meta({
        description: "Challenge section heading",
    }),
    challengeContent: z.string().min(20).max(400).default('Multiple regulatory frameworks appeared to apply to the product, each with different requirements and timelines. The compliance team needed to resolve these ambiguities quickly whilst ensuring full regulatory adherence.').meta({
        description: "Challenge description",
    }),
    analysisHeading: z.string().min(3).max(50).default('Initial Analysis').meta({
        description: "Analysis section heading",
    }),
    analysisBullets: z.array(z.string().min(10).max(200)).min(3).max(6).default([
        'Export control regulations suggested dual-use classification',
        'Customs authorities indicated standard commercial classification',
        'Industry trade association provided third interpretation',
        'Customer required definitive classification within 10 days',
        'Potential penalties ranged from warnings to export restrictions'
    ]).meta({
        description: "Analysis bullet points",
    }),
    resolutionHeading: z.string().min(3).max(50).default('Resolution Process').meta({
        description: "Resolution section heading",
    }),
    resolutionBullets: z.array(z.string().min(10).max(200)).min(3).max(6).default([
        'Assembled cross-functional team including legal, technical, and commercial expertise',
        'Conducted systematic analysis of all applicable regulations',
        'Sought formal clarification from primary regulatory authority',
        'Developed conservative compliance approach pending clarification',
        'Implemented enhanced documentation and monitoring procedures'
    ]).meta({
        description: "Resolution bullet points",
    }),
    outcomeHeading: z.string().min(3).max(50).default('Outcome:').meta({
        description: "Outcome section heading",
    }),
    outcome: z.string().min(30).max(500).default('The structured analytical approach enabled successful resolution within the customer timeline, avoided regulatory violations, and established protocols for similar future situations. The experience highlighted the importance of cross-departmental collaboration in resolving complex compliance challenges.').meta({
        description: "Outcome description",
    })
});

export const Schema = caseStudySimpleSchema;

export type CaseStudySimpleData = z.infer<typeof caseStudySimpleSchema>;

interface CaseStudySimpleLayoutProps {
    data?: Partial<CaseStudySimpleData>
}

const CaseStudySimpleLayout: React.FC<CaseStudySimpleLayoutProps> = ({ data: slideData }) => {
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
                        className="text-4xl sm:text-5xl font-bold mb-2"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Case Study'}
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className="text-2xl font-semibold mb-4"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.subtitle || 'Identifying and Resolving Compliance Ambiguities'}
                    </h2>

                    {/* Scenario Quote Box */}
                    <div
                        className="p-4 mb-4 border-l-4 rounded"
                        style={{ background: "#e8e4dc", borderColor: "#6b5d52" }}
                    >
                        <p
                            className="text-sm italic leading-relaxed"
                            style={{ color: "#4a4035" }}
                        >
                            "{slideData?.scenario}"
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Challenge */}
                        <div>
                            <h3
                                className="text-xl font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.challengeHeading || 'The Challenge'}
                            </h3>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#6b5d52" }}
                            >
                                {slideData?.challengeContent}
                            </p>
                        </div>

                        {/* Analysis */}
                        <div>
                            <h3
                                className="text-xl font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.analysisHeading || 'Initial Analysis'}
                            </h3>
                            <ul className="space-y-1">
                                {slideData?.analysisBullets && slideData.analysisBullets.length > 0 ? (
                                    slideData.analysisBullets.map((bullet, index) => (
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

                        {/* Resolution */}
                        <div>
                            <h3
                                className="text-xl font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.resolutionHeading || 'Resolution Process'}
                            </h3>
                            <ul className="space-y-1">
                                {slideData?.resolutionBullets && slideData.resolutionBullets.length > 0 ? (
                                    slideData.resolutionBullets.map((bullet, index) => (
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

                        {/* Outcome */}
                        <div>
                            <h3
                                className="text-xl font-bold mb-2"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.outcomeHeading || 'Outcome:'}
                            </h3>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#6b5d52" }}
                            >
                                {slideData?.outcome}
                            </p>
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

export default CaseStudySimpleLayout;
