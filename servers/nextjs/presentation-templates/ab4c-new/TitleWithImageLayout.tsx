import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-title-with-image';
export const layoutName = 'Title with Image';
export const layoutDescription = 'Cover or introductory slide with large title, description text, and supporting image. Image can be positioned left or right for visual flexibility.';

const Schema = z.object({
    title: z.string().min(5).max(100).default('Cross-Department Regulatory Collaboration').meta({
        description: "Main title for the slide. Max 8 words",
    }),
    description: z.string().min(50).max(600).default('Understanding the intricate web of trade compliance requires seamless collaboration across departments. This training highlights key areas for partnership.').meta({
        description: "Descriptive text providing context. Max 30 words",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
        __image_prompt__: 'Business team collaborating in modern office'
    }).meta({
        description: "Supporting image for the slide. Max 30 words",
    }),
    imagePosition: z.enum(["left", "right"]).default("right").meta({
        description: "Position of image relative to content",
    }),
});

export { Schema };
export type TitleWithImageLayoutData = z.infer<typeof Schema>;

interface TitleWithImageLayoutProps {
    data?: Partial<TitleWithImageLayoutData>;
}

const TitleWithImageLayout: React.FC<TitleWithImageLayoutProps> = ({ data: slideData }) => {
    const isImageLeft = slideData?.imagePosition === 'left';

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className={`relative z-10 flex h-full ${isImageLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={slideData?.image?.__image_url__ || ''}
                                alt={slideData?.image?.__image_prompt__ || ''}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center p-12 space-y-6">
                        <h1 style={{ color: ab4cColors.primaryText }} className="text-5xl font-bold leading-tight">
                            {slideData?.title || 'Cross-Department Regulatory Collaboration'}
                        </h1>
                        <div style={{ backgroundColor: ab4cColors.accent }} className="w-20 h-1"></div>
                        <p style={{ color: ab4cColors.secondaryText }} className="text-lg leading-relaxed">
                            {slideData?.description || ''}
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

export default TitleWithImageLayout;
