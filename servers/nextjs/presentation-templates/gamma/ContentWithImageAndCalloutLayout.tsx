import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'gamma-content-image-callout';
export const layoutName = 'Content with Image and Callout';
export const layoutDescription = 'A comprehensive content layout with sections, supporting image, and highlighted callout box for tips, warnings, or important notes. Use this for technical topics, detailed regulations, compliance requirements, or any content needing visual support and highlighted advisories. Perfect for combining detailed information with practical guidance.';

const contentWithImageAndCalloutSchema = z.object({
    title: z.string().min(5).max(100).default('Harmonized Tariff Schedule (HTS)').meta({
        description: "Main technical topic or regulation title being explained",
    }),
    description: z.string().min(20).max(400).default('The Harmonized Tariff Schedule of the United States (HTSUS) is a comprehensive classification system that assigns specific codes to imported goods for duty assessment and statistical purposes. Proper classification is fundamental to import compliance and directly impacts duty rates, trade agreements benefits, and regulatory requirements.').meta({
        description: "Overview paragraph explaining the topic in detail - provides comprehensive context",
    }),
    sections: z.array(z.object({
        heading: z.string().min(3).max(80),
        bullets: z.array(z.string().min(10).max(200)).min(2).max(6)
    })).min(1).max(3).default([
        {
            heading: 'Classification Structure',
            bullets: [
                'Chapters 1-97: Organized by material composition and product function',
                '6-digit base: International harmonized system codes',
                '8-10 digit extensions: US-specific statistical and legal provisions',
                'Subheadings: Detailed product descriptions and specifications'
            ]
        },
        {
            heading: 'Classification Best Practices',
            bullets: [
                'Review General Rules of Interpretation (GRI) for guidance',
                'Consider product\'s essential character and primary function',
                'Consult CBP rulings database for precedent classifications',
                'Obtain binding ruling for complex or high-volume products'
            ]
        }
    ]).meta({
        description: "Organized content sections - each with heading and bullet points detailing specific aspects (1-3 sections)",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80',
        __image_prompt__: 'Stack of legal books and documents on desk representing tariff schedules'
    }).meta({
        description: "Supporting image that visually represents the technical topic or regulation",
    }),
    calloutType: z.enum(['tip', 'warning', 'info']).default('tip').meta({
        description: "Type of callout box - 'tip' for helpful advice, 'warning' for cautions, 'info' for important notes",
    }),
    calloutText: z.string().min(20).max(250).default('Pro Tip: Misclassification is one of the most common compliance violations. When in doubt, seek professional assistance or request a binding ruling from CBP to ensure accuracy.').meta({
        description: "Important advisory, tip, warning, or note to highlight for the audience",
    })
});

export const Schema = contentWithImageAndCalloutSchema;

export type ContentWithImageAndCalloutData = z.infer<typeof contentWithImageAndCalloutSchema>;

interface ContentWithImageAndCalloutLayoutProps {
    data?: Partial<ContentWithImageAndCalloutData>
}

const ContentWithImageAndCalloutLayout: React.FC<ContentWithImageAndCalloutLayoutProps> = ({ data: slideData }) => {
    const calloutColors = {
        tip: { bg: '#d4e9f7', border: '#3b82f6' },
        warning: { bg: '#fef3c7', border: '#f59e0b' },
        info: { bg: '#e0e7ff', border: '#6366f1' }
    };

    const calloutColor = calloutColors[slideData?.calloutType || 'tip'];

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
                <div className="relative z-10 h-full flex px-12 lg:px-16 pt-10 pb-24 gap-6">
                    {/* Left Content */}
                    <div className="flex-[2] flex flex-col">
                        {/* Title */}
                        <h1
                            className="text-3xl sm:text-4xl font-bold mb-4"
                            style={{ color: "#4a4035" }}
                        >
                            {slideData?.title || 'Harmonized Tariff Schedule (HTS)'}
                        </h1>

                        {/* Description */}
                        <p
                            className="text-sm leading-relaxed mb-4"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData?.description}
                        </p>

                        {/* Sections */}
                        <div className="space-y-3">
                            {slideData?.sections && slideData.sections.length > 0 ? (
                                slideData.sections.map((section, index) => (
                                    <div key={index}>
                                        <h2
                                            className="text-lg font-semibold mb-2"
                                            style={{ color: "#4a4035" }}
                                        >
                                            {section.heading}
                                        </h2>
                                        <ul className="space-y-1">
                                            {section.bullets.map((bullet, bIndex) => (
                                                <li
                                                    key={bIndex}
                                                    className="flex items-start text-xs leading-relaxed"
                                                    style={{ color: "#6b5d52" }}
                                                >
                                                    <span className="mr-2 mt-0.5">•</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Image */}
                        {slideData?.image?.__image_url__ && (
                            <div className="rounded-lg overflow-hidden shadow-md h-64">
                                <img
                                    src={slideData.image.__image_url__}
                                    alt={slideData.image.__image_prompt__ || slideData?.title || ''}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Callout Box */}
                        <div
                            className="rounded-lg p-4 border-l-4"
                            style={{
                                background: calloutColor.bg,
                                borderColor: calloutColor.border
                            }}
                        >
                            <div className="flex items-start gap-2">
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                                    style={{ background: calloutColor.border }}
                                >
                                    {slideData?.calloutType === 'warning' ? '⚠' : slideData?.calloutType === 'info' ? 'i' : '💡'}
                                </div>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "#4a4035" }}
                                >
                                    <strong>{slideData?.calloutType === 'warning' ? 'Warning: ' : slideData?.calloutType === 'info' ? 'Info: ' : 'Pro Tip: '}</strong>
                                    {slideData?.calloutText || 'Misclassification is one of the most common compliance violations.'}
                                </p>
                            </div>
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

export default ContentWithImageAndCalloutLayout;
