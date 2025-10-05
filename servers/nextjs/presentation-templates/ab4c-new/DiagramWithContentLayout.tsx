import React from 'react';
import * as z from "zod";

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-diagram-content';
export const layoutName = 'Diagram with Content';
export const layoutDescription = 'Visual diagram layout for frameworks, hierarchies, or processes with supporting content sections.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Risk Management Framework').meta({
        description: "Main title. Max 8 words",
    }),
    description: z.string().max(400).optional().meta({
        description: "Optional description. Max 20 words",
    }),
    diagramLevels: z.array(z.object({
        level: z.string().min(1).max(30).meta({ description: "Level label" }),
        items: z.array(z.string().min(3).max(40)).min(1).max(3).meta({ description: "Items for this level. Max 5 words each" }),
    })).min(3).max(4).default([
        { level: 'Strategic', items: ['Risk Assessment', 'Policy Framework'] },
        { level: 'Operational', items: ['Process Controls', 'Documentation', 'Training'] },
        { level: 'Monitoring', items: ['Audits', 'Compliance Reviews'] }
    ]).meta({
        description: "Pyramid/hierarchy levels with items. 3-4 levels",
    }),
    sections: z.array(z.object({
        heading: z.string().min(3).max(80).meta({ description: "Section heading. Max 5 words" }),
        bullets: z.array(z.string().min(10).max(100)).min(2).max(4).meta({ description: "Bullet points. 2-4 items, max 12 words each" }),
    })).min(1).max(2).default([
        {
            heading: 'Implementation',
            bullets: ['Top-down approach from strategic planning', 'Cross-functional team collaboration']
        }
    ]).meta({
        description: "Supporting content sections. 1-2 sections",
    }),
});

export { Schema };
export type DiagramWithContentLayoutData = z.infer<typeof Schema>;

interface DiagramWithContentLayoutProps {
    data?: Partial<DiagramWithContentLayoutData>;
}

const DiagramWithContentLayout: React.FC<DiagramWithContentLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-3">
                        {slideData?.title || 'Risk Management Framework'}
                    </h1>
                    {slideData?.description && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-base mb-6">{slideData.description}</p>
                    )}

                    <div className="flex gap-8 flex-1">
                        <div className="flex-1 flex flex-col justify-center items-center">
                            {slideData?.diagramLevels?.map((level, idx) => {
                                const width = `${100 - (idx * 20)}%`;
                                return (
                                    <div key={idx} className="mb-3 flex flex-col items-center" style={{ width }}>
                                        <div className="w-full p-3 text-center rounded" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                            <div style={{ color: ab4cColors.primaryText }} className="font-semibold text-sm mb-1">
                                                {level.level}
                                            </div>
                                            <div style={{ color: ab4cColors.secondaryText }} className="text-xs">
                                                {level.items.join(' • ')}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex-1">
                            {slideData?.sections?.map((section, idx) => (
                                <div key={idx} className="mb-4">
                                    <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-2">
                                        {section.heading}
                                    </h3>
                                    <ul className="space-y-2">
                                        {section.bullets.map((bullet, bidx) => (
                                            <li key={bidx} className="flex items-start">
                                                <span style={{ color: ab4cColors.accent }} className="mr-2 mt-1">•</span>
                                                <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
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

export default DiagramWithContentLayout;
