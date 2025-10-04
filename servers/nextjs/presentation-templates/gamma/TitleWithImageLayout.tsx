import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'gamma-title-with-image';
export const layoutName = 'Title with Image';
export const layoutDescription = 'A clean professional slide layout with large title, descriptive text, and supporting image. Use this for cover slides, section introductions, topic overviews, and opening slides. Perfect for presenting main topics and key concepts with visual support.';

const titleWithImageSchema = z.object({
    title: z.string().min(5).max(80).default('Cross-Department Regulatory Collaboration').meta({
        description: "Main presentation title - should be clear, concise, and capture the slide's primary topic or theme",
    }),
    description: z.string().min(20).max(250).default('Enhancing cross-departmental collaboration for regulatory compliance across global trade operations').meta({
        description: "Detailed description or subtitle explaining the topic - provides context and supporting information for the main title",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
        __image_prompt__: 'Professional business team collaborating in modern office setting'
    }).meta({
        description: "Supporting image that visually represents the slide topic - should be relevant to compliance, training, or business context",
    }),
    imagePosition: z.enum(['left', 'right']).default('right').meta({
        description: "Position of the image relative to text content - choose based on visual balance and content flow",
    })
});

export const Schema = titleWithImageSchema;

export type TitleWithImageData = z.infer<typeof titleWithImageSchema>;

interface TitleWithImageLayoutProps {
    data?: Partial<TitleWithImageData>
}

const TitleWithImageLayout: React.FC<TitleWithImageLayoutProps> = ({ data: slideData }) => {
    const isImageRight = slideData?.imagePosition === 'right';

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
                <div className="relative z-10 flex h-full">
                    {/* Content Section */}
                    <div
                        className={`flex-1 flex flex-col justify-center px-12 lg:px-16 py-16 ${isImageRight ? 'order-1' : 'order-2'}`}
                    >
                        {/* Title */}
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                            style={{ color: "#4a4035" }}
                        >
                            {slideData?.title || 'Cross-Department Regulatory Collaboration'}
                        </h1>

                        {/* Description */}
                        <p
                            className="text-lg sm:text-xl leading-relaxed"
                            style={{ color: "#6b5d52" }}
                        >
                            {slideData?.description || 'Enhancing cross-departmental collaboration for regulatory compliance across global trade operations'}
                        </p>
                    </div>

                    {/* Image Section */}
                    <div
                        className={`flex-1 flex items-center justify-center p-8 ${isImageRight ? 'order-2' : 'order-1'}`}
                    >
                        {slideData?.image?.__image_url__ && (
                            <div className="w-full h-full max-h-[600px] rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={slideData.image.__image_url__}
                                    alt={slideData.image.__image_prompt__ || slideData?.title || ''}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
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

export default TitleWithImageLayout;
