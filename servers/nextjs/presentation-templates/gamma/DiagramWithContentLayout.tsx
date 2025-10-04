import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'gamma-diagram-with-content';
export const layoutName = 'Diagram with Content';
export const layoutDescription = 'A visual layout featuring diagrams (pyramid or step-based) with supporting content sections. Use this for risk management frameworks, hierarchical structures, process steps, strategic models, or layered concepts. Perfect for presenting structured approaches and systematic methodologies.';

const diagramWithContentSchema = z.object({
    title: z.string().min(5).max(100).default('Risk Management Framework').meta({
        description: "Main title describing the framework, model, or structured approach",
    }),
    description: z.string().min(30).max(300).optional().default('Effective import compliance requires a systematic approach to risk management that addresses potential issues at multiple organizational levels.').meta({
        description: "Optional overview explaining the framework's purpose and application",
    }),
    diagramType: z.enum(['pyramid', 'steps']).default('pyramid').meta({
        description: "Visual diagram style - 'pyramid' for hierarchical levels, 'steps' for sequential processes",
    }),
    diagramItems: z.array(z.object({
        number: z.number().int().min(1).max(10),
        label: z.string().min(3).max(80)
    })).min(3).max(6).default([
        { number: 1, label: 'Strategic Risk Assessment' },
        { number: 2, label: 'Operational Controls' },
        { number: 3, label: 'Process Documentation' },
        { number: 4, label: 'Daily Compliance Activities' }
    ]).meta({
        description: "Diagram items (pyramid levels or steps)",
    }),
    sectionsHeading: z.string().min(3).max(80).default('Risk Identification Areas').meta({
        description: "Heading for content sections",
    }),
    sections: z.array(z.object({
        label: z.string().min(3).max(80),
        description: z.string().min(10).max(150)
    })).min(3).max(5).default([
        {
            label: 'Classification Accuracy:',
            description: 'Product coding and tariff schedule compliance'
        },
        {
            label: 'Valuation Integrity:',
            description: 'Complete and accurate transaction reporting'
        },
        {
            label: 'Origin Determination:',
            description: 'Country of origin marking and preferential programs'
        },
        {
            label: 'Documentation Management:',
            description: 'Complete and timely filing requirements'
        },
        {
            label: 'Regulatory Compliance:',
            description: 'Agency-specific product requirements'
        },
        {
            label: 'Supply Chain Security:',
            description: 'C-TPAT and trusted trader programs'
        }
    ]).meta({
        description: "Content sections with labels and descriptions",
    }),
    image: ImageSchema.optional().default({
        __image_url__: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
        __image_prompt__: 'Import risk assessment document on desk'
    }).meta({
        description: "Optional supporting image",
    })
});

export const Schema = diagramWithContentSchema;

export type DiagramWithContentData = z.infer<typeof diagramWithContentSchema>;

interface DiagramWithContentLayoutProps {
    data?: Partial<DiagramWithContentData>
}

const DiagramWithContentLayout: React.FC<DiagramWithContentLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Risk Management Framework'}
                    </h1>

                    {/* Description */}
                    {slideData?.description && (
                        <p
                            className="text-xs leading-relaxed mb-3"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.description}
                        </p>
                    )}

                    {/* Content Grid */}
                    <div className="flex gap-6">
                        {/* Left - Diagram */}
                        <div className="flex-1 flex flex-col items-center justify-start">
                            {slideData?.diagramType === 'pyramid' ? (
                                <div className="w-full max-w-sm">
                                    {slideData?.diagramItems && slideData.diagramItems.length > 0 ? (
                                        <div className="space-y-2">
                                            {slideData.diagramItems.map((item, index) => {
                                                const widthPercent = 100 - (index * 15);
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-center py-3 rounded"
                                                        style={{
                                                            background: "#e8e4dc",
                                                            width: `${widthPercent}%`,
                                                            marginLeft: `${(100 - widthPercent) / 2}%`
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className="font-bold text-xl"
                                                                style={{ color: "#4a4035" }}
                                                            >
                                                                {item.number}
                                                            </span>
                                                            <span
                                                                className="text-sm font-medium"
                                                                style={{ color: "#4a4035" }}
                                                            >
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="w-full space-y-3">
                                    {slideData?.diagramItems && slideData.diagramItems.length > 0 ? (
                                        slideData.diagramItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-3 rounded"
                                                style={{ background: "#e8e4dc" }}
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                                                    style={{ background: "#4a4035", color: "#f5f5f0" }}
                                                >
                                                    {item.number}
                                                </div>
                                                <span
                                                    className="text-base font-medium"
                                                    style={{ color: "#4a4035" }}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            )}
                        </div>

                        {/* Right - Content and Image */}
                        <div className="flex-1 flex flex-col">
                            {/* Sections */}
                            <div className="mb-3">
                                <h2
                                    className="text-lg font-bold mb-2"
                                    style={{ color: "#4a4035" }}
                                >
                                    {slideData?.sectionsHeading || 'Risk Identification Areas'}
                                </h2>
                                <ul className="space-y-1.5">
                                    {slideData?.sections && slideData.sections.length > 0 ? (
                                        slideData.sections.map((section, index) => (
                                            <li
                                                key={index}
                                                className="text-xs leading-snug"
                                                style={{ color: "#6b5d52" }}
                                            >
                                                <span className="font-semibold" style={{ color: "#4a4035" }}>
                                                    {section.label}
                                                </span>{' '}
                                                {section.description}
                                            </li>
                                        ))
                                    ) : null}
                                </ul>
                            </div>

                            {/* Image - only show if 4 or fewer sections */}
                            {slideData?.image?.__image_url__ && slideData?.sections && slideData.sections.length <= 4 && (
                                <div className="rounded-lg overflow-hidden shadow-md h-40">
                                    <img
                                        src={slideData.image.__image_url__}
                                        alt={slideData.image.__image_prompt__ || slideData?.title || ''}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
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

export default DiagramWithContentLayout;
