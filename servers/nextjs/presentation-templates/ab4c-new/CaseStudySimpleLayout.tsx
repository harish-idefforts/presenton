import React from 'react';
import * as z from "zod";

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-case-study-simple';
export const layoutName = 'Case Study Simple';
export const layoutDescription = 'Basic case study layout with scenario, challenge, analysis, resolution, and outcome sections.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Case Study').meta({
        description: "Main title. Max 8 words",
    }),
    subtitle: z.string().min(5).max(200).default('Import Documentation Error').meta({
        description: "Case study subtitle. Max 10 words",
    }),
    scenario: z.string().min(30).max(600).default('A manufacturing company faced penalties due to incorrect import documentation for raw materials.').meta({
        description: "Opening scenario description. Max 30 words",
    }),
    challengeHeading: z.string().min(3).max(40).default('The Challenge').meta({
        description: "Challenge section heading. Max 5 words",
    }),
    challengePoints: z.array(z.string().min(10).max(250)).min(2).max(4).default([
        'Incomplete product descriptions on commercial invoices',
        'Missing required certifications and compliance documents'
    ]).meta({
        description: "Challenge points. 2-4 items, max 15 words each",
    }),
    resolutionHeading: z.string().min(3).max(40).default('The Resolution').meta({
        description: "Resolution section heading. Max 5 words",
    }),
    resolutionPoints: z.array(z.string().min(10).max(250)).min(2).max(4).default([
        'Implemented comprehensive documentation checklist',
        'Established review process before shipment'
    ]).meta({
        description: "Resolution points. 2-4 items, max 15 words each",
    }),
    outcome: z.string().min(20).max(400).default('Zero documentation errors in subsequent imports, resulting in faster clearance times.').meta({
        description: "Final outcome. Max 20 words",
    }),
});

export { Schema };
export type CaseStudySimpleLayoutData = z.infer<typeof Schema>;

interface CaseStudySimpleLayoutProps {
    data?: Partial<CaseStudySimpleLayoutData>;
}

const CaseStudySimpleLayout: React.FC<CaseStudySimpleLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-2">
                        {slideData?.title || 'Case Study'}
                    </h1>
                    <h2 style={{ color: ab4cColors.secondaryText }} className="text-2xl mb-6">
                        {slideData?.subtitle || 'Import Documentation Error'}
                    </h2>

                    <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: ab4cColors.boxBackground }}>
                        <p style={{ color: ab4cColors.secondaryText }} className="text-base italic">
                            "{slideData?.scenario || ''}"
                        </p>
                    </div>

                    <div className="flex gap-8 flex-1">
                        <div className="flex-1">
                            <h3 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                {slideData?.challengeHeading || 'The Challenge'}
                            </h3>
                            <ul className="space-y-2">
                                {slideData?.challengePoints?.map((point, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-2 mt-1">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1">
                            <h3 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                {slideData?.resolutionHeading || 'The Resolution'}
                            </h3>
                            <ul className="space-y-2">
                                {slideData?.resolutionPoints?.map((point, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span style={{ color: ab4cColors.accent }} className="mr-2 mt-1">•</span>
                                        <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg mt-4" style={{ backgroundColor: '#d4f4dd', borderLeft: `4px solid #4caf50` }}>
                        <p style={{ color: ab4cColors.primaryText }} className="text-sm font-semibold">
                            <span className="uppercase mr-2">OUTCOME:</span>
                            {slideData?.outcome || ''}
                        </p>
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

export default CaseStudySimpleLayout;
