import React from "react";
import * as z from "zod";
import {
  IconSchema,
  ImageSchema,
} from "@/presentation-templates/defaultSchemes";
import { RemoteSvgIcon } from "@/app/hooks/useRemoteSvgIcon";

export const layoutId = "04-section-header-slide";
export const layoutName = "Section Header";
export const layoutDescription =
  "Clean section divider with section number, title, and description. Use to separate major parts of your training presentation with visual clarity.";

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
  sectionTitle: z.string().min(3).max(80).default("Core Concepts").meta({
    description: "Main section title",
  }),
  description: z
    .string()
    .min(10)
    .max(300)
    .optional()
    .default(
      "Understanding the fundamental principles and frameworks that guide our approach"
    )
    .meta({
      description: "Optional section description or overview",
    }),
  icon: IconSchema.default({
    __icon_url__:
      "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/bookmark-bold.svg",
    __icon_query__: "bookmark section marker",
  }).meta({
    description: "Icon representing the section theme",
  }),
  backgroundPattern: ImageSchema.optional()
    .default({
      __image_url__:
        "https://images.unsplash.com/photo-1557683316-973673baf926",
      __image_prompt__: "abstract gradient background pattern",
    })
    .meta({
      description: "Optional decorative background pattern",
    }),
});

export { Schema };
export type SectionHeaderSlideData = z.infer<typeof Schema>;

interface SectionHeaderSlideProps {
  data?: Partial<SectionHeaderSlideData>;
}

const SectionHeaderSlide: React.FC<SectionHeaderSlideProps> = ({
  data: slideData,
}) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
        style={{
          fontFamily: "Inter, sans-serif",
          backgroundColor: professionalColors.background,
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
          {/* Center Content */}
          <div className="text-center max-w-3xl">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: professionalColors.cardBg,
                  border: `3px solid ${professionalColors.accent}`,
                }}
              >
                <RemoteSvgIcon
                  url={slideData?.icon?.__icon_url__ || ""}
                  strokeColor="currentColor"
                  className="w-12 h-12"
                  color={professionalColors.secondaryText}
                  title={slideData?.icon?.__icon_query__ || ""}
                />
              </div>
            </div>

            {/* Section Title */}
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: professionalColors.primaryText }}
            >
              {slideData?.sectionTitle || "Core Concepts"}
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
          <span
            className="text-xs"
            style={{ color: professionalColors.secondaryText }}
          >
            Do not share without permission
          </span>
          <span
            className="text-xs"
            style={{ color: professionalColors.secondaryText }}
          >
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
