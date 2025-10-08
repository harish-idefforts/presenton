import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '12-hierarchical-framework';
export const layoutName = 'Hierarchical Framework';
export const layoutDescription = 'Multi-level structure showing parent-child relationships. Use for organizational charts, decision trees, or layered models.';

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
  frameworkTitle: z.string().min(10).max(100).default('Compliance Governance Framework').meta({
    description: "Framework title. Max 100 characters",
  }),
  visualType: z.enum(['pyramid', 'layers']).default('pyramid').meta({
    description: "Visual representation type",
  }),
  levels: z.array(z.object({
    level: z.number().min(1).max(5).meta({
      description: "Level number (1 is top/highest)",
    }),
    title: z.string().min(5).max(50).meta({
      description: "Level title. Keep short and clear. Max 50 characters",
    }),
    description: z.string().min(10).max(60).meta({
      description: "Level description. MUST be SHORT - maximum 60 characters total. Write ONE short phrase only, NOT a full sentence or paragraph.",
    }),
  })).min(3).max(5).default([
    { level: 1, title: 'Strategic Leadership', description: 'Board oversight and compliance vision setting' },
    { level: 2, title: 'Policy & Governance', description: 'Framework and policy development' },
    { level: 3, title: 'Operational Management', description: 'Day-to-day compliance implementation' },
    { level: 4, title: 'Risk & Controls', description: 'Risk assessment and control measures' },
    { level: 5, title: 'Frontline Execution', description: 'Daily practices and documentation' },
  ]).meta({
    description: "3-5 hierarchy levels",
  }),
  supportingPoints: z.array(z.object({
    title: z.string().min(5).max(40).meta({
      description: "Supporting point title. Max 40 characters",
    }),
    description: z.string().min(10).max(60).meta({
      description: "Supporting point description. MUST be SHORT - max 60 characters. Brief phrase only.",
    }),
  })).optional().default([
    { title: 'Communication Flow', description: 'Information sharing across all levels' },
    { title: 'Accountability', description: 'Clear ownership at each level' },
  ]).meta({
    description: "Optional supporting information",
  }),
});

interface HierarchicalFrameworkSlideProps {
  data?: Partial<HierarchicalFrameworkSlideData>;
}

const HierarchicalFrameworkSlide: React.FC<HierarchicalFrameworkSlideProps> = ({ data: slideData }) => {
  const frameworkTitle = slideData?.frameworkTitle || 'Compliance Governance Framework';
  const visualType = slideData?.visualType || 'pyramid';
  const levels = slideData?.levels || [
    { level: 1, title: 'Strategic Leadership', description: 'Board and C-Suite oversight, setting compliance vision and culture' },
    { level: 2, title: 'Policy & Governance', description: 'Framework development, policy creation, and governance structure' },
    { level: 3, title: 'Operational Management', description: 'Implementation, monitoring, and day-to-day compliance activities' },
    { level: 4, title: 'Risk & Controls', description: 'Risk assessment, control implementation, and mitigation strategies' },
    { level: 5, title: 'Frontline Execution', description: 'Daily compliance practices, documentation, and reporting' },
  ];
  const supportingPoints = slideData?.supportingPoints;

  // Sort levels to ensure proper order (1 = top)
  const sortedLevels = [...levels].sort((a, b) => a.level - b.level);

  // Define level colors (darker at top, lighter at bottom)
  const pyramidColors = [
    professionalColors.secondaryText,
    professionalColors.warning,
    professionalColors.success,
    professionalColors.accent,
    professionalColors.borderLight,
  ];

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
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/crown-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color={professionalColors.secondaryText}
                title="Framework"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.secondaryText }}>
                ORGANIZATIONAL STRUCTURE
              </p>
              <h1 className="text-3xl font-bold" style={{ color: professionalColors.primaryText }}>
                {frameworkTitle}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Pyramid/Layers Visualization - Takes 2 columns */}
          <div className="lg:col-span-2">
            {visualType === 'pyramid' ? (
              // Pyramid Visualization
              <div className="flex flex-col items-center space-y-2">
                {sortedLevels.map((level, index) => {
                  const width = 100 - (index * 15); // Narrower at top
                  return (
                    <div
                      key={level.level}
                      className="relative flex items-center justify-center text-center"
                      style={{
                        width: `${width}%`,
                        minHeight: '60px',
                        backgroundColor: pyramidColors[index] || pyramidColors[pyramidColors.length - 1],
                        clipPath: index === 0 ? 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)' : undefined,
                        borderRadius: index === 0 ? '0' : '0.5rem',
                      }}
                    >
                      <div className="px-4 py-2 flex flex-col items-center">
                        <span className="text-white text-xs font-bold mb-0.5">
                          LEVEL {level.level}
                        </span>
                        <h3 className="text-white font-bold text-base mb-0.5">
                          {level.title}
                        </h3>
                        <p className="text-white/90 text-xs max-w-md leading-tight">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Layers Visualization
              <div className="space-y-2">
                {sortedLevels.map((level, index) => (
                  <div
                    key={level.level}
                    className="relative rounded-xl p-3 shadow-md"
                    style={{
                      backgroundColor: professionalColors.cardBg,
                      borderLeft: `4px solid ${pyramidColors[index] || pyramidColors[pyramidColors.length - 1]}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: pyramidColors[index] || pyramidColors[pyramidColors.length - 1],
                        }}
                      >
                        <span className="text-white font-bold text-base">
                          {level.level}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1" style={{ color: professionalColors.primaryText }}>
                          {level.title}
                        </h3>
                        <p className="text-sm leading-snug" style={{ color: professionalColors.secondaryText }}>
                          {level.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Supporting Information - Takes 1 column */}
          <div className="space-y-3">
            {/* Key Principles Card */}
            <div className="p-3 rounded-xl shadow-md" style={{ backgroundColor: professionalColors.cardBg }}>
              <div className="flex items-start gap-2 mb-2">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg"
                  strokeColor="currentColor"
                  className="w-5 h-5 mt-0.5"
                  color={professionalColors.secondaryText}
                  title="Key Principles"
                />
                <h3 className="text-base font-bold" style={{ color: professionalColors.primaryText }}>
                  Key Principles
                </h3>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span style={{ color: professionalColors.success }}>✓</span>
                  <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
                    Clear lines of authority
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span style={{ color: professionalColors.success }}>✓</span>
                  <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
                    Defined responsibilities
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span style={{ color: professionalColors.success }}>✓</span>
                  <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
                    Regular reporting flow
                  </span>
                </li>
              </ul>
            </div>

            {/* Supporting Points */}
            {supportingPoints && supportingPoints.length > 0 && (
              <div className="space-y-2">
                {supportingPoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-xl"
                    style={{
                      backgroundColor: professionalColors.accent + '10',
                      borderLeft: `3px solid ${professionalColors.accent}`,
                    }}
                  >
                    <h4 className="font-bold text-sm mb-1" style={{ color: professionalColors.primaryText }}>
                      {point.title}
                    </h4>
                    <p className="text-xs leading-snug" style={{ color: professionalColors.secondaryText }}>
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Implementation Note */}
            <div className="p-2.5 rounded-lg" style={{ backgroundColor: professionalColors.warning + '15' }}>
              <div className="flex items-start gap-1.5">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                  strokeColor="currentColor"
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  color={professionalColors.warning}
                  title="Note"
                />
                <p className="text-xs leading-snug" style={{ color: professionalColors.secondaryText }}>
                  Each level builds upon the foundation of the levels below, creating a comprehensive governance structure.
                </p>
              </div>
            </div>
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
export type HierarchicalFrameworkSlideData = z.infer<typeof Schema>;

export default HierarchicalFrameworkSlide;