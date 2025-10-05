import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = '01-title-slide';
export const layoutName = 'Title Slide';
export const layoutDescription = 'Opening slide for professional training presentations with title, subtitle, presenter info, and corporate branding. Perfect for introducing any training topic with a clean, professional appearance.';

const professionalColors = {
  background: "#f8f7f4",
  primaryText: "#2d3436",
  secondaryText: "#636e72",
  accent: "#0984e3",
  success: "#00b894",
  warning: "#fdcb6e",
  danger: "#d63031",
  cardBg: "#ffffff",
  borderLight: "#dfe6e9",
};

const Schema = z.object({
  title: z.string().min(5).max(100).default('Professional Training Workshop').meta({
    description: "Main training title. Max 100 characters for optimal display",
  }),
  subtitle: z.string().min(10).max(300).default('Empowering teams with essential skills and knowledge for success in today\'s dynamic business environment').meta({
    description: "Training subtitle or description. Max 300 characters",
  }),
  backgroundImage: ImageSchema.optional().default({
    __image_url__: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    __image_prompt__: 'Professional training workshop corporate setting'
  }).meta({
    description: "Background image for visual appeal",
  }),
  companyLogo: ImageSchema.optional().default({
    __image_url__: 'https://via.placeholder.com/150x50/0984e3/ffffff?text=COMPANY',
    __image_prompt__: 'Company logo'
  }).meta({
    description: "Company or organization logo",
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
                className="w-full h-full object-cover opacity-10"
              />
            </div>
          )}
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Section with Logo */}
          <div className="px-12 pt-12">
            {slideData?.companyLogo?.__image_url__ && (
              <img
                src={slideData.companyLogo.__image_url__}
                alt="Company Logo"
                className="h-12 object-contain"
              />
            )}
          </div>

          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center px-12">
            <div className="text-center max-w-4xl">
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