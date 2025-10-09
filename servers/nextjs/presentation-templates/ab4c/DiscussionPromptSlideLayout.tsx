import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'discussion-prompt';
export const layoutName = 'Discussion Prompt';
export const layoutDescription = 'Open-ended question or prompt for group interaction. Use to facilitate discussion and participant engagement.';

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
  __icon_url__: z.string().default('https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg'),
  __icon_query__: z.string().default('discussion icon'),
});

// Schema for AI content generation
const Schema = z.object({
  topic: z.string().min(10).max(100).default('Improving Cross-Department Communication').meta({
    description: "Discussion topic. Max 100 characters",
  }),
  mainQuestion: z.string().min(20).max(300).default('How can we better facilitate information sharing between departments while maintaining compliance standards?').meta({
    description: "Main discussion question. Max 300 characters",
  }),
  discussionPoints: z.array(z.object({
    point: z.string().min(10).max(200).meta({
      description: "Discussion point or sub-question. Max 200 characters",
    }),
    icon: IconSchema.meta({
      description: "Icon for this discussion point",
    }),
  })).min(3).max(5).default([
    {
      point: 'What are the current barriers to effective communication in your department?',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/warning-bold.svg', __icon_query__: 'barriers' },
    },
    {
      point: 'Share a successful collaboration experience with another department.',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg', __icon_query__: 'collaboration' },
    },
    {
      point: 'What tools or processes would help improve information flow?',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wrench-bold.svg', __icon_query__: 'tools' },
    },
    {
      point: 'How do we balance transparency with confidentiality requirements?',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/eye-bold.svg', __icon_query__: 'balance' },
    },
  ]).meta({
    description: "3-5 discussion points or questions",
  }),
  timeAllocation: z.string().min(5).max(20).default('15 minutes').meta({
    description: "Time allocated for discussion",
  }),
  groupInstructions: z.string().min(20).max(200).optional().default('Break into groups of 4-5 people. Discuss each point and be prepared to share key insights with the larger group.').meta({
    description: "Optional group activity instructions. Max 200 characters",
  }),
});

interface DiscussionPromptSlideProps {
  data?: Partial<DiscussionPromptSlideData>;
}

const DiscussionPromptSlide: React.FC<DiscussionPromptSlideProps> = ({ data: slideData }) => {
  const topic = slideData?.topic || 'Improving Cross-Department Communication';
  const mainQuestion = slideData?.mainQuestion || 'How can we better facilitate information sharing between departments while maintaining compliance standards?';
  const discussionPoints = slideData?.discussionPoints || [
    {
      point: 'What are the current barriers to effective communication in your department?',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/warning-bold.svg', __icon_query__: 'barriers' },
    },
    {
      point: 'Share a successful collaboration experience with another department.',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg', __icon_query__: 'collaboration' },
    },
    {
      point: 'What tools or processes would help improve information flow?',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wrench-bold.svg', __icon_query__: 'tools' },
    },
    {
      point: 'How do we balance transparency with confidentiality requirements?',
      icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/eye-bold.svg', __icon_query__: 'balance' },
    },
  ];
  const timeAllocation = slideData?.timeAllocation || '15 minutes';
  const groupInstructions = slideData?.groupInstructions;

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                   style={{ backgroundColor: professionalColors.accent }}>
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
                  strokeColor="currentColor"
                  className="w-6 h-6"
                  color={professionalColors.secondaryText}
                  title="Group Discussion"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider"
                   style={{ color: professionalColors.secondaryText }}>
                  GROUP DISCUSSION
                </p>
                <h1 className="text-3xl font-bold" style={{ color: professionalColors.primaryText }}>
                  {topic}
                </h1>
              </div>
            </div>

            {/* Time Allocation Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                 style={{ backgroundColor: professionalColors.warning + '20' }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/play-bold.svg"
                strokeColor="currentColor"
                className="w-4 h-4"
                color={professionalColors.warning}
                title="Time"
              />
              <span className="font-semibold text-xs" style={{ color: professionalColors.primaryText }}>
                {timeAllocation}
              </span>
            </div>
          </div>
        </div>

        {/* Main Question */}
        <div className="mb-4 p-4 rounded-xl shadow-lg"
             style={{
               background: `linear-gradient(135deg, ${professionalColors.accent}15 0%, ${professionalColors.accent}05 100%)`,
               borderLeft: `4px solid ${professionalColors.accent}`,
             }}>
          <div className="flex items-start gap-3">
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
              strokeColor="currentColor"
              className="w-6 h-6 mt-1 flex-shrink-0"
              color={professionalColors.secondaryText}
              title="Main Question"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                 style={{ color: professionalColors.secondaryText }}>
                CENTRAL QUESTION
              </p>
              <p className="text-lg font-semibold leading-snug"
                 style={{ color: professionalColors.primaryText }}>
                {mainQuestion}
              </p>
            </div>
          </div>
        </div>

        {/* Discussion Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {discussionPoints.map((point, index) => (
            <div
              key={index}
              className="p-3 rounded-xl shadow-md"
              style={{ backgroundColor: professionalColors.cardBg }}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                     style={{ backgroundColor: professionalColors.accent }}>
                  <span className="font-bold text-base" style={{ color: professionalColors.secondaryText }}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <RemoteSvgIcon
                      url={point.icon.__icon_url__}
                      strokeColor="currentColor"
                      className="w-4 h-4"
                      color={professionalColors.secondaryText}
                      title={point.icon.__icon_query__}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: professionalColors.secondaryText }}>
                      DISCUSSION POINT
                    </span>
                  </div>
                  <p className="text-sm leading-snug"
                     style={{ color: professionalColors.primaryText }}>
                    {point.point}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Group Instructions */}
        {groupInstructions && (
          <div className="p-3 rounded-xl mb-3"
               style={{ backgroundColor: professionalColors.success + '15' }}>
            <div className="flex items-start gap-3">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-bold.svg"
                strokeColor="currentColor"
                className="w-5 h-5 mt-1 flex-shrink-0"
                color={professionalColors.success}
                title="Group Activity"
              />
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: professionalColors.primaryText }}>
                  Activity Instructions
                </h3>
                <p className="text-xs leading-snug" style={{ color: professionalColors.secondaryText }}>
                  {groupInstructions}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Tips */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg"
              strokeColor="currentColor"
              className="w-4 h-4"
              color={professionalColors.secondaryText}
              title="Share"
            />
            <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
              Share experiences
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
              strokeColor="currentColor"
              className="w-4 h-4"
              color={professionalColors.secondaryText}
              title="Ideas"
            />
            <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
              Propose solutions
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg"
              strokeColor="currentColor"
              className="w-4 h-4"
              color={professionalColors.secondaryText}
              title="Collaborate"
            />
            <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
              Build consensus
            </span>
          </div>
        </div>
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
export type DiscussionPromptSlideData = z.infer<typeof Schema>;

export default DiscussionPromptSlide;