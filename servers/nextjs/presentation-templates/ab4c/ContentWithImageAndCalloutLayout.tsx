import React from 'react';
import * as z from "zod";
import { ImageSchema, IconSchema } from '@/presentation-templates/defaultSchemes';

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-content-with-image-and-callout';
export const layoutName = 'Content with Image and Callout';
export const layoutDescription = 'Two-column layout for technical content. A left column presents hierarchical bullet points (with optional headings) and a rich description. The right column features a prominent supporting image and a distinct callout box for warnings, tips, or key information. Ideal for explaining complex processes, guidelines, or analytical findings with supporting visual context.';

const calloutSchema = z.object({
    type: z.enum(["info", "warning", "success"]).default("info").meta({
        description: "Type of callout (info, warning, success)",
    }),
    text: z.string().min(20).max(300).meta({
        description: "Concise, important message for the callout box: a warning, tip, or crucial insight",
    }),
    icon: IconSchema.default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/info-bold.svg',
        __icon_query__: 'info icon'
    }).meta({
        description: "Icon for the callout box",
    }),
});

const contentWithImageAndCalloutLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Avoiding Ambiguity in Documentation').meta({
        description: "Main title, focusing on technical clarity or operational guidance",
    }),
    description: z.string().min(50).max(300).optional().default('Clear and precise language in trade documentation is crucial to prevent misinterpretations, delays, and non-compliance issues. Sloppy wording can lead to significant penalties and operational hurdles.').meta({
        description: "Introductory paragraph explaining the slide's primary technical concept or objective",
    }),
    sections: z.array(z.object({
        heading: z.string().min(3).max(80).optional().meta({
            description: "Optional heading for a sub-section of content, to organize related bullet points",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6).default([
            'Use unambiguous terms and avoid jargon where possible. Define technical terms if they must be used.',
            'Ensure consistency in terminology across all related documents.',
            'Verify legal and regulatory terms with domain experts.'
        ]).meta({
            description: "Hierarchical bullet points elaborating on a key concept or step",
        }),
    })).min(1).max(3).default([
        {
            heading: 'Precision in Language',
            bullets: [
                'Use unambiguous terms and avoid jargon where possible. Define technical terms if they must be used.',
                'Ensure consistency in terminology across all related documents.',
                'Verify legal and regulatory terms with domain experts.'
            ]
        },
        {
            heading: 'Structured Information',
            bullets: [
                'Organize information logically with clear headings, subheadings, and bullet points.',
                'Cross-reference where necessary to avoid repetition and ensure context.',
                'Utilize templates and standardized formats for common document types.'
            ]
        }
    ]).meta({
        description: "Content sections with optional headings and bullet points",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1517048676732-d65bc9af597f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        __image_prompt__: 'Person reviewing legal documents with a magnifying glass to check for small text or errors'
        }).meta({
            description: "A relevant supporting image for the technical content, such as a workflow diagram, magnifying glass on documents, or team collaboration",
    }),
    callout: calloutSchema.default({
        type: 'warning',
        text: 'A single ambiguous phrase can lead to severe penalties, shipment delays, and substantial financial losses. Always prioritize clarity over brevity.',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/warning-bold.svg',
            __icon_query__: 'warning sign'
        }
    }).meta({
        description: "Highlighted callout box for important information",
    }),
});

export const Schema = contentWithImageAndCalloutLayoutSchema;

export type ContentWithImageAndCalloutLayoutData = z.infer<typeof contentWithImageAndCalloutLayoutSchema>;

interface ContentWithImageAndCalloutLayoutProps {
    data?: Partial<ContentWithImageAndCalloutLayoutData>;
}

const ContentWithImageAndCalloutLayout: React.FC<ContentWithImageAndCalloutLayoutProps> = ({ data: slideData }) => {
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
                <div className="relative z-10 flex h-full px-12 pt-12 pb-8">
                    {/* Left Section - Content */}
                    <div className="flex-1 flex flex-col pr-8">
                        <h1
                            style={{ color: ab4cColors.primaryText }}
                            className="text-4xl lg:text-5xl font-bold mb-6"
                        >
                            {slideData?.title || 'Avoiding Ambiguity in Documentation'}
                        </h1>
                        {slideData?.description && (
                            <p
                                style={{ color: ab4cColors.secondaryText }}
                                className="text-base leading-relaxed mb-8"
                            >
                                {slideData.description}
                            </p>
                        )}
                        {slideData?.sections?.map((section, secIndex) => (
                            <div key={secIndex} className="mb-6 last:mb-0">
                                {section.heading && (
                                    <h2
                                        style={{ color: ab4cColors.primaryText }}
                                        className="text-xl font-semibold mb-3"
                                    >
                                        {section.heading}
                                    </h2>
                                )}
                                <ul className="list-disc pl-5 space-y-2">
                                    {section.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} style={{ color: ab4cColors.secondaryText }} className="text-base leading-relaxed">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Right Section - Image and Callout */}
                    <div className="flex-shrink-0 w-96 flex flex-col space-y-8">
                        <div className="h-2/3 rounded-lg overflow-hidden shadow-md">
                            <img
                                src={slideData?.image?.__image_url__ || ''}
                                alt={slideData?.image?.__image_prompt__ || slideData?.title || ''}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className="bg-red-100 border-l-4 p-4 rounded-md"
                            style={{
                                backgroundColor: slideData?.callout?.type === 'info'
                                    ? '#d4e9f7' // Light blue
                                    : slideData?.callout?.type === 'warning'
                                        ? '#fdf2d5' // Light yellow/orange
                                        : slideData?.callout?.type === 'success'
                                            ? '#d4f4dd' // Light green
                                            : '#d4e9f7', // Default to info
                                borderColor: slideData?.callout?.type === 'info'
                                    ? '#6BBFE7'
                                    : slideData?.callout?.type === 'warning'
                                        ? '#F9A825'
                                        : slideData?.callout?.type === 'success'
                                            ? '#68D391'
                                            : '#6BBFE7',
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                {/* Icon for the callout */}
                                {/* The RemoteSvgIcon component is assumed to be available globally or imported */}
                                {/* For now, a placeholder icon, later replace with RemoteSvgIcon if available */}
                                <span className="text-xl" style={{ color: ab4cColors.primaryText }}>⚠️</span> {/* Placeholder */}
                                <p style={{ color: ab4cColors.primaryText }} className="text-sm font-medium">
                                    {slideData?.callout?.text}
                                </p>
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

export default ContentWithImageAndCalloutLayout;
