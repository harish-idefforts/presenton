import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '07-grid-layout-slide';
export const layoutName = 'Grid Layout';
export const layoutDescription = 'Grid of cards for teams, departments, or categories with icons and descriptions. Perfect for showing organizational structure, team roles, or multiple related concepts.';

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
  title: z.string().min(3).max(80).default('Key Stakeholders').meta({
    description: "Main title for the grid",
  }),
  subtitle: z.string().min(10).max(200).optional().default('Understanding roles and responsibilities across the organization').meta({
    description: "Optional subtitle",
  }),
  gridColumns: z.number().int().min(2).max(3).default(3).meta({
    description: "Number of columns in the grid (2 or 3)",
  }),
  cards: z.array(z.object({
    name: z.string().min(3).max(50),
    role: z.string().min(3).max(80).optional(),
    icon: IconSchema.default({
      __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/user-bold.svg',
      __icon_query__: 'user person team'
    }),
    responsibilities: z.array(z.string().min(5).max(100)).min(2).max(4),
    contact: z.string().min(5).max(50).optional(),
    color: z.string().optional()
  })).min(4).max(9).default([
    {
      name: 'Leadership Team',
      role: 'Strategic Direction',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/crown-bold.svg',
        __icon_query__: 'crown leadership executive'
      },
      responsibilities: [
        'Set organizational vision',
        'Allocate resources',
        'Drive strategic initiatives'
      ],
      contact: 'leadership@company.com',
      color: '#0984e3'
    },
    {
      name: 'Operations',
      role: 'Process Excellence',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
        __icon_query__: 'gear operations process'
      },
      responsibilities: [
        'Optimize workflows',
        'Ensure quality standards',
        'Manage daily operations'
      ],
      contact: 'operations@company.com',
      color: '#00b894'
    },
    {
      name: 'Finance',
      role: 'Financial Management',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/calculator-bold.svg',
        __icon_query__: 'calculator finance money'
      },
      responsibilities: [
        'Budget planning',
        'Financial reporting',
        'Risk assessment'
      ],
      contact: 'finance@company.com',
      color: '#fdcb6e'
    },
    {
      name: 'Human Resources',
      role: 'People & Culture',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-bold.svg',
        __icon_query__: 'users team hr people'
      },
      responsibilities: [
        'Talent acquisition',
        'Employee development',
        'Culture initiatives'
      ],
      contact: 'hr@company.com',
      color: '#d63031'
    },
    {
      name: 'Technology',
      role: 'Digital Innovation',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/desktop-bold.svg',
        __icon_query__: 'desktop computer technology'
      },
      responsibilities: [
        'System architecture',
        'Digital transformation',
        'Technical support'
      ],
      contact: 'it@company.com',
      color: '#6c5ce7'
    },
    {
      name: 'Marketing',
      role: 'Brand & Growth',
      icon: {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg',
        __icon_query__: 'megaphone marketing promotion'
      },
      responsibilities: [
        'Brand strategy',
        'Market analysis',
        'Campaign execution'
      ],
      contact: 'marketing@company.com',
      color: '#e17055'
    }
  ]).meta({
    description: "Grid cards with department/team information",
  }),
});

export { Schema };
export type GridLayoutSlideData = z.infer<typeof Schema>;

interface GridLayoutSlideProps {
  data?: Partial<GridLayoutSlideData>;
}

const GridLayoutSlide: React.FC<GridLayoutSlideProps> = ({ data: slideData }) => {
  const cards = slideData?.cards || [];
  const columns = slideData?.gridColumns || 3;

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
            {slideData?.title || 'Key Stakeholders'}
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

        {/* Grid Content */}
        <div className="flex-1 px-12 pb-20 overflow-y-auto">
          <div className={`grid gap-4 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {cards.map((card, index) => (
              <div
                key={index}
                className="rounded-xl shadow-sm hover:shadow-md transition-all p-5"
                style={{
                  backgroundColor: professionalColors.cardBg,
                  borderTop: `4px solid ${card.color || professionalColors.accent}`
                }}
              >
                {/* Card Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${card.color || professionalColors.accent}15`
                    }}
                  >
                    <RemoteSvgIcon
                      url={card.icon.__icon_url__}
                      strokeColor="currentColor"
                      className="w-6 h-6"
                      color={card.color || professionalColors.accent}
                      title={card.icon.__icon_query__}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-base"
                      style={{ color: professionalColors.primaryText }}
                    >
                      {card.name}
                    </h3>
                    {card.role && (
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: card.color || professionalColors.accent }}
                      >
                        {card.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-2 mb-3">
                  {card.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: card.color || professionalColors.accent }}
                      />
                      <span
                        className="text-xs leading-relaxed"
                        style={{ color: professionalColors.secondaryText }}
                      >
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                {card.contact && (
                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: professionalColors.borderLight }}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={card.color || professionalColors.accent}
                        strokeWidth="2"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-10 5L2 7"/>
                      </svg>
                      <span
                        className="text-xs"
                        style={{ color: professionalColors.secondaryText }}
                      >
                        {card.contact}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
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

export default GridLayoutSlide;