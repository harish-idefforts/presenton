import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'gamma-image-text-three-column';
export const layoutName = 'Image-Text Three Column';
export const layoutDescription = 'A three-column layout with images and extensive text content, featuring small images at top followed by large paragraphs and bullets. Use this for detailed three-part explanations, complex topics requiring extensive text, comparative analysis with visuals, or multi-faceted solutions. Perfect for in-depth content that needs visual support.';

const imageTextThreeColumnSchema = z.object({
    title: z.string().min(5).max(120).default('Monitoring Regulatory Changes and Updating Practices').meta({
        description: "Main title describing the three topics or approaches being presented",
    }),
    columns: z.array(z.object({
        image: ImageSchema,
        heading: z.string().min(3).max(80),
        description: z.string().min(50).max(400),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6)
    })).length(3).default([
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
                __image_prompt__: 'Computer screen showing regulatory monitoring dashboard'
            },
            heading: 'Technology-Enabled Monitoring',
            description: 'Modern regulatory monitoring systems provide real-time alerts about changes in trade regulations across multiple jurisdictions. These tools enable proactive compliance management and reduce the risk of missing important regulatory updates that could impact business operations.',
            bullets: [
                'Automated alerts for regulatory changes',
                'Multi-jurisdiction coverage',
                'Integration with compliance workflows',
                'Historical tracking and analysis'
            ]
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80',
                __image_prompt__: 'Professional networking event or industry association meeting'
            },
            heading: 'Industry Networks and Associations',
            description: 'Active participation in trade associations and professional networks provides early intelligence about regulatory trends and proposed changes. These relationships offer valuable insights into regulatory interpretations and best practices from industry peers.',
            bullets: [
                'Early warning of proposed changes',
                'Peer insights and interpretations',
                'Industry-wide best practices',
                'Collective advocacy opportunities'
            ]
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
                __image_prompt__: 'Regulatory documents and official correspondence'
            },
            heading: 'Direct Regulatory Engagement',
            description: 'Establishing direct communication channels with regulatory authorities enables organisations to seek clarification on requirements and participate in consultation processes that shape future regulations. This engagement builds valuable relationships and provides advance notice of regulatory changes.',
            bullets: [
                'Direct clarification requests',
                'Participation in consultations',
                'Advance notice of changes',
                'Relationship building with authorities'
            ]
        }
    ]).meta({
        description: "Exactly three columns - each with image, heading, extensive description (50-400 chars), and bullet points",
    }),
    footerText: z.string().min(20).max(400).optional().default('Effective regulatory monitoring combines technology solutions with human expertise and relationship management. Organisations that invest in comprehensive monitoring capabilities demonstrate superior adaptability and reduced compliance risk during periods of regulatory change.').meta({
        description: "Optional summary text emphasizing the combined approach or key takeaway",
    })
});

export const Schema = imageTextThreeColumnSchema;

export type ImageTextThreeColumnData = z.infer<typeof imageTextThreeColumnSchema>;

interface ImageTextThreeColumnLayoutProps {
    data?: Partial<ImageTextThreeColumnData>
}

const ImageTextThreeColumnLayout: React.FC<ImageTextThreeColumnLayoutProps> = ({ data: slideData }) => {
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
                        className="text-3xl sm:text-4xl font-bold mb-5"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Monitoring Regulatory Changes and Updating Practices'}
                    </h1>

                    {/* Three Columns */}
                    <div className="flex gap-5 mb-3">
                        {slideData?.columns && slideData.columns.length === 3 ? (
                            slideData.columns.map((column, index) => (
                                <div key={index} className="flex-1 flex flex-col">
                                    {/* Image */}
                                    {column.image?.__image_url__ && (
                                        <div className="h-40 rounded-lg overflow-hidden shadow-sm mb-3">
                                            <img
                                                src={column.image.__image_url__}
                                                alt={column.image.__image_prompt__ || column.heading}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Heading */}
                                    <h2
                                        className="text-lg font-bold mb-2"
                                        style={{ color: "#4a4035" }}
                                    >
                                        {column.heading}
                                    </h2>

                                    {/* Description */}
                                    <p
                                        className="text-xs leading-relaxed mb-2"
                                        style={{ color: "#6b5d52" }}
                                    >
                                        {column.description}
                                    </p>

                                    {/* Bullets */}
                                    <ul className="space-y-1">
                                        {column.bullets.map((bullet, bIndex) => (
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

                    {/* Footer Text */}
                    {slideData?.footerText && (
                        <p
                            className="text-xs leading-relaxed"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData.footerText}
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

export default ImageTextThreeColumnLayout;
