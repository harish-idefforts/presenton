import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '03-agenda-timeline-slide';
export const layoutName = 'Agenda Timeline';
export const layoutDescription = 'Visual timeline showing training sections, durations, and progression. Perfect for outlining the structure of any training session with clear time allocations.';

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
  title: z.string().min(3).max(50).default('Training Agenda').meta({
    description: "Agenda title. Default is 'Training Agenda'",
  }),
  totalDuration: z.string().min(5).max(30).default('90 minutes').meta({
    description: "Total training duration",
  }),
  sections: z.array(z.object({
    title: z.string().min(3).max(80),
    duration: z.string().min(3).max(20),
    description: z.string().min(10).max(150).optional(),
    icon: IconSchema.default({
      __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/presentation-bold.svg',
      __icon_query__: 'presentation section'
    }),
    isBreak: z.boolean().optional().default(false)
  })).min(3).max(8).default([
    {
      title: 'Introduction & Welcome',
      duration: '10 min',
      description: 'Opening remarks, introductions, and session overview',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg',
        __icon_query__: 'handshake welcome'
      },
      isBreak: false
    },
    {
      title: 'Core Concepts',
      duration: '25 min',
      description: 'Foundation principles and theoretical framework',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-bold.svg',
        __icon_query__: 'book learning concepts'
      },
      isBreak: false
    },
    {
      title: 'Coffee Break',
      duration: '10 min',
      description: 'Networking and refreshments',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/coffee-bold.svg',
        __icon_query__: 'coffee break rest'
      },
      isBreak: true
    },
    {
      title: 'Practical Application',
      duration: '30 min',
      description: 'Hands-on exercises and real-world scenarios',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wrench-bold.svg',
        __icon_query__: 'tool practice application'
      },
      isBreak: false
    },
    {
      title: 'Group Discussion',
      duration: '20 min',
      description: 'Interactive discussion and experience sharing',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-bold.svg',
        __icon_query__: 'users discussion group'
      },
      isBreak: false
    },
    {
      title: 'Q&A & Closing',
      duration: '15 min',
      description: 'Questions, feedback, and next steps',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg',
        __icon_query__: 'question answer qa'
      },
      isBreak: false
    }
  ]).meta({
    description: "List of agenda sections with durations and descriptions",
  }),
});

export { Schema };
export type AgendaTimelineSlideData = z.infer<typeof Schema>;

interface AgendaTimelineSlideProps {
  data?: Partial<AgendaTimelineSlideData>;
}

const AgendaTimelineSlide: React.FC<AgendaTimelineSlideProps> = ({ data: slideData }) => {
  const sections = slideData?.sections || [];

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
        <div className="px-12 pt-10 pb-6">
          <div className="flex items-end justify-between">
            <div>
              <h1
                className="text-4xl lg:text-5xl font-bold mb-2"
                style={{ color: professionalColors.primaryText }}
              >
                {slideData?.title || 'Training Agenda'}
              </h1>
              <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-24" />
            </div>
            <div
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: `${professionalColors.accent}15` }}
            >
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={professionalColors.accent}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span
                  className="font-semibold"
                  style={{ color: professionalColors.primaryText }}
                >
                  Total: {slideData?.totalDuration || '90 minutes'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 px-12 pb-20 overflow-y-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: professionalColors.borderLight }}
            />

            {/* Timeline Items */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${
                        section.isBreak ? 'opacity-70' : ''
                      }`}
                      style={{
                        backgroundColor: section.isBreak
                          ? `${professionalColors.warning}20`
                          : professionalColors.cardBg,
                        border: `3px solid ${section.isBreak ? professionalColors.warning : professionalColors.accent}`
                      }}
                    >
                      <RemoteSvgIcon
                        url={section.icon.__icon_url__}
                        strokeColor="currentColor"
                        className="w-7 h-7"
                        color={section.isBreak ? professionalColors.warning : professionalColors.accent}
                        title={section.icon.__icon_query__}
                      />
                    </div>

                    {/* Connector to next item */}
                    {index < sections.length - 1 && (
                      <div
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-6"
                        style={{ backgroundColor: professionalColors.borderLight }}
                      />
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`flex-1 p-5 rounded-xl shadow-sm transition-all hover:shadow-md ${
                      section.isBreak ? 'opacity-85' : ''
                    }`}
                    style={{
                      backgroundColor: section.isBreak
                        ? `${professionalColors.warning}10`
                        : professionalColors.cardBg,
                      borderLeft: `4px solid ${section.isBreak ? professionalColors.warning : professionalColors.accent}`
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: professionalColors.primaryText }}
                      >
                        {section.title}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: section.isBreak
                            ? `${professionalColors.warning}20`
                            : `${professionalColors.accent}15`,
                          color: section.isBreak
                            ? professionalColors.warning
                            : professionalColors.accent
                        }}
                      >
                        {section.duration}
                      </span>
                    </div>
                    {section.description && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: professionalColors.secondaryText }}
                      >
                        {section.description}
                      </p>
                    )}

                    {/* Progress indicator */}
                    <div className="mt-3">
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: professionalColors.borderLight }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${((index + 1) / sections.length) * 100}%`,
                            backgroundColor: section.isBreak
                              ? professionalColors.warning
                              : professionalColors.accent
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default AgendaTimelineSlide;