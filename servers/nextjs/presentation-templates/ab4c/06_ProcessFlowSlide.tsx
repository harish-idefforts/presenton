import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '06-process-flow-slide';
export const layoutName = 'Process Flow';
export const layoutDescription = 'Step-by-step workflow visualization with arrows and icons. Ideal for explaining procedures, methodologies, or sequential processes in training.';

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
  processTitle: z.string().min(3).max(80).default('Implementation Process').meta({
    description: "Main process title",
  }),
  processDescription: z.string().min(10).max(200).optional().default('Follow these steps to ensure successful implementation and optimal results').meta({
    description: "Optional process description",
  }),
  flowDirection: z.enum(['horizontal', 'vertical']).default('horizontal').meta({
    description: "Direction of process flow",
  }),
  steps: z.array(z.object({
    number: z.number().int().min(1).max(8),
    title: z.string().min(3).max(50),
    description: z.string().min(10).max(150),
    icon: IconSchema.default({
      __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/arrow-right-bold.svg',
      __icon_query__: 'arrow step process'
    })
  })).min(3).max(6).default([
    {
      number: 1,
      title: 'Analysis',
      description: 'Assess current situation and identify opportunities for improvement',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/magnifying-glass-bold.svg',
        __icon_query__: 'search analysis magnifying'
      }
    },
    {
      number: 2,
      title: 'Planning',
      description: 'Develop comprehensive strategy and allocate necessary resources',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/clipboard-bold.svg',
        __icon_query__: 'clipboard planning document'
      }
    },
    {
      number: 3,
      title: 'Execution',
      description: 'Implement the plan with clear milestones and accountability',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/play-bold.svg',
        __icon_query__: 'play execute action'
      }
    },
    {
      number: 4,
      title: 'Monitoring',
      description: 'Track progress and adjust approach based on real-time feedback',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/eye-bold.svg',
        __icon_query__: 'eye monitor watch'
      }
    },
    {
      number: 5,
      title: 'Optimization',
      description: 'Refine processes and implement continuous improvements',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
        __icon_query__: 'gear settings optimize'
      }
    }
  ]).meta({
    description: "Process steps with titles, descriptions, and icons",
  }),
});

export { Schema };
export type ProcessFlowSlideData = z.infer<typeof Schema>;

interface ProcessFlowSlideProps {
  data?: Partial<ProcessFlowSlideData>;
}

const ProcessFlowSlide: React.FC<ProcessFlowSlideProps> = ({ data: slideData }) => {
  const steps = slideData?.steps || [];
  const isHorizontal = slideData?.flowDirection === 'horizontal';

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
            {slideData?.processTitle || 'Implementation Process'}
          </h1>
          {slideData?.processDescription && (
            <p
              className="text-base mt-2"
              style={{ color: professionalColors.secondaryText }}
            >
              {slideData.processDescription}
            </p>
          )}
          <div style={{ backgroundColor: professionalColors.accent }} className="h-1 w-24 mt-4" />
        </div>

        {/* Process Flow Content */}
        <div className="flex-1 px-12 pb-20 overflow-hidden flex items-center">
          {isHorizontal ? (
            // Horizontal Flow
            <div className="w-full">
              <div className="flex items-center justify-between relative">
                {/* Connection Line */}
                <div
                  className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0"
                  style={{ backgroundColor: professionalColors.borderLight }}
                />

                {steps.map((step, index) => (
                  <div key={index} className="relative z-10 flex flex-col items-center">
                    {/* Step Circle */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-4"
                      style={{
                        backgroundColor: professionalColors.cardBg,
                        border: `3px solid ${professionalColors.accent}`
                      }}
                    >
                      <RemoteSvgIcon
                        url={step.icon.__icon_url__}
                        strokeColor="currentColor"
                        className="w-10 h-10"
                        color={professionalColors.accent}
                        title={step.icon.__icon_query__}
                      />
                    </div>

                    {/* Step Number */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: professionalColors.success,
                        color: professionalColors.cardBg
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="text-center max-w-[180px]">
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: professionalColors.primaryText }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: professionalColors.secondaryText }}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow to next step */}
                    {index < steps.length - 1 && (
                      <div
                        className="absolute top-10 -right-8 transform translate-x-1/2"
                        style={{ color: professionalColors.accent }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 12h14m-7-7l7 7-7 7"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Vertical Flow
            <div className="w-full max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6">
                    {/* Step Number & Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-md"
                        style={{
                          backgroundColor: professionalColors.accent,
                          color: professionalColors.cardBg
                        }}
                      >
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className="w-0.5 h-24 mt-2"
                          style={{ backgroundColor: professionalColors.borderLight }}
                        />
                      )}
                    </div>

                    {/* Step Card */}
                    <div
                      className="flex-1 p-5 rounded-xl shadow-sm mb-4"
                      style={{
                        backgroundColor: professionalColors.cardBg,
                        borderLeft: `4px solid ${professionalColors.accent}`
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${professionalColors.accent}15` }}
                        >
                          <RemoteSvgIcon
                            url={step.icon.__icon_url__}
                            strokeColor="currentColor"
                            className="w-6 h-6"
                            color={professionalColors.accent}
                            title={step.icon.__icon_query__}
                          />
                        </div>
                        <div>
                          <h3
                            className="text-lg font-semibold mb-2"
                            style={{ color: professionalColors.primaryText }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: professionalColors.secondaryText }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-12 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill={professionalColors.accent}>
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="25" fill={professionalColors.background} />
            <circle cx="50" cy="50" r="10" fill={professionalColors.accent} />
          </svg>
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

export default ProcessFlowSlide;