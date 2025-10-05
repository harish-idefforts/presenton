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

export const layoutId = 'ab4c-diagram-with-content';
export const layoutName = 'Diagram with Content';
export const layoutDescription = 'Layout for presenting frameworks or processes with a visual diagram (pyramid or steps) and supporting textual content.';

const diagramItemSchema = z.object({
    label: z.string().min(3).max(50).meta({
        description: "Concise label for each diagram step or pyramid level",
    }),
    description: z.string().min(10).max(150).optional().meta({
        description: "Optional brief explanation of each step or level in the diagram",
    }),
});

const diagramSchema = z.object({
    type: z.enum(["pyramid", "steps"]).default("steps").meta({
        description: "Specifies the visual representation of the diagram: 'pyramid' for hierarchical structures or 'steps' for sequential flows",
    }),
    items: z.array(diagramItemSchema).min(3).max(5).default([
        { label: 'Level 1: Foundation', description: 'Basic principles and core concepts.' },
        { label: 'Level 2: Development', description: 'Building upon foundational knowledge.' },
        { label: 'Level 3: Application', description: 'Implementing theory in practice.' },
    ]).meta({
        description: "Represent the levels of a pyramid diagram (bottom to top) or the sequential steps in a process flow",
    }),
});

const diagramWithContentLayoutSchema = z.object({
    title: z.string().min(3).max(80).default('The Regulatory Compliance Framework').meta({
        description: "Main title for a slide focusing on a framework or process, such as a strategy, methodology, or system",
    }),
    description: z.string().min(50).max(300).optional().default('A robust framework is essential for navigating the complexities of modern regulatory environments. This structured approach guides organizations through identification, assessment, and mitigation of compliance risks.').meta({
        description: "Optional introductory sentence or slogan for the framework or process",
    }),
    diagram: diagramSchema.default({
        type: 'steps',
        items: [
            { label: 'Identify', description: 'Identify applicable regulations.' },
            { label: 'Assess', description: 'Assess compliance risks.' },
            { label: 'Mitigate', description: 'Implement controls to mitigate risks.' },
            { label: 'Monitor', description: 'Continuously monitor compliance.' },
            { label: 'Report', description: 'Report compliance status.' },
        ],
    }).meta({
        description: "Details for the visual diagram (pyramid or steps)",
    }),
    sections: z.array(z.object({
        heading: z.string().min(3).max(80).meta({
            description: "Heading for a supporting content section, elaborating on aspects of the diagram or framework",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(4).default([
            'Policy & Governance: Defining compliance responsibilities.',
            'Process & Controls: Implementing operational safeguards.',
            'Technology & Data: Leveraging tools for efficiency.'
        ]).meta({
            description: "Key bullet points providing additional details or implications of the supporting content section",
        }),
    })).min(1).max(2).default([
        {
            heading: 'Key Components',
            bullets: [
                'Policy & Governance: Defining compliance responsibilities.',
                'Process & Controls: Implementing operational safeguards.',
                'Technology & Data: Leveraging tools for efficiency.'
            ],
        },
    ]).meta({
        description: "Supporting content sections with headings and bullet points",
    }),
    image: ImageSchema.optional().default({
        __image_url__: 'https://images.unsplash.com/photo-1579389082987-a2f0c78a0b0b?auto=format&fit=crop&w=1920&q=80',
        __image_prompt__: 'A visually appealing diagram showing interconnected business processes, with glowing lines and nodes indicating data flow and decision points.'
    }).meta({
        description: "An optional, illustrative image that complements the diagram or supporting content, enhancing visual understanding",
    }),
});

export const Schema = diagramWithContentLayoutSchema;

export type DiagramWithContentLayoutData = z.infer<typeof diagramWithContentLayoutSchema>;

interface DiagramWithContentLayoutProps {
    data?: Partial<DiagramWithContentLayoutData>;
}

const DiagramWithContentLayout: React.FC<DiagramWithContentLayoutProps> = ({ data: slideData }) => {
    const renderDiagram = () => {
        if (!slideData?.diagram?.items) return null;

        if (slideData.diagram.type === 'pyramid') {
            const pyramidItems = [...slideData.diagram.items].reverse(); // Render from base to top
            const baseWidth = 300; // Max width for the base of the pyramid
            const widthDecrement = 50; // How much each higher level decreases in width

            return (
                <div className="flex flex-col items-center justify-end h-full">
                    {pyramidItems.map((item, index) => {
                        const currentWidth = baseWidth - (index * widthDecrement);
                        return (
                            <div
                                key={index}
                                className="text-center py-3 px-4 mb-2 first:mb-0"
                                style={{
                                    backgroundColor: ab4cColors.boxBackground,
                                    width: `${currentWidth}px`,
                                    // Optionally add border to differentiate layers if needed
                                    border: `1px solid ${ab4cColors.accent}`,
                                    borderRadius: '4px',
                                }}
                            >
                                <h3 style={{ color: ab4cColors.primaryText }} className="font-semibold text-lg">
                                    {item.label}
                                </h3>
                                {item.description && (
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        } else if (slideData.diagram.type === 'steps') {
            return (
                <div className="flex flex-col justify-center space-y-6 h-full">
                    {slideData.diagram.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: ab4cColors.accent }}
                            >
                                {index + 1}
                            </div>
                            <div
                                className="flex-1 rounded-lg p-3"
                                style={{ backgroundColor: ab4cColors.boxBackground }}
                            >
                                <h3 style={{ color: ab4cColors.primaryText }} className="font-semibold text-lg">
                                    {item.label}
                                </h3>
                                {item.description && (
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

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
                        className="text-4xl lg:text-5xl font-bold text-center mb-6"
                    >
                        {slideData?.title || 'The Regulatory Compliance Framework'}
                    </h1>
                    {slideData?.description && (
                        <p
                            style={{ color: ab4cColors.secondaryText }}
                            className="text-base text-center mb-10 max-w-3xl mx-auto"
                        >
                            {slideData.description}
                        </p>
                    )}

                    <div className="flex-1 grid grid-cols-2 gap-12">
                        {/* Left Column - Diagram */}
                        <div className="flex flex-col justify-center items-center h-full">
                            {renderDiagram()}
                        </div>

                        {/* Right Column - Supporting Content */}
                        <div className="flex flex-col justify-center space-y-6">
                            {slideData?.image?.__image_url__ && (
                                <div className="h-40 rounded-lg overflow-hidden shadow-md">
                                    <img
                                        src={slideData.image.__image_url__}
                                        alt={slideData.image.__image_prompt__ || 'Diagram image'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            {slideData?.sections?.map((section, secIndex) => (
                                <div key={secIndex}>
                                    <h2
                                        style={{ color: ab4cColors.primaryText }}
                                        className="text-xl font-semibold mb-3"
                                    >
                                        {section.heading}
                                    </h2>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {section.bullets.map((bullet, bulletIndex) => (
                                            <li key={bulletIndex} style={{ color: ab4cColors.secondaryText }} className="text-base leading-relaxed">
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
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

export default DiagramWithContentLayout;
