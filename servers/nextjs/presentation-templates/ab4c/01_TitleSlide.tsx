import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = '01-title-slide';
export const layoutName = 'Title Slide';
export const layoutDescription = 'Opening slide for professional training presentations with title, subtitle, presenter info, and corporate branding. Perfect for introducing any training topic with a clean, professional appearance.';

const professionalColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  accent: "#e8e4dc",
  success: "#8a7967",
  warning: "#A89078",
  danger: "#8B6B6B",
  cardBg: "#ebe9e3",
  borderLight: "#d4cfc7",
};

const Schema = z.object({
  title: z.string().min(5).max(100).default('Professional Training Workshop').meta({
    description: "Main training title. Max 100 characters for optimal display",
  }),
  subtitle: z.string().min(10).max(300).default('Empowering teams with essential skills and knowledge for success in today\'s dynamic business environment').meta({
    description: "Training subtitle or tagline - a compelling description of what the training covers. DO NOT include date, time, or duration information here (that belongs in the Training Objectives slide). Max 300 characters",
  }),
  backgroundImage: ImageSchema.optional().default({
    __image_url__: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    __image_prompt__: 'Professional training workshop corporate setting'
  }).meta({
    description: "Background image for visual appeal",
  }),
});

export { Schema };
export type ProfessionalTitleSlideData = z.infer<typeof Schema>;

interface ProfessionalTitleSlideProps {
  data?: Partial<ProfessionalTitleSlideData>;
}

const ProfessionalTitleSlide: React.FC<ProfessionalTitleSlideProps> = ({ data: slideData }) => {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
        style={{
          fontFamily: 'Inter, sans-serif',
          backgroundColor: professionalColors.background
        }}
      >
        {/* Background Pattern/Image */}
        <div className="absolute inset-0 z-0">
          {slideData?.backgroundImage?.__image_url__ && (
            <div className="absolute inset-0">
              <img
                src={slideData.backgroundImage.__image_url__}
                alt={slideData.backgroundImage.__image_prompt__ || ''}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          )}
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-blue-50/20" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center px-12">
            <div className="text-center max-w-4xl">
              {/* Company Logo */}
              <div className="flex justify-center mb-8">
                <img
                  src="/ab4c-logo.png"
                  alt="AB4C Logo"
                  className="h-20 w-20 object-contain"
                />
              </div>

              {/* Decorative Line */}
              <div className="flex items-center justify-center mb-8">
                <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-20" />
                <div style={{ color: professionalColors.accent }} className="mx-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-20" />
              </div>

              {/* Title */}
              <h1
                className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: professionalColors.primaryText }}
              >
                {slideData?.title || 'Professional Training Workshop'}
              </h1>

              {/* Subtitle */}
              <p
                className="text-xl lg:text-2xl mb-8 leading-relaxed"
                style={{ color: professionalColors.secondaryText }}
              >
                {slideData?.subtitle || 'Empowering teams with essential skills and knowledge'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="h-20 flex items-center justify-between px-8"
            style={{ backgroundColor: professionalColors.background }}
          >
            <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
              Do not share without permission
            </span>
            <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
              © 2025 AB4C Compliance & Customer Relations. All rights reserved.
            </span>
            <img
              src="/ab4c-logo.png"
              alt="AB4C Logo"
              className="h-14 w-14 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalTitleSlide;