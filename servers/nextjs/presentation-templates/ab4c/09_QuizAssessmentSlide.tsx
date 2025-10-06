import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '09-quiz-assessment';
export const layoutName = 'Quiz Assessment';

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
  questionNumber: z.number().min(1).default(1).meta({
    description: "Question number in sequence",
  }),
  question: z.string().min(10).max(300).default('Which of the following best describes our compliance policy?').meta({
    description: "The quiz question. Max 300 characters for optimal display",
  }),
  options: z.array(z.object({
    letter: z.enum(['A', 'B', 'C', 'D']).meta({
      description: "Option letter identifier",
    }),
    text: z.string().min(5).max(150).meta({
      description: "Option text. Max 150 characters",
    }),
    isCorrect: z.boolean().optional().meta({
      description: "Whether this is the correct answer",
    }),
  })).length(4).default([
    { letter: 'A', text: 'Report immediately to your supervisor', isCorrect: false },
    { letter: 'B', text: 'Document the issue and escalate through proper channels', isCorrect: true },
    { letter: 'C', text: 'Wait for the monthly review meeting', isCorrect: false },
    { letter: 'D', text: 'Handle it independently without reporting', isCorrect: false },
  ]).meta({
    description: "Exactly 4 answer options with letters A-D",
  }),
  explanation: z.string().min(20).max(500).optional().default('The correct answer is B. Following proper documentation and escalation procedures ensures compliance and creates an audit trail.').meta({
    description: "Optional explanation for the correct answer. Max 500 characters",
  }),
  showAnswer: z.boolean().optional().default(false).meta({
    description: "Whether to reveal the correct answer",
  }),
});

interface QuizAssessmentSlideProps {
  data?: Partial<QuizAssessmentSlideData>;
}

const QuizAssessmentSlide: React.FC<QuizAssessmentSlideProps> = ({ data: slideData }) => {
  const questionNumber = slideData?.questionNumber || 1;
  const question = slideData?.question || 'Which of the following best describes our compliance policy?';
  const options = slideData?.options || [
    { letter: 'A', text: 'Report immediately to your supervisor', isCorrect: false },
    { letter: 'B', text: 'Document the issue and escalate through proper channels', isCorrect: true },
    { letter: 'C', text: 'Wait for the monthly review meeting', isCorrect: false },
    { letter: 'D', text: 'Handle it independently without reporting', isCorrect: false },
  ];
  const explanation = slideData?.explanation;
  const showAnswer = slideData?.showAnswer || false;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden" style={{ backgroundColor: professionalColors.background }}>
      {/* Main Content Area */}
      <div className="flex-1 px-16 pt-16 pb-24">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                 style={{ backgroundColor: professionalColors.accent }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8"
                color="#ffffff"
                title="Quiz Question"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.accent }}>
                KNOWLEDGE CHECK
              </p>
              <h1 className="text-4xl font-bold" style={{ color: professionalColors.primaryText }}>
                Question {questionNumber}
              </h1>
            </div>
          </div>
        </div>

        {/* Question Box */}
        <div className="mb-10 p-8 rounded-xl shadow-lg"
             style={{ backgroundColor: professionalColors.cardBg }}>
          <p className="text-2xl font-semibold leading-relaxed"
             style={{ color: professionalColors.primaryText }}>
            {question}
          </p>
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 gap-4 mb-10">
          {options.map((option, index) => {
            const isCorrect = option.isCorrect;
            const shouldHighlight = showAnswer && isCorrect;
            const shouldFade = showAnswer && !isCorrect;

            return (
              <div
                key={index}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300
                  ${shouldHighlight ? 'shadow-lg scale-[1.02]' : ''}
                  ${shouldFade ? 'opacity-50' : ''}
                `}
                style={{
                  backgroundColor: shouldHighlight ? professionalColors.success + '15' : professionalColors.cardBg,
                  borderColor: shouldHighlight ? professionalColors.success : professionalColors.borderLight,
                }}
              >
                <div className="flex items-center gap-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{
                      backgroundColor: shouldHighlight ? professionalColors.success : professionalColors.accent,
                      color: '#ffffff',
                    }}
                  >
                    {option.letter}
                  </div>
                  <p className="flex-1 text-lg" style={{ color: professionalColors.primaryText }}>
                    {option.text}
                  </p>
                  {shouldHighlight && (
                    <RemoteSvgIcon
                      url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg"
                      strokeColor="currentColor"
                      className="w-8 h-8"
                      color={professionalColors.success}
                      title="Correct Answer"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation Box (shown when answer is revealed) */}
        {showAnswer && explanation && (
          <div className="p-6 rounded-xl"
               style={{
                 backgroundColor: professionalColors.success + '15',
                 borderLeft: `4px solid ${professionalColors.success}`
               }}>
            <div className="flex items-start gap-4">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6 mt-1 flex-shrink-0"
                color={professionalColors.success}
                title="Explanation"
              />
              <div>
                <p className="font-semibold mb-2" style={{ color: professionalColors.primaryText }}>
                  Explanation:
                </p>
                <p className="text-base leading-relaxed" style={{ color: professionalColors.secondaryText }}>
                  {explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions (when answer not shown) */}
        {!showAnswer && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <RemoteSvgIcon
              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/play-bold.svg"
              strokeColor="currentColor"
              className="w-5 h-5"
              color={professionalColors.accent}
              title="Select Answer"
            />
            <p className="text-sm italic" style={{ color: professionalColors.secondaryText }}>
              Select the best answer from the options above
            </p>
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
  );
};

export { Schema };
export type QuizAssessmentSlideData = z.infer<typeof Schema>;

export default QuizAssessmentSlide;