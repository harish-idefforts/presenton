import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '13-matrix-assessment';
export const layoutName = 'Matrix Assessment';

// Professional color palette
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
    <div className="relative flex flex-col h-screen overflow-hidden" style={{ backgroundColor: professionalColors.background }}>
      {/* Main Content Area */}
      <div className="flex-1 px-16 pt-16 pb-24">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                 style={{ backgroundColor: professionalColors.accent }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-bar-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8"
                color="#ffffff"
                title="Assessment Matrix"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.accent }}>
                ASSESSMENT TOOL
              </p>
              <h1 className="text-4xl font-bold" style={{ color: professionalColors.primaryText }}>
                {matrixTitle}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Matrix Grid */}
          <div className="flex-1">
            <div className="relative">
              {/* Y-Axis Label */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: professionalColors.secondaryText }}>
                  {yAxisLabel}
                </span>
              </div>

              {/* Y-Axis Values */}
              <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-around py-8">
                {yPositions.map((label) => (
                  <span key={label} className="text-sm font-medium capitalize" style={{ color: professionalColors.secondaryText }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Matrix Grid */}
              <div className="grid grid-cols-3 gap-2 p-2 rounded-xl" style={{ backgroundColor: professionalColors.cardBg }}>
                {yPositions.map((yPos) => (
                  xPositions.map((xPos) => {
                    const cellItems = getItemsForCell(xPos, yPos);
                    const cellColor = getCellColor(xPos, yPos);

                    return (
                      <div
                        key={`${xPos}-${yPos}`}
                        className="relative min-h-[140px] p-4 rounded-lg border transition-all"
                        style={{
                          backgroundColor: cellColor,
                          borderColor: professionalColors.borderLight,
                        }}
                      >
                        {cellItems.map((item, index) => (
                          <div
                            key={index}
                            className="mb-2 p-2 rounded bg-white/80 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <p className="text-xs font-semibold" style={{ color: professionalColors.primaryText }}>
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-xs mt-1 opacity-75" style={{ color: professionalColors.secondaryText }}>
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
              <div className="flex justify-around mt-2 px-2">
                {xPositions.map((label) => (
                  <span key={label} className="text-sm font-medium capitalize" style={{ color: professionalColors.secondaryText }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* X-Axis Label */}
              <div className="text-center mt-4">
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: professionalColors.secondaryText }}>
                  {xAxisLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Legend and Info Panel */}
          <div className="w-80 space-y-6">
            {/* Risk Level Legend */}
            <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: professionalColors.cardBg }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: professionalColors.primaryText }}>
                Risk Levels
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: professionalColors.danger + '20' }}></div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: professionalColors.primaryText }}>Critical Risk</p>
                    <p className="text-xs" style={{ color: professionalColors.secondaryText }}>Immediate action required</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: professionalColors.warning + '20' }}></div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: professionalColors.primaryText }}>Moderate Risk</p>
                    <p className="text-xs" style={{ color: professionalColors.secondaryText }}>Planned mitigation needed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: professionalColors.success + '20' }}></div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: professionalColors.primaryText }}>Low Risk</p>
                    <p className="text-xs" style={{ color: professionalColors.secondaryText }}>Monitor and maintain</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Guidelines */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: professionalColors.accent + '10' }}>
              <div className="flex items-start gap-3 mb-3">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                  strokeColor="currentColor"
                  className="w-5 h-5 mt-0.5"
                  color={professionalColors.accent}
                  title="Guidelines"
                />
                <h4 className="text-base font-bold" style={{ color: professionalColors.primaryText }}>
                  Action Guidelines
                </h4>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: professionalColors.secondaryText }}>
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
  );
};

export { Schema };
export type MatrixAssessmentSlideData = z.infer<typeof Schema>;

export default MatrixAssessmentSlide;