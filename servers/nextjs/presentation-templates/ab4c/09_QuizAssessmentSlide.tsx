import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '09-quiz-assessment';
export const layoutName = 'Quiz Assessment';
export const layoutDescription = 'Multiple choice questions with options and answer key. Display 3-5 questions per slide for efficient knowledge checks. Use for quizzes and assessments.';

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
  title: z.string().min(5).max(80).default('Knowledge Assessment Quiz').meta({
    description: "Quiz title. Max 80 characters",
  }),
  subtitle: z.string().min(10).max(200).optional().default('Test Your Understanding').meta({
    description: "Quiz subtitle or description. Max 200 characters",
  }),
  description: z.string().min(20).max(300).optional().default('This assessment evaluates understanding of key concepts covered in training. Each question reflects real-world scenarios.').meta({
    description: "Brief description of the quiz purpose. Max 300 characters",
  }),
  instructions: z.array(z.string().min(5).max(100)).min(3).max(6).default([
    '10 multiple-choice questions covering all training modules',
    'Each question has one correct answer',
    'Take your time to consider each option carefully',
    'Passing score: 80% (8 out of 10 correct answers)',
    'Immediate feedback provided after completion',
  ]).meta({
    description: "3-6 instruction bullet points. Max 100 characters each",
  }),
  questions: z.array(z.object({
    number: z.number().int().min(1).max(20).meta({
      description: "Question number",
    }),
    title: z.string().min(3).max(60).meta({
      description: "Question category or title. Max 60 characters",
    }),
    question: z.string().min(10).max(200).meta({
      description: "The quiz question. Max 200 characters for compact display",
    }),
    options: z.array(z.object({
      letter: z.enum(['A', 'B', 'C', 'D']).meta({
        description: "Option letter A, B, C, or D",
      }),
      text: z.string().min(5).max(100).meta({
        description: "Option text. Max 100 characters for compact layout",
      }),
    })).length(4).meta({
      description: "Exactly 4 options labeled A through D",
    }),
    correctAnswer: z.enum(['A', 'B', 'C', 'D']).meta({
      description: "The correct answer letter (A, B, C, or D)",
    }),
  })).min(3).max(5).default([
    {
      number: 1,
      title: 'Regulatory Foundations',
      question: 'Which framework provides the foundation for international trade regulations?',
      options: [
        { letter: 'A', text: 'International Standards Organisation' },
        { letter: 'B', text: 'World Trade Organization' },
        { letter: 'C', text: 'United Nations Security Council' },
        { letter: 'D', text: 'International Monetary Fund' },
      ],
      correctAnswer: 'B',
    },
    {
      number: 2,
      title: 'Communication Excellence',
      question: 'What is the most effective way to ensure regulatory information is understood?',
      options: [
        { letter: 'A', text: 'Email distribution' },
        { letter: 'B', text: 'Verbal briefings' },
        { letter: 'C', text: 'Structured documentation with confirmation' },
        { letter: 'D', text: 'Informal discussions' },
      ],
      correctAnswer: 'C',
    },
    {
      number: 3,
      title: 'Risk Assessment',
      question: 'When conducting compliance risk assessment, what should be the primary consideration?',
      options: [
        { letter: 'A', text: 'Cost implications' },
        { letter: 'B', text: 'Time constraints' },
        { letter: 'C', text: 'Likelihood and impact' },
        { letter: 'D', text: 'Staff availability' },
      ],
      correctAnswer: 'C',
    },
  ]).meta({
    description: "Display 3-5 questions per slide. For 10 total questions, use 2-3 slides",
  }),
  answerKey: z.string().min(10).max(200).optional().default('Answer Key: 1-B, 2-C, 3-C. Complete quiz results and detailed explanations provided upon submission.').meta({
    description: "Answer key showing correct answers. Max 200 characters",
  }),
  showAnswers: z.boolean().optional().default(true).meta({
    description: "Whether to show the answer key on the slide",
  }),
});

export { Schema };
export type QuizAssessmentSlideData = z.infer<typeof Schema>;

interface QuizAssessmentSlideProps {
  data?: Partial<QuizAssessmentSlideData>;
}

const QuizAssessmentSlide: React.FC<QuizAssessmentSlideProps> = ({ data: slideData }) => {
  const title = slideData?.title || 'Knowledge Assessment Quiz';
  const subtitle = slideData?.subtitle || 'Test Your Understanding';
  const description = slideData?.description;
  const instructions = slideData?.instructions || [];
  const questions = slideData?.questions || [];
  const answerKey = slideData?.answerKey;
  const showAnswers = slideData?.showAnswers !== false;

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
        {/* Header Section */}
        <div className="px-12 pt-6 pb-4">
          <h1
            className="text-4xl lg:text-5xl font-bold mb-2"
            style={{ color: professionalColors.primaryText }}
          >
            {title}
          </h1>
          <p
            className="text-xl mb-2"
            style={{ color: professionalColors.secondaryText }}
          >
            {subtitle}
          </p>
          {description && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: professionalColors.secondaryText }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-12 pb-6 overflow-hidden">
          <div className="h-full flex gap-6">
            {/* Left Column - Instructions */}
            <div className="w-2/5">
              <div
                className="p-4 rounded-xl h-full"
                style={{ backgroundColor: professionalColors.cardBg }}
              >
                <h3
                  className="font-semibold mb-3 text-lg"
                  style={{ color: professionalColors.primaryText }}
                >
                  Quiz Instructions
                </h3>
                <ul className="space-y-2">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: professionalColors.accent }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: professionalColors.secondaryText }}
                      >
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Questions */}
            <div className="flex-1">
              <div className="grid gap-4 h-full overflow-auto">
                {questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: professionalColors.cardBg,
                      borderLeft: `4px solid ${professionalColors.accent}`
                    }}
                  >
                    {/* Question Header */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className="text-2xl font-bold flex-shrink-0"
                        style={{ color: professionalColors.accent }}
                      >
                        {q.number}
                      </span>
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-sm mb-1"
                          style={{ color: professionalColors.primaryText }}
                        >
                          {q.title}
                        </h4>
                        <p
                          className="text-sm leading-snug mb-2"
                          style={{ color: professionalColors.primaryText }}
                        >
                          {q.question}
                        </p>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="ml-8 space-y-1">
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-start gap-2">
                          <span
                            className="text-xs font-semibold flex-shrink-0"
                            style={{ color: professionalColors.secondaryText }}
                          >
                            {option.letter})
                          </span>
                          <span
                            className="text-xs leading-tight"
                            style={{ color: professionalColors.secondaryText }}
                          >
                            {option.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Answer Key Footer */}
        {showAnswers && answerKey && (
          <div
            className="px-12 py-3"
            style={{
              backgroundColor: professionalColors.success + '15',
              borderTop: `2px solid ${professionalColors.success}`
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{ color: professionalColors.primaryText }}
            >
              <span style={{ color: professionalColors.success }}>Answer Key:</span> {answerKey}
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          className="h-16 flex items-center justify-between px-8"
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
            className="h-12 w-12 object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default QuizAssessmentSlide;
