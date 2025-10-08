import React from 'react';
import * as z from "zod";
import { IconSchema, ImageSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '05-key-points-with-icons-slide';
export const layoutName = 'Key Points with Icons';
export const layoutDescription = 'Numbered or bulleted list with icons and descriptions. Perfect for highlighting important concepts, steps, or principles with visual emphasis.';

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
  title: z.string().min(3).max(80).default('Key Points to Remember').meta({
    description: "Main title for the slide",
  }),
  subtitle: z.string().min(10).max(200).optional().default('Essential concepts that form the foundation of our approach').meta({
    description: "Optional subtitle or description",
  }),
  listType: z.enum(['numbered', 'bulleted']).default('numbered').meta({
    description: "List style - numbered or bulleted",
  }),
  supportingImage: ImageSchema.optional().default({
    __image_url__: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    __image_prompt__: 'Professional workspace with notes and planning'
  }).meta({
    description: "Optional supporting image",
  }),
  points: z.array(z.object({
    title: z.string().min(3).max(80).meta({
      description: "Point title. Keep concise. Max 80 characters.",
    }),
    description: z.string().min(10).max(200).meta({
      description: "Point description. MUST be concise and fit within 200 characters. Be brief and direct - no long paragraphs.",
    }),
    icon: IconSchema.default({
      __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg',
      __icon_query__: 'check point item'
    })
  })).min(3).max(5).default([
    {
      title: 'Clear Communication',
      description: 'Establish transparent channels and regular updates to ensure alignment across all stakeholders',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg',
        __icon_query__: 'chat communication message'
      }
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Leverage analytics and metrics to guide strategic choices and measure success effectively',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-bar-bold.svg',
        __icon_query__: 'chart data analytics'
      }
    },
    {
      title: 'Continuous Improvement',
      description: 'Foster a culture of learning and adaptation to stay ahead in evolving markets',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-bold.svg',
        __icon_query__: 'trending up growth improvement'
      }
    },
    {
      title: 'Team Collaboration',
      description: 'Build strong partnerships and encourage cross-functional cooperation for optimal results',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-bold.svg',
        __icon_query__: 'users team collaboration'
      }
    }
  ]).meta({
    description: "List of key points with titles, descriptions, and icons",
  }),
});

export { Schema };
export type KeyPointsWithIconsSlideData = z.infer<typeof Schema>;

interface KeyPointsWithIconsSlideProps {
  data?: Partial<KeyPointsWithIconsSlideData>;
}

const KeyPointsWithIconsSlide: React.FC<KeyPointsWithIconsSlideProps> = ({ data: slideData }) => {
  const points = slideData?.points || [];
  const isNumbered = slideData?.listType === 'numbered';

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
        {/* Header */}
        <div className="px-12 pt-6 pb-3">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: professionalColors.primaryText }}
          >
            {slideData?.title || 'Key Points to Remember'}
          </h1>
          {slideData?.subtitle && (
            <p
              className="text-base mt-2"
              style={{ color: professionalColors.secondaryText }}
            >
              {slideData.subtitle}
            </p>
          )}
          <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-24 mt-2" />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-12 pb-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Points List - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="grid gap-2">
                {points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl"
                    style={{
                      backgroundColor: professionalColors.cardBg,
                      borderLeft: `3px solid ${professionalColors.accent}`
                    }}
                  >
                    {/* Number or Icon */}
                    <div className="flex-shrink-0">
                      {isNumbered ? (
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{
                            backgroundColor: `${professionalColors.accent}15`,
                            color: professionalColors.accent
                          }}
                        >
                          {index + 1}
                        </div>
                      ) : (
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${professionalColors.accent}15` }}
                        >
                          <RemoteSvgIcon
                            url={point.icon.__icon_url__}
                            strokeColor="currentColor"
                            className="w-4 h-4"
                            color={professionalColors.secondaryText}
                            title={point.icon.__icon_query__}
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className="text-base font-semibold mb-1 leading-snug"
                        style={{ color: professionalColors.primaryText }}
                      >
                        {point.title}
                      </h3>
                      <p
                        className="text-sm leading-snug"
                        style={{ color: professionalColors.secondaryText }}
                      >
                        {point.description}
                      </p>
                    </div>

                    {/* Icon (if numbered list) */}
                    {isNumbered && (
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${professionalColors.success}10` }}
                      >
                        <RemoteSvgIcon
                          url={point.icon.__icon_url__}
                          strokeColor="currentColor"
                          className="w-4 h-4"
                          color={professionalColors.success}
                          title={point.icon.__icon_query__}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Image - Takes 1 column */}
            <div className="lg:col-span-1 flex items-start pt-4">
              {slideData?.supportingImage?.__image_url__ && (
                <div className="relative w-full h-full max-h-80">
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      backgroundColor: professionalColors.accent,
                      transform: 'rotate(2deg)'
                    }}
                  />
                  <img
                    src={slideData.supportingImage.__image_url__}
                    alt={slideData.supportingImage.__image_prompt__ || ''}
                    className="relative w-full h-full object-cover rounded-xl shadow-lg"
                  />

                  {/* Decorative element */}
                  <div
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full"
                    style={{ backgroundColor: professionalColors.warning }}
                  >
                    <svg
                      className="w-full h-full p-2.5"
                      viewBox="0 0 24 24"
                      fill={professionalColors.cardBg}
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* If no image, show decorative element */}
              {!slideData?.supportingImage?.__image_url__ && (
                <div className="w-full flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-40 h-40 rounded-full opacity-10"
                      style={{ backgroundColor: professionalColors.accent }}
                    />
                    <div
                      className="absolute inset-6 rounded-full opacity-20"
                      style={{ backgroundColor: professionalColors.success }}
                    />
                    <div
                      className="absolute inset-12 rounded-full opacity-30"
                      style={{ backgroundColor: professionalColors.warning }}
                    />
                  </div>
                </div>
              )}
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

export default KeyPointsWithIconsSlide;