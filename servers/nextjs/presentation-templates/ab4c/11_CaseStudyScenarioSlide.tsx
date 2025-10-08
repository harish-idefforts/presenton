import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '11-case-study-scenario';
export const layoutName = 'Case Study Scenario';
export const layoutDescription = 'Scenario-based content with situation, challenge, and resolution. Use for real-world examples and practical application.';

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
  title: z.string().min(10).max(100).default('Implementing Cross-Department Compliance').meta({
    description: "Case study title. Max 100 characters",
  }),
  scenario: z.string().min(50).max(200).default('A multinational corporation faced challenges in maintaining consistent compliance standards across five different departments, each with unique regulatory requirements.').meta({
    description: "Scenario description. Max 200 characters",
  }),
  challenge: z.string().min(50).max(200).default('Departments were operating in silos with different documentation systems, leading to audit failures and increased regulatory risks.').meta({
    description: "Challenge description. Max 200 characters",
  }),
  solution: z.string().min(50).max(200).default('Implemented a unified compliance framework with standardized documentation templates, regular cross-department meetings, and a centralized tracking system.').meta({
    description: "Solution approach. Max 200 characters",
  }),
  outcomes: z.array(z.object({
    metric: z.string().min(5).max(40).meta({
      description: "Metric or KPI name (e.g., 'Audit Pass Rate', 'Response Time'). Short label only, max 40 characters.",
    }),
    value: z.string().min(3).max(40).meta({
      description: "Metric value or result (e.g., 'Increased from 65% to 95%', 'Reduced by 30%'). Short value only, max 40 characters.",
    }),
  })).min(2).max(4).default([
    { metric: 'Audit Pass Rate', value: 'Increased from 65% to 95%' },
    { metric: 'Compliance Costs', value: 'Reduced by 30%' },
    { metric: 'Response Time', value: 'Improved by 50%' },
  ]).meta({
    description: "Array of 2-4 outcome metrics. Each must have a 'metric' (short label) and 'value' (short result). Do NOT use paragraph text - use structured metric/value pairs only.",
  }),
  learnings: z.array(z.string().min(20).max(80)).optional().default([
    'Early stakeholder engagement is critical for success',
    'Standardization improves efficiency',
    'Regular training reinforces best practices',
  ]).meta({
    description: "Optional key learnings. Max 80 characters each",
  }),
});

interface CaseStudyScenarioSlideProps {
  data?: Partial<CaseStudyScenarioSlideData>;
}

const CaseStudyScenarioSlide: React.FC<CaseStudyScenarioSlideProps> = ({ data: slideData }) => {
  const title = slideData?.title || 'Implementing Cross-Department Compliance';
  const scenario = slideData?.scenario || 'A multinational corporation faced challenges in maintaining consistent compliance standards across five different departments, each with unique regulatory requirements and operational processes.';
  const challenge = slideData?.challenge || 'Departments were operating in silos with different documentation systems, leading to audit failures and increased regulatory risks. Communication gaps resulted in duplicated efforts and inconsistent policy implementation.';
  const solution = slideData?.solution || 'Implemented a unified compliance framework with standardized documentation templates, regular cross-department meetings, and a centralized tracking system. Established clear escalation procedures and accountability metrics.';
  const outcomes = slideData?.outcomes || [
    { metric: 'Audit Pass Rate', value: 'Increased from 65% to 95%' },
    { metric: 'Compliance Costs', value: 'Reduced by 30%' },
    { metric: 'Response Time', value: 'Improved by 50%' },
  ];
  const learnings = slideData?.learnings;

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
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/bookmark-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color="#ffffff"
                title="Case Study"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.secondaryText }}>
                CASE STUDY
              </p>
              <h1 className="text-3xl font-bold" style={{ color: professionalColors.primaryText }}>
                {title}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Scenario & Challenge */}
          <div className="space-y-3">
            {/* Scenario Card */}
            <div className="p-4 rounded-xl shadow-md" style={{ backgroundColor: professionalColors.cardBg }}>
              <div className="flex items-start gap-3 mb-2">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/eye-bold.svg"
                  strokeColor="currentColor"
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  color={professionalColors.secondaryText}
                  title="Scenario"
                />
                <h2 className="text-lg font-bold" style={{ color: professionalColors.primaryText }}>
                  Scenario
                </h2>
              </div>
              <p className="text-sm leading-snug" style={{ color: professionalColors.secondaryText }}>
                {scenario}
              </p>
            </div>

            {/* Challenge Card */}
            <div className="p-4 rounded-xl shadow-md"
                 style={{
                   backgroundColor: professionalColors.cardBg,
                   borderLeft: `4px solid ${professionalColors.warning}`
                 }}>
              <div className="flex items-start gap-3 mb-2">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/warning-bold.svg"
                  strokeColor="currentColor"
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  color={professionalColors.warning}
                  title="Challenge"
                />
                <h2 className="text-lg font-bold" style={{ color: professionalColors.primaryText }}>
                  Challenge
                </h2>
              </div>
              <p className="text-sm leading-snug" style={{ color: professionalColors.secondaryText }}>
                {challenge}
              </p>
            </div>
          </div>

          {/* Right Column - Solution & Outcomes */}
          <div className="space-y-3">
            {/* Solution Card */}
            <div className="p-4 rounded-xl shadow-md"
                 style={{
                   backgroundColor: professionalColors.cardBg,
                   borderLeft: `4px solid ${professionalColors.success}`
                 }}>
              <div className="flex items-start gap-3 mb-2">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                  strokeColor="currentColor"
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  color={professionalColors.success}
                  title="Solution"
                />
                <h2 className="text-lg font-bold" style={{ color: professionalColors.primaryText }}>
                  Solution
                </h2>
              </div>
              <p className="text-sm leading-snug" style={{ color: professionalColors.secondaryText }}>
                {solution}
              </p>
            </div>

            {/* Outcomes Card */}
            <div className="p-4 rounded-xl shadow-md" style={{ backgroundColor: professionalColors.success + '10' }}>
              <div className="flex items-start gap-3 mb-2">
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-bold.svg"
                  strokeColor="currentColor"
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  color={professionalColors.success}
                  title="Outcomes"
                />
                <h2 className="text-lg font-bold" style={{ color: professionalColors.primaryText }}>
                  Results
                </h2>
              </div>
              <div className="space-y-2">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg"
                       style={{ backgroundColor: professionalColors.cardBg }}>
                    <span className="text-xs font-semibold" style={{ color: professionalColors.secondaryText }}>
                      {outcome.metric}
                    </span>
                    <span className="text-sm font-bold" style={{ color: professionalColors.success }}>
                      {outcome.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Learnings Section */}
        {learnings && learnings.length > 0 && (
          <div className="mt-3 p-3 rounded-xl" style={{ backgroundColor: professionalColors.accent + '10' }}>
            <div className="flex items-start gap-3">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-bold.svg"
                strokeColor="currentColor"
                className="w-5 h-5 mt-1 flex-shrink-0"
                color={professionalColors.secondaryText}
                title="Key Learnings"
              />
              <div className="flex-1">
                <h3 className="text-base font-bold mb-2" style={{ color: professionalColors.primaryText }}>
                  Key Learnings
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  {learnings.map((learning, index) => (
                    <div key={index} className="flex items-start gap-1.5">
                      <span className="text-base font-bold" style={{ color: professionalColors.accent }}>•</span>
                      <span className="text-xs leading-snug" style={{ color: professionalColors.secondaryText }}>
                        {learning}
                      </span>
                    </div>
                  ))}
                </div>
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
    </>
  );
};

export { Schema };
export type CaseStudyScenarioSlideData = z.infer<typeof Schema>;

export default CaseStudyScenarioSlide;