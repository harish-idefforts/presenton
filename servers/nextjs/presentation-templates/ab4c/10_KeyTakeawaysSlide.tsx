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
  })).min(3).max(5).default([
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
    description: "3-5 key takeaway points with icons",
  }),
  actionItems: z.array(z.string().min(10).max(150)).optional().default([
    'Review your department\'s current compliance procedures',
    'Schedule team training session within next 30 days',
    'Update documentation templates with new standards',
  ]).meta({
    description: "Optional action items for participants. Max 150 characters each",
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
  const actionItems = slideData?.actionItems;
  const nextSteps = slideData?.nextSteps;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden" style={{ backgroundColor: professionalColors.background }}>
      {/* Main Content Area */}
      <div className="flex-1 px-16 pt-16 pb-24">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                 style={{ backgroundColor: professionalColors.accent }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/target-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8"
                color="#ffffff"
                title="Key Takeaways"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.secondaryText }}>
                SUMMARY
              </p>
              <h1 className="text-5xl font-bold" style={{ color: professionalColors.primaryText }}>
                Key Takeaways
              </h1>
            </div>
          </div>
        </div>

        {/* Main Takeaways */}
        <div className="grid grid-cols-1 gap-5 mb-10">
          {takeaways.map((takeaway, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: professionalColors.cardBg }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
                   style={{ backgroundColor: professionalColors.accent + '15' }}>
                <RemoteSvgIcon
                  url={takeaway.icon.__icon_url__}
                  strokeColor="currentColor"
                  className="w-7 h-7"
                  color={professionalColors.secondaryText}
                  title={takeaway.icon.__icon_query__}
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold leading-relaxed"
                   style={{ color: professionalColors.primaryText }}>
                  {takeaway.point}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Items Section */}
        {actionItems && actionItems.length > 0 && (
          <div className="mb-8 p-6 rounded-xl"
               style={{ backgroundColor: professionalColors.warning + '15' }}>
            <div className="flex items-start gap-4">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/play-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6 mt-1 flex-shrink-0"
                color={professionalColors.warning}
                title="Action Items"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-3" style={{ color: professionalColors.primaryText }}>
                  Action Items
                </h2>
                <ul className="space-y-2">
                  {actionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-sm mt-0.5" style={{ color: professionalColors.warning }}>▸</span>
                      <span className="text-base" style={{ color: professionalColors.primaryText }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps Section */}
        {nextSteps && (
          <div className="p-6 rounded-xl"
               style={{
                 backgroundColor: professionalColors.success + '15',
                 borderLeft: `4px solid ${professionalColors.success}`
               }}>
            <div className="flex items-start gap-4">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/arrow-right-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6 mt-1 flex-shrink-0"
                color={professionalColors.success}
                title="Next Steps"
              />
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: professionalColors.primaryText }}>
                  Next Steps
                </h3>
                <p className="text-base leading-relaxed" style={{ color: professionalColors.secondaryText }}>
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
  );
};

export { Schema };
export type KeyTakeawaysSlideData = z.infer<typeof Schema>;

export default KeyTakeawaysSlide;