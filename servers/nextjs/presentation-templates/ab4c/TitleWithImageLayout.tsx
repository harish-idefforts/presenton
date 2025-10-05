import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes'; // Assuming defaultSchemes is available

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-title-with-image';
export const layoutName = 'Title with Image';
export const layoutDescription = 'Versatile, two-column layout ideal for cover or introductory slides, featuring a prominent title, descriptive text, and a large supporting image. The image position can be customized to be on the left or right, offering design flexibility for impactful visual communication. Suitable for setting the stage, introducing topics, or presenting key themes.';

const titleWithImageLayoutSchema = z.object({
    title: z.string().min(5).max(60).default('Cross-Department Regulatory Collaboration').meta({
        description: "Main, impactful title for the cover or introductory slide. Should be concise and attention-grabbing",
    }),
    description: z.string().min(50).max(200).default('Understanding the intricate web of trade compliance requires seamless collaboration across departments. This training highlights key areas for partnership, ensuring regulatory adherence and operational efficiency.').meta({
        description: "Main descriptive text content, providing an overview or introduction to the presentation's topic",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1620320092305-b040f7f32d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        __image_prompt__: 'Diverse business team collaborating in a modern office environment'
    }).meta({
        description: "Large, high-quality supporting image that visually represents the slide's title or theme",
    }),
    imagePosition: z.enum(["left", "right"]).default("right").meta({
        description: "Determines the placement of the image relative to the content: 'left' or 'right'",
    }),
});

export const Schema = titleWithImageLayoutSchema;

export type TitleWithImageLayoutData = z.infer<typeof titleWithImageLayoutSchema>;

interface TitleWithImageLayoutProps {
    data?: Partial<TitleWithImageLayoutData>;
}

const TitleWithImageLayout: React.FC<TitleWithImageLayoutProps> = ({ data: slideData }) => {
    const isImageLeft = slideData?.imagePosition === 'left';

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
                <div className={`relative z-10 flex h-full ${isImageLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Image Section */}
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={slideData?.image?.__image_url__ || ''}
                                alt={slideData?.image?.__image_prompt__ || slideData?.title || ''}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-center p-8 space-y-6">
                            <h1
                                style={{ color: ab4cColors.primaryText }}
                                className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight"
                            >
                                {slideData?.title || 'Cross-Department Regulatory Collaboration'}
                            </h1>

                            <div style={{ backgroundColor: ab4cColors.accent }} className="w-20 h-1"></div>

                            <p
                                style={{ color: ab4cColors.secondaryText }}
                                className="text-base !leading-tight"
                            >
                                {slideData?.description || 'Understanding the intricate web of trade compliance requires seamless collaboration across departments. This training highlights key areas for partnership, ensuring regulatory adherence and operational efficiency.'}
                            </p>
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

export default TitleWithImageLayout;
