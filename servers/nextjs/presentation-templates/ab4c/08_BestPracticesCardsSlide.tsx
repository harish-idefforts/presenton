import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '08-best-practices-cards-slide';
export const layoutName = 'Best Practices Cards';
export const layoutDescription = 'Display do\'s and don\'ts or best practices with visual cards and icons. Great for guidelines, recommendations, and practical advice in training.';

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
  title: z.string().min(3).max(80).default('Best Practices').meta({
    description: "Main title for best practices",
  }),
  subtitle: z.string().min(10).max(200).optional().default('Follow these guidelines to ensure success and avoid common pitfalls').meta({
    description: "Optional subtitle",
  }),
  practices: z.array(z.object({
    type: z.enum(['do', 'dont', 'tip']).default('do'),
    title: z.string().min(3).max(60),
    description: z.string().min(10).max(150),
    icon: IconSchema.default({
      __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-bold.svg',
      __icon_query__: 'check success do'
    }),
    examples: z.array(z.string().min(5).max(100)).min(1).max(3).optional()
  })).min(3).max(6).default([
    {
      type: 'do',
      title: 'Communicate Clearly',
      description: 'Use simple, direct language and confirm understanding with all stakeholders',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg',
        __icon_query__: 'check success approved'
      },
      examples: [
        'Send follow-up emails after meetings',
        'Use visual aids to explain concepts',
        'Ask for feedback regularly'
      ]
    },
    {
      type: 'do',
      title: 'Document Everything',
      description: 'Maintain comprehensive records of decisions, processes, and outcomes',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/file-text-bold.svg',
        __icon_query__: 'document file text'
      },
      examples: [
        'Keep meeting minutes',
        'Update project documentation',
        'Track changes and versions'
      ]
    },
    {
      type: 'dont',
      title: 'Avoid Assumptions',
      description: 'Never assume understanding or agreement without explicit confirmation',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/x-circle-bold.svg',
        __icon_query__: 'x cancel wrong dont'
      },
      examples: [
        "Don't skip verification steps",
        "Don't assume prior knowledge",
        "Don't bypass approval processes"
      ]
    },
    {
      type: 'dont',
      title: 'Skip Planning',
      description: 'Rushing into execution without proper planning leads to costly mistakes',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/warning-bold.svg',
        __icon_query__: 'warning alert caution'
      },
      examples: [
        'Avoid starting without clear goals',
        'Never skip risk assessment',
        'Don\'t ignore dependencies'
      ]
    },
    {
      type: 'tip',
      title: 'Leverage Technology',
      description: 'Use appropriate tools and automation to increase efficiency',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
        __icon_query__: 'lightbulb idea tip'
      },
      examples: [
        'Automate repetitive tasks',
        'Use collaboration platforms',
        'Implement tracking systems'
      ]
    }
  ]).meta({
    description: "List of best practices with type (do/dont/tip), descriptions, and examples",
  }),
});

export { Schema };
export type BestPracticesCardsSlideData = z.infer<typeof Schema>;

interface BestPracticesCardsSlideProps {
  data?: Partial<BestPracticesCardsSlideData>;
}

const BestPracticesCardsSlide: React.FC<BestPracticesCardsSlideProps> = ({ data: slideData }) => {
  const practices = slideData?.practices || [];

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'do': return professionalColors.success;
      case 'dont': return professionalColors.danger;
      case 'tip': return professionalColors.warning;
      default: return professionalColors.accent;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'do': return 'DO';
      case 'dont': return "DON'T";
      case 'tip': return 'TIP';
      default: return type.toUpperCase();
    }
  };

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
        <div className="px-12 pt-10 pb-4">
          <h1
            className="text-4xl lg:text-5xl font-bold mb-2"
            style={{ color: professionalColors.primaryText }}
          >
            {slideData?.title || 'Best Practices'}
          </h1>
          {slideData?.subtitle && (
            <p
              className="text-base mt-2"
              style={{ color: professionalColors.secondaryText }}
            >
              {slideData.subtitle}
            </p>
          )}
          <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-24 mt-4" />
        </div>

        {/* Practice Cards */}
        <div className="flex-1 px-12 pb-20 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practices.map((practice, index) => {
              const typeColor = getTypeColor(practice.type);

              return (
                <div
                  key={index}
                  className="rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
                  style={{ backgroundColor: professionalColors.cardBg }}
                >
                  {/* Card Header with Type */}
                  <div
                    className="px-4 py-2 flex items-center justify-between"
                    style={{ backgroundColor: `${typeColor}15` }}
                  >
                    <span
                      className="text-xs font-bold tracking-wider"
                      style={{ color: typeColor }}
                    >
                      {getTypeLabel(practice.type)}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: typeColor }}
                    >
                      <RemoteSvgIcon
                        url={practice.icon.__icon_url__}
                        strokeColor="currentColor"
                        className="w-5 h-5"
                        color={professionalColors.cardBg}
                        title={practice.icon.__icon_query__}
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3
                      className="font-semibold text-base mb-2"
                      style={{ color: professionalColors.primaryText }}
                    >
                      {practice.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: professionalColors.secondaryText }}
                    >
                      {practice.description}
                    </p>

                    {/* Examples */}
                    {practice.examples && practice.examples.length > 0 && (
                      <div
                        className="pt-3 border-t"
                        style={{ borderColor: professionalColors.borderLight }}
                      >
                        <div className="space-y-1">
                          {practice.examples.map((example, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: typeColor }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: professionalColors.secondaryText }}
                              >
                                {example}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className="h-1"
                    style={{ backgroundColor: typeColor }}
                  />
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: professionalColors.success }}
              />
              <span
                className="text-xs"
                style={{ color: professionalColors.secondaryText }}
              >
                Recommended Actions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: professionalColors.danger }}
              />
              <span
                className="text-xs"
                style={{ color: professionalColors.secondaryText }}
              >
                Actions to Avoid
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: professionalColors.warning }}
              />
              <span
                className="text-xs"
                style={{ color: professionalColors.secondaryText }}
              >
                Helpful Tips
              </span>
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

export default BestPracticesCardsSlide;