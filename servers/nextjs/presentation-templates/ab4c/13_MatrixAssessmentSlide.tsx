import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '13-matrix-assessment';
export const layoutName = 'Matrix Assessment';
export const layoutDescription = 'Grid or matrix for comparing items across criteria. Use for evaluations, comparisons, or decision frameworks.';

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
  matrixTitle: z.string().min(10).max(100).default('Risk Impact Assessment Matrix').meta({
    description: "Matrix title. Max 100 characters",
  }),
  items: z.array(z.object({
    name: z.string().min(3).max(50).meta({
      description: "Item name. Max 50 characters",
    }),
    xValue: z.enum(['low', 'medium', 'high']).meta({
      description: "X-axis value (horizontal position)",
    }),
    yValue: z.enum(['low', 'medium', 'high']).meta({
      description: "Y-axis value (vertical position)",
    }),
    description: z.string().min(10).max(150).optional().meta({
      description: "Optional item description. Max 150 characters",
    }),
  })).min(3).max(9).default([
    { name: 'Data Breach', xValue: 'high', yValue: 'high', description: 'Critical risk requiring immediate attention' },
    { name: 'Documentation Gaps', xValue: 'medium', yValue: 'medium', description: 'Moderate risk with scheduled remediation' },
    { name: 'Training Updates', xValue: 'low', yValue: 'medium', description: 'Preventive measure for compliance' },
    { name: 'Policy Review', xValue: 'medium', yValue: 'low', description: 'Routine governance activity' },
    { name: 'System Upgrade', xValue: 'high', yValue: 'medium', description: 'Technology modernization initiative' },
  ]).meta({
    description: "3-9 items to place on the matrix",
  }),
  xAxisLabel: z.string().min(5).max(30).default('Likelihood / Frequency').meta({
    description: "X-axis label. Max 30 characters",
  }),
  yAxisLabel: z.string().min(5).max(30).default('Impact / Severity').meta({
    description: "Y-axis label. Max 30 characters",
  }),
});

interface MatrixAssessmentSlideProps {
  data?: Partial<MatrixAssessmentSlideData>;
}

const MatrixAssessmentSlide: React.FC<MatrixAssessmentSlideProps> = ({ data: slideData }) => {
  const matrixTitle = slideData?.matrixTitle || 'Risk Impact Assessment Matrix';
  const items = slideData?.items || [
    { name: 'Data Breach', xValue: 'high', yValue: 'high', description: 'Critical risk requiring immediate attention' },
    { name: 'Documentation Gaps', xValue: 'medium', yValue: 'medium', description: 'Moderate risk with scheduled remediation' },
    { name: 'Training Updates', xValue: 'low', yValue: 'medium', description: 'Preventive measure for compliance' },
    { name: 'Policy Review', xValue: 'medium', yValue: 'low', description: 'Routine governance activity' },
    { name: 'System Upgrade', xValue: 'high', yValue: 'medium', description: 'Technology modernization initiative' },
  ];
  const xAxisLabel = slideData?.xAxisLabel || 'Likelihood / Frequency';
  const yAxisLabel = slideData?.yAxisLabel || 'Impact / Severity';

  // Define matrix cell colors
  const getCellColor = (x: string, y: string): string => {
    if ((x === 'high' && y === 'high') || (x === 'high' && y === 'medium') || (x === 'medium' && y === 'high')) {
      return professionalColors.danger + '20'; // High risk - red
    } else if ((x === 'low' && y === 'low')) {
      return professionalColors.success + '20'; // Low risk - green
    } else {
      return professionalColors.warning + '20'; // Medium risk - yellow
    }
  };

  // Get items for a specific cell
  const getItemsForCell = (x: string, y: string) => {
    return items.filter(item => item.xValue === x && item.yValue === y);
  };

  // Grid positions
  const xPositions = ['low', 'medium', 'high'];
  const yPositions = ['high', 'medium', 'low']; // Reversed for visual layout (high at top)

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
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-bar-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color="#ffffff"
                title="Assessment Matrix"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.secondaryText }}>
                ASSESSMENT TOOL
              </p>
              <h1 className="text-3xl font-bold" style={{ color: professionalColors.primaryText }}>
                {matrixTitle}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Matrix Grid */}
          <div className="flex-1">
            <div className="relative">
              {/* Y-Axis Label */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: professionalColors.secondaryText }}>
                  {yAxisLabel}
                </span>
              </div>

              {/* Y-Axis Values */}
              <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-around py-4">
                {yPositions.map((label) => (
                  <span key={label} className="text-xs font-medium capitalize" style={{ color: professionalColors.secondaryText }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Matrix Grid */}
              <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-xl" style={{ backgroundColor: professionalColors.cardBg }}>
                {yPositions.map((yPos) => (
                  xPositions.map((xPos) => {
                    const cellItems = getItemsForCell(xPos, yPos);
                    const cellColor = getCellColor(xPos, yPos);

                    return (
                      <div
                        key={`${xPos}-${yPos}`}
                        className="relative min-h-[85px] p-2 rounded-lg border"
                        style={{
                          backgroundColor: cellColor,
                          borderColor: professionalColors.borderLight,
                        }}
                      >
                        {cellItems.map((item, index) => (
                          <div
                            key={index}
                            className="mb-1.5 p-1.5 rounded bg-white/80 shadow-sm"
                          >
                            <p className="text-xs font-semibold leading-tight" style={{ color: professionalColors.primaryText }}>
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-xs mt-0.5 opacity-75 leading-tight" style={{ color: professionalColors.secondaryText }}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })
                ))}
              </div>

              {/* X-Axis Values */}
              <div className="flex justify-around mt-1.5 px-1.5">
                {xPositions.map((label) => (
                  <span key={label} className="text-xs font-medium capitalize" style={{ color: professionalColors.secondaryText }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* X-Axis Label */}
              <div className="text-center mt-2">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: professionalColors.secondaryText }}>
                  {xAxisLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Legend and Info Panel */}
          <div className="w-64 space-y-3">
            {/* Risk Level Legend */}
            <div className="p-3 rounded-xl shadow-md" style={{ backgroundColor: professionalColors.cardBg }}>
              <h3 className="text-base font-bold mb-2" style={{ color: professionalColors.primaryText }}>
                Risk Levels
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: professionalColors.danger + '20' }}></div>
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: professionalColors.primaryText }}>Critical Risk</p>
                    <p className="text-xs leading-tight" style={{ color: professionalColors.secondaryText }}>Immediate action required</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: professionalColors.warning + '20' }}></div>
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: professionalColors.primaryText }}>Moderate Risk</p>
                    <p className="text-xs leading-tight" style={{ color: professionalColors.secondaryText }}>Planned mitigation needed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: professionalColors.success + '20' }}></div>
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: professionalColors.primaryText }}>Low Risk</p>
                    <p className="text-xs leading-tight" style={{ color: professionalColors.secondaryText }}>Monitor and maintain</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Guidelines */}
            <div className="p-3 rounded-xl" style={{ backgroundColor: professionalColors.accent + '10' }}>
              <div className="flex items-start gap-2 mb-2">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                  strokeColor="currentColor"
                  className="w-4 h-4 mt-0.5"
                  color={professionalColors.secondaryText}
                  title="Guidelines"
                />
                <h4 className="text-sm font-bold" style={{ color: professionalColors.primaryText }}>
                  Action Guidelines
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs leading-snug" style={{ color: professionalColors.secondaryText }}>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Focus on high impact/high likelihood items first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Develop mitigation plans for moderate risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Regular review and reassessment quarterly</span>
                </li>
              </ul>
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
export type MatrixAssessmentSlideData = z.infer<typeof Schema>;

export default MatrixAssessmentSlide;