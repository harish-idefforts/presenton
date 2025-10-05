import React from 'react';
import * as z from "zod";

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-quiz-assessment';
export const layoutName = 'Quiz Assessment';
export const layoutDescription = 'Layout for knowledge assessments or quizzes with multiple-choice questions and instructions.';

const questionSchema = z.object({
    question: z.string().min(10).max(300).meta({
        description: "The multiple-choice quiz question",
    }),
    options: z.array(z.string().min(1).max(100)).min(4).max(4).meta({
        description: "Four distinct multiple-choice options for the quiz question",
    }),
    correctAnswer: z.string().min(1).max(100).meta({
        description: "The exact correct answer from the provided options",
    }),
});

const quizAssessmentLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Knowledge Assessment Quiz').meta({
        description: "Main title for the quiz or assessment slide, clearly stating its purpose",
    }),
    instructions: z.string().min(20).max(200).default('Test your understanding of trade compliance principles. Answer the multiple-choice questions below by selecting the best option for each.').meta({
        description: "Clear instructions for the quiz, guiding users on how to answer the multiple-choice questions",
    }),
    questions: z.array(questionSchema).min(3).max(10).default([ // Reverted max to 10
        {
            question: 'Which international body primarily governs global trade rules?',
            options: ['World Trade Organization (WTO)', 'International Monetary Fund (IMF)', 'United Nations (UN)', 'World Bank'],
            correctAnswer: 'World Trade Organization (WTO)',
        },
        {
            question: 'What is the primary purpose of export controls?',
            options: ['To protect domestic industries', 'To prevent the proliferation of sensitive technologies', 'To generate revenue through tariffs', 'To monitor import quotas'],
            correctAnswer: 'To prevent the proliferation of sensitive technologies',
        },
        {
            question: 'Which document is a key component for declaring goods for import?',
            options: ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin'],
            correctAnswer: 'Commercial Invoice',
        },
    ]).meta({
        description: "A list of multiple-choice questions for knowledge assessment, typically 3 to 10",
    }),
});

export const Schema = quizAssessmentLayoutSchema;

export type QuizAssessmentLayoutData = z.infer<typeof quizAssessmentLayoutSchema>;

interface QuizAssessmentLayoutProps {
    data?: Partial<QuizAssessmentLayoutData>;
}

const QuizAssessmentLayout: React.FC<QuizAssessmentLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: ab4cColors.background,
                }}
            >
                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full px-12 pt-12 pb-8">
                    <h1
                        style={{ color: ab4cColors.primaryText }}
                        className="text-4xl lg:text-5xl font-bold text-center mb-4"
                    >
                        {slideData?.title || 'Knowledge Assessment Quiz'}
                    </h1>
                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-base text-center mb-8"
                    >
                        {slideData?.instructions || 'Test your understanding of trade compliance principles.'}
                    </p>

                    <div className="flex-1 overflow-y-auto pr-2"> {/* Added overflow for many questions */}
                        {slideData?.questions?.map((q, qIndex) => (
                            <div key={qIndex} className="mb-8 p-6 rounded-lg shadow-md" style={{ backgroundColor: ab4cColors.boxBackground }}>
                                <p style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-4">
                                    {qIndex + 1}. {q.question}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((option, optIndex) => (
                                        <div key={optIndex} className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                id={`q${qIndex}-option${optIndex}`}
                                                name={`question-${qIndex}`}
                                                value={option}
                                                className="form-radio h-4 w-4"
                                                style={{ accentColor: ab4cColors.accent }}
                                                disabled // Disable for display purposes
                                            />
                                            <label
                                                htmlFor={`q${qIndex}-option${optIndex}`}
                                                style={{ color: ab4cColors.secondaryText }}
                                                className="text-base cursor-default"
                                            >
                                                {option}
                                            </label>
                                            {option === q.correctAnswer && (
                                                <span style={{ color: '#0F834D' }} className="text-base font-semibold"> (Correct)</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
                    style={{ background: ab4cColors.background }}
                >
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
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

export default QuizAssessmentLayout;
