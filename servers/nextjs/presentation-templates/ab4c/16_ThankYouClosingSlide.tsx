import React from "react";
import { z } from "zod";
import { RemoteSvgIcon } from "@/app/hooks/useRemoteSvgIcon";

export const layoutId = "16-thank-you-closing";
export const layoutName = "Thank You & Closing";
export const layoutDescription =
  "Final slide with closing message and call-to-action. Use as the last slide of the presentation.";
export const isTerminal = true;

// Professional color palette
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

// Schema for AI content generation
const Schema = z.object({
  message: z
    .string()
    .min(10)
    .max(200)
    .default(
      "Thank you for your participation and commitment to excellence in compliance."
    )
    .meta({
      description: "Thank you message. Max 200 characters",
    }),
  presenter: z
    .object({
      name: z.string().min(3).max(50).meta({
        description: "Presenter name",
      }),
      title: z.string().min(5).max(100).meta({
        description: "Presenter title/position",
      }),
      email: z.string().email().meta({
        description: "Presenter email",
      }),
    })
    .default({
      name: "John Smith",
      title: "Senior Compliance Training Manager",
      email: "john.smith@ab4c.com",
    })
    .meta({
      description: "Presenter information",
    }),
  nextSession: z
    .string()
    .min(10)
    .max(200)
    .optional()
    .default("Next Training: Q2 2025 - Advanced Risk Management Strategies")
    .meta({
      description: "Optional next session information. Max 200 characters",
    }),
  websiteUrl: z.string().url().optional().default("https://www.ab4c.com").meta({
    description: "Optional company website URL",
  }),
  feedbackUrl: z
    .string()
    .url()
    .optional()
    .default("https://feedback.ab4c.com/training")
    .meta({
      description: "Optional feedback survey URL",
    }),
});

interface ThankYouClosingSlideProps {
  data?: Partial<ThankYouClosingSlideData>;
}

const ThankYouClosingSlide: React.FC<ThankYouClosingSlideProps> = ({
  data: slideData,
}) => {
  const message =
    slideData?.message ||
    "Thank you for your participation and commitment to excellence in compliance.";
  const presenter = slideData?.presenter || {
    name: "John Smith",
    title: "Senior Compliance Training Manager",
    email: "john.smith@ab4c.com",
  };
  const nextSession = slideData?.nextSession;
  const websiteUrl = slideData?.websiteUrl;
  const feedbackUrl = slideData?.feedbackUrl;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
        style={{
          fontFamily: 'Inter, sans-serif',
          backgroundColor: professionalColors.background
        }}
      >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${professionalColors.accent} 0%, transparent 70%)`,
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${professionalColors.success} 0%, transparent 70%)`,
          }}
        ></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-16 pt-16 pb-24 flex flex-col items-center justify-center relative z-10">
        {/* Thank You Icon and Message */}
        <div className="text-center mb-12">
          <div
            className="w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${professionalColors.accent} 0%, ${professionalColors.success} 100%)`,
            }}
          >
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg"
              strokeColor="currentColor"
              className="w-12 h-12"
              color="#ffffff"
              title="Thank You"
            />
          </div>

          <h1
            className="text-6xl font-bold mb-6"
            style={{ color: professionalColors.primaryText }}
          >
            Thank You!
          </h1>

          <p
            className="text-2xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: professionalColors.secondaryText }}
          >
            {message}
          </p>
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

export { Schema };
export type ThankYouClosingSlideData = z.infer<typeof Schema>;

export default ThankYouClosingSlide;
