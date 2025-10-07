import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '02-training-objectives-slide';
export const layoutName = 'Training Objectives';
export const layoutDescription = 'Display training goals, duration, target audience, and expected outcomes with visual icons. Essential for setting expectations at the beginning of any professional training session.';

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
  title: z.string().min(3).max(50).default('Training Objectives').meta({
    description: "Section title. Default is 'Training Objectives'",
  }),
  duration: z.string().min(5).max(30).default('90 minutes').meta({
    description: "Training duration (e.g., '2 hours', '90 minutes', 'Full day')",
  }),
  targetAudience: z.string().min(10).max(150).default('Team leaders, managers, and professionals seeking to enhance their skills').meta({
    description: "Description of who this training is designed for",
  }),
  objectives: z.array(z.object({
    number: z.number().int().min(1).max(10),
    text: z.string().min(10).max(200),
    icon: IconSchema.default({
      __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/target-bold.svg',
      __icon_query__: 'target goal objective'
    })
  })).min(3).max(5).default([
    {
      number: 1,
      text: 'Understand core concepts and foundational principles',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-bold.svg',
        __icon_query__: 'book learning education'
      }
    },
    {
      number: 2,
      text: 'Apply practical techniques and best practices',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
        __icon_query__: 'gear settings practice'
      }
    },
    {
      number: 3,
      text: 'Develop actionable strategies for implementation',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-bold.svg',
        __icon_query__: 'chart strategy growth'
      }
    },
    {
      number: 4,
      text: 'Enhance collaboration and communication skills',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-bold.svg',
        __icon_query__: 'users team collaboration'
      }
    }
  ]).meta({
    description: "List of training objectives with icons",
  }),
  expectedOutcomes: z.array(z.string().min(10).max(150)).min(2).max(4).default([
    'Improved performance and productivity',
    'Enhanced problem-solving capabilities',
    'Stronger team collaboration'
  ]).meta({
    description: "Expected outcomes after completing the training",
  }),
});

export { Schema };
export type TrainingObjectivesSlideData = z.infer<typeof Schema>;

interface TrainingObjectivesSlideProps {
  data?: Partial<TrainingObjectivesSlideData>;
}

const TrainingObjectivesSlide: React.FC<TrainingObjectivesSlideProps> = ({ data: slideData }) => {
  const objectives = slideData?.objectives || [];
  const outcomes = slideData?.expectedOutcomes || [];

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
        {/* Header Section */}
        <div className="px-12 pt-6">
          <h1
            className="text-4xl lg:text-5xl font-bold mb-2"
            style={{ color: professionalColors.primaryText }}
          >
            {slideData?.title || 'Training Objectives'}
          </h1>
          <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-24 mb-4" />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-12 pb-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column - Duration & Audience */}
            <div className="lg:col-span-1 space-y-4">
              {/* Duration Card */}
              <div
                className="p-4 rounded-xl shadow-sm"
                style={{ backgroundColor: professionalColors.cardBg }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${professionalColors.accent}15` }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={professionalColors.accent}
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: professionalColors.primaryText }}
                    >
                      Duration
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: professionalColors.secondaryText }}
                    >
                      {slideData?.duration || '90 minutes'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Audience Card */}
              <div
                className="p-4 rounded-xl shadow-sm"
                style={{ backgroundColor: professionalColors.cardBg }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${professionalColors.success}15` }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={professionalColors.success}
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: professionalColors.primaryText }}
                    >
                      Target Audience
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: professionalColors.secondaryText }}
                    >
                      {slideData?.targetAudience || 'Team leaders, managers, and professionals'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expected Outcomes */}
              {outcomes.length > 0 && (
                <div
                  className="p-4 rounded-xl shadow-sm"
                  style={{ backgroundColor: professionalColors.cardBg }}
                >
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: professionalColors.primaryText }}
                  >
                    Expected Outcomes
                  </h3>
                  <ul className="space-y-2">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={professionalColors.success}
                          className="mt-0.5 flex-shrink-0"
                        >
                          <path d="M9 11l3 3L22 4"/>
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                        </svg>
                        <span
                          className="text-sm"
                          style={{ color: professionalColors.secondaryText }}
                        >
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Objectives */}
            <div className="lg:col-span-2">
              <div className="grid gap-3">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
                    style={{
                      backgroundColor: professionalColors.cardBg,
                      borderLeft: `4px solid ${professionalColors.accent}`
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${professionalColors.accent}15` }}
                    >
                      <RemoteSvgIcon
                        url={objective.icon.__icon_url__}
                        strokeColor="currentColor"
                        className="w-6 h-6"
                        color={professionalColors.accent}
                        title={objective.icon.__icon_query__}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: professionalColors.accent }}
                        >
                          {objective.number}
                        </span>
                        <p
                          className="text-base leading-relaxed"
                          style={{ color: professionalColors.primaryText }}
                        >
                          {objective.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

export default TrainingObjectivesSlide;