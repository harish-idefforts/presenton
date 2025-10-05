import React from 'react';
import * as z from "zod";
import { IconSchema, ImageSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '04-section-header-slide';
export const layoutName = 'Section Header';
export const layoutDescription = 'Clean section divider with section number, title, and description. Use to separate major parts of your training presentation with visual clarity.';

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
  sectionNumber: z.number().int().min(1).max(20).default(1).meta({
    description: "Section number (e.g., 1, 2, 3)",
  }),
  sectionTitle: z.string().min(3).max(80).default('Core Concepts').meta({
    description: "Main section title",
  }),
  description: z.string().min(10).max(300).optional().default('Understanding the fundamental principles and frameworks that guide our approach').meta({
    description: "Optional section description or overview",
  }),
  icon: IconSchema.default({
    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/bookmark-bold.svg',
    __icon_query__: 'bookmark section marker'
  }).meta({
    description: "Icon representing the section theme",
  }),
  backgroundPattern: ImageSchema.optional().default({
    __image_url__: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    __image_prompt__: 'abstract gradient background pattern'
  }).meta({
    description: "Optional decorative background pattern",
  }),
  progressIndicator: z.object({
    current: z.number().int().min(1).max(20),
    total: z.number().int().min(1).max(20)
  }).optional().default({
    current: 1,
    total: 5
  }).meta({
    description: "Progress indicator showing current section out of total",
  }),
});

export { Schema };
export type SectionHeaderSlideData = z.infer<typeof Schema>;

interface SectionHeaderSlideProps {
  data?: Partial<SectionHeaderSlideData>;
}

const SectionHeaderSlide: React.FC<SectionHeaderSlideProps> = ({ data: slideData }) => {
  const progress = slideData?.progressIndicator;

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
        {/* Background Pattern */}
        {slideData?.backgroundPattern?.__image_url__ && (
          <div className="absolute inset-0 z-0">
            <img
              src={slideData.backgroundPattern.__image_url__}
              alt=""
              className="w-full h-full object-cover opacity-5"
            />
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0">
          {/* Top right decoration */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
            style={{ backgroundColor: professionalColors.accent }}
          />
          {/* Bottom left decoration */}
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
            style={{ backgroundColor: professionalColors.success }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-12">
          {/* Progress Indicator */}
          {progress && (
            <div className="absolute top-12 right-12">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: professionalColors.secondaryText }}
                >
                  Section
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{ color: professionalColors.accent }}
                >
                  {progress.current}
                </span>
                <span
                  className="text-sm"
                  style={{ color: professionalColors.secondaryText }}
                >
                  of {progress.total}
                </span>
              </div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: progress.total }, (_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-8 rounded-full transition-all ${
                      i < progress.current ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{
                      backgroundColor: i < progress.current
                        ? professionalColors.accent
                        : professionalColors.borderLight
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Center Content */}
          <div className="text-center max-w-3xl">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: professionalColors.cardBg,
                  border: `3px solid ${professionalColors.accent}`
                }}
              >
                <RemoteSvgIcon
                  url={slideData?.icon?.__icon_url__ || ''}
                  strokeColor="currentColor"
                  className="w-12 h-12"
                  color={professionalColors.accent}
                  title={slideData?.icon?.__icon_query__ || ''}
                />
              </div>
            </div>

            {/* Section Number */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div style={{ backgroundColor: professionalColors.accent }} className="h-0.5 w-16" />
              <span
                className="text-7xl font-bold"
                style={{ color: professionalColors.accent }}
              >
                {slideData?.sectionNumber || 1}
              </span>
              <div style={{ backgroundColor: professionalColors.accent }} className="h-0.5 w-16" />
            </div>

            {/* Section Title */}
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: professionalColors.primaryText }}
            >
              {slideData?.sectionTitle || 'Core Concepts'}
            </h1>

            {/* Description */}
            {slideData?.description && (
              <p
                className="text-lg lg:text-xl leading-relaxed"
                style={{ color: professionalColors.secondaryText }}
              >
                {slideData.description}
              </p>
            )}

            {/* Decorative dots */}
            <div className="flex justify-center gap-2 mt-8">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: professionalColors.accent }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: professionalColors.success }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: professionalColors.warning }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
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
    </>
  );
};

export default SectionHeaderSlide;