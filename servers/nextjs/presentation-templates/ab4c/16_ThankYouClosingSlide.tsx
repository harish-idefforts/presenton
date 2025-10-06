import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '16-thank-you-closing';
export const layoutName = 'Thank You & Closing';

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
  message: z.string().min(10).max(200).default('Thank you for your participation and commitment to excellence in compliance.').meta({
    description: "Thank you message. Max 200 characters",
  }),
  presenter: z.object({
    name: z.string().min(3).max(50).meta({
      description: "Presenter name",
    }),
    title: z.string().min(5).max(100).meta({
      description: "Presenter title/position",
    }),
    email: z.string().email().meta({
      description: "Presenter email",
    }),
  }).default({
    name: 'John Smith',
    title: 'Senior Compliance Training Manager',
    email: 'john.smith@ab4c.com',
  }).meta({
    description: "Presenter information",
  }),
  nextSession: z.string().min(10).max(200).optional().default('Next Training: Q2 2025 - Advanced Risk Management Strategies').meta({
    description: "Optional next session information. Max 200 characters",
  }),
  websiteUrl: z.string().url().optional().default('https://www.ab4c.com').meta({
    description: "Optional company website URL",
  }),
  feedbackUrl: z.string().url().optional().default('https://feedback.ab4c.com/training').meta({
    description: "Optional feedback survey URL",
  }),
});

interface ThankYouClosingSlideProps {
  data?: Partial<ThankYouClosingSlideData>;
}

const ThankYouClosingSlide: React.FC<ThankYouClosingSlideProps> = ({ data: slideData }) => {
  const message = slideData?.message || 'Thank you for your participation and commitment to excellence in compliance.';
  const presenter = slideData?.presenter || {
    name: 'John Smith',
    title: 'Senior Compliance Training Manager',
    email: 'john.smith@ab4c.com',
  };
  const nextSession = slideData?.nextSession;
  const websiteUrl = slideData?.websiteUrl;
  const feedbackUrl = slideData?.feedbackUrl;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden" style={{ backgroundColor: professionalColors.background }}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
             style={{ background: `radial-gradient(circle, ${professionalColors.accent} 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
             style={{ background: `radial-gradient(circle, ${professionalColors.success} 0%, transparent 70%)` }}></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-16 pt-16 pb-24 flex flex-col items-center justify-center relative z-10">
        {/* Thank You Icon and Message */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl"
               style={{
                 background: `linear-gradient(135deg, ${professionalColors.accent} 0%, ${professionalColors.success} 100%)`
               }}>
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg"
              strokeColor="currentColor"
              className="w-12 h-12"
              color="#ffffff"
              title="Thank You"
            />
          </div>

          <h1 className="text-6xl font-bold mb-6" style={{ color: professionalColors.primaryText }}>
            Thank You!
          </h1>

          <p className="text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: professionalColors.secondaryText }}>
            {message}
          </p>
        </div>

        {/* Presenter Information Card */}
        <div className="mb-12 p-8 rounded-2xl shadow-lg max-w-2xl w-full"
             style={{ backgroundColor: professionalColors.cardBg }}>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: professionalColors.accent + '15' }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/user-bold.svg"
                strokeColor="currentColor"
                className="w-10 h-10"
                color={professionalColors.accent}
                title="Presenter"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2"
                 style={{ color: professionalColors.accent }}>
                YOUR PRESENTER
              </p>
              <h2 className="text-2xl font-bold mb-1" style={{ color: professionalColors.primaryText }}>
                {presenter.name}
              </h2>
              <p className="text-base mb-2" style={{ color: professionalColors.secondaryText }}>
                {presenter.title}
              </p>
              <a href={`mailto:${presenter.email}`}
                 className="text-base hover:underline inline-flex items-center gap-2"
                 style={{ color: professionalColors.accent }}>
                <RemoteSvgIcon
                  url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
                  strokeColor="currentColor"
                  className="w-4 h-4"
                  color={professionalColors.accent}
                  title="Email"
                />
                {presenter.email}
              </a>
            </div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {/* Next Session Card */}
          {nextSession && (
            <div className="p-6 rounded-xl text-center"
                 style={{ backgroundColor: professionalColors.warning + '15' }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/bookmark-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8 mx-auto mb-3"
                color={professionalColors.warning}
                title="Next Session"
              />
              <p className="text-sm font-bold mb-2" style={{ color: professionalColors.primaryText }}>
                Save the Date
              </p>
              <p className="text-xs" style={{ color: professionalColors.secondaryText }}>
                {nextSession}
              </p>
            </div>
          )}

          {/* Feedback Card */}
          {feedbackUrl && (
            <div className="p-6 rounded-xl text-center"
                 style={{ backgroundColor: professionalColors.success + '15' }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8 mx-auto mb-3"
                color={professionalColors.success}
                title="Feedback"
              />
              <p className="text-sm font-bold mb-2" style={{ color: professionalColors.primaryText }}>
                Share Feedback
              </p>
              <a href={feedbackUrl}
                 className="text-xs hover:underline"
                 style={{ color: professionalColors.accent }}
                 target="_blank"
                 rel="noopener noreferrer">
                Complete our survey
              </a>
            </div>
          )}

          {/* Website Card */}
          {websiteUrl && (
            <div className="p-6 rounded-xl text-center"
                 style={{ backgroundColor: professionalColors.accent + '15' }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/desktop-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8 mx-auto mb-3"
                color={professionalColors.accent}
                title="Website"
              />
              <p className="text-sm font-bold mb-2" style={{ color: professionalColors.primaryText }}>
                Learn More
              </p>
              <a href={websiteUrl}
                 className="text-xs hover:underline"
                 style={{ color: professionalColors.accent }}
                 target="_blank"
                 rel="noopener noreferrer">
                Visit our website
              </a>
            </div>
          )}
        </div>

        {/* Closing Quote */}
        <div className="mt-12 p-6 max-w-2xl w-full text-center">
          <p className="text-lg italic" style={{ color: professionalColors.secondaryText }}>
            "Excellence in compliance is a journey, not a destination."
          </p>
        </div>

        {/* Company Logo */}
        <div className="mt-8">
          <img src="/ab4c-logo.png" alt="AB4C Logo" className="h-20 w-20 object-contain opacity-50" />
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
export type ThankYouClosingSlideData = z.infer<typeof Schema>;

export default ThankYouClosingSlide;