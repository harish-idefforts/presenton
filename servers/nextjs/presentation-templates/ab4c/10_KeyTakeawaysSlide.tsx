import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '10-key-takeaways';
export const layoutName = 'Key Takeaways';
export const layoutDescription = 'Bulleted summary list of main points. Use to conclude sections or presentations and reinforce learning.';

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

// Icon Schema for AI-generated content
const IconSchema = z.object({
  __icon_url__: z.string().default('https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg'),
  __icon_query__: z.string().default('key point icon'),
});

// Schema for AI content generation
const Schema = z.object({
  takeaways: z.array(z.object({
    point: z.string().min(10).max(200).meta({
      description: "Key takeaway point. Max 200 characters for optimal display",
    }),
    icon: IconSchema.meta({
      description: "Icon to represent this takeaway",
    }),
  })).min(3).max(4).default([
    {
      point: 'Always document compliance issues through proper channels',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/clipboard-bold.svg', __icon_query__: 'documentation' },
    },
    {
      point: 'Regular training updates are essential for maintaining standards',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-bold.svg', __icon_query__: 'continuous improvement' },
    },
    {
      point: 'Cross-department collaboration improves overall compliance',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg', __icon_query__: 'collaboration' },
    },
  ]).meta({
    description: "3-4 key takeaway points with icons",
  }),
  nextSteps: z.string().min(20).max(300).optional().default('Apply these principles in your daily work. Your next training session is scheduled for Q2 2025.').meta({
    description: "Optional next steps or follow-up information. Max 300 characters",
  }),
});

interface KeyTakeawaysSlideProps {
  data?: Partial<KeyTakeawaysSlideData>;
}

const KeyTakeawaysSlide: React.FC<KeyTakeawaysSlideProps> = ({ data: slideData }) => {
  const takeaways = slideData?.takeaways || [
    {
      point: 'Always document compliance issues through proper channels',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/clipboard-bold.svg', __icon_query__: 'documentation' },
    },
    {
      point: 'Regular training updates are essential for maintaining standards',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-bold.svg', __icon_query__: 'continuous improvement' },
    },
    {
      point: 'Cross-department collaboration improves overall compliance',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg', __icon_query__: 'collaboration' },
    },
  ];
  const nextSteps = slideData?.nextSteps;

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
        {/* Main Content Area */}
        <div className="flex-1 px-12 pt-6 pb-20">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                 style={{ backgroundColor: professionalColors.accent }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/target-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color="#ffffff"
                title="Key Takeaways"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.secondaryText }}>
                SUMMARY
              </p>
              <h1 className="text-3xl font-bold" style={{ color: professionalColors.primaryText }}>
                Key Takeaways
              </h1>
            </div>
          </div>
        </div>

        {/* Main Takeaways */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          {takeaways.map((takeaway, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl shadow-md"
              style={{ backgroundColor: professionalColors.cardBg }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                   style={{ backgroundColor: professionalColors.accent + '15' }}>
                <RemoteSvgIcon
                  url={takeaway.icon.__icon_url__}
                  strokeColor="currentColor"
                  className="w-5 h-5"
                  color={professionalColors.secondaryText}
                  title={takeaway.icon.__icon_query__}
                />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold leading-snug"
                   style={{ color: professionalColors.primaryText }}>
                  {takeaway.point}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps Section */}
        {nextSteps && (
          <div className="p-3 rounded-xl"
               style={{
                 backgroundColor: professionalColors.success + '15',
                 borderLeft: `3px solid ${professionalColors.success}`
               }}>
            <div className="flex items-start gap-3">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/arrow-right-bold.svg"
                strokeColor="currentColor"
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                color={professionalColors.success}
                title="Next Steps"
              />
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: professionalColors.primaryText }}>
                  Next Steps
                </h3>
                <p className="text-sm leading-snug" style={{ color: professionalColors.secondaryText }}>
                  {nextSteps}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
           style={{ backgroundColor: professionalColors.background }}>
        <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
          Do not share without permission
        </span>
        <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
          © 2025 AB4C Compliance & Customer Relations. All rights reserved.
        </span>
        <img src="/ab4c-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
      </div>
      </div>
    </>
  );
};

export { Schema };
export type KeyTakeawaysSlideData = z.infer<typeof Schema>;

export default KeyTakeawaysSlide;