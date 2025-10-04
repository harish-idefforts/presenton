import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-quiz-assessment';
export const layoutName = 'Quiz Assessment';
export const layoutDescription = 'A comprehensive quiz and assessment layout with multiple choice questions. Use this specifically for knowledge checks, assessments, tests, quizzes, MCQs, and learning verification. This layout should be used when presenting quiz questions, exam content, or knowledge assessment activities.';

const quizAssessmentSchema = z.object({
    title: z.string().min(5).max(80).default('Knowledge Assessment Quiz').meta({
        description: "Main quiz title - typically includes words like 'Quiz', 'Assessment', 'Knowledge Check', or 'Test'",
    }),
    instructions: z.string().min(10).max(120).default('Test your understanding with these multiple-choice questions:').meta({
        description: "Brief instructions explaining the quiz (keep under 120 chars)",
    }),
    questions: z.array(z.object({
        question: z.string().min(10).max(80),
        options: z.array(z.string().min(2).max(60)).length(4),
        correctAnswer: z.number().int().min(0).max(3)
    })).min(4).max(4).default([
        {
            question: 'What is the primary method for customs valuation?',
            options: [
                'Fair market value',
                'Transaction value',
                'Replacement cost',
                'Book value'
            ],
            correctAnswer: 1
        },
        {
            question: 'How many digits are in a complete HTS code?',
            options: [
                '6 digits',
                '8 digits',
                '10 digits',
                '12 digits'
            ],
            correctAnswer: 2
        },
        {
            question: 'What does C-TPAT stand for?',
            options: [
                'Commercial Trade Partnership',
                'Customs-Trade Partnership Against Terrorism',
                'Container Transport Protection',
                'Certified Trade Protection Tool'
            ],
            correctAnswer: 1
        },
        {
            question: 'Which document proves country of origin?',
            options: [
                'Commercial invoice',
                'Bill of lading',
                'Certificate of origin',
                'Packing list'
            ],
            correctAnswer: 2
        }
    ]).meta({
        description: "List of multiple choice questions - exactly 4 questions in 2x2 grid, each with question text (under 80 chars), 4 answer options (under 60 chars each), and correct answer index 0-3",
    })
});

export const Schema = quizAssessmentSchema;

export type QuizAssessmentData = z.infer<typeof quizAssessmentSchema>;

interface QuizAssessmentLayoutProps {
    data?: Partial<QuizAssessmentData>
}

const QuizAssessmentLayout: React.FC<QuizAssessmentLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative mx-auto"
                style={{
                    background: "#f5f5f0",
                    fontFamily: "Inter, sans-serif"
                }}
            >
                {/* Main Content Area */}
                <div className="relative z-10 h-full flex flex-col px-12 lg:px-16 pt-8 pb-24">
                    {/* Title */}
                    <h1
                        className="text-4xl sm:text-5xl font-bold mb-3"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Knowledge Assessment Quiz'}
                    </h1>

                    {/* Instructions */}
                    <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.instructions || 'Test your understanding with these multiple-choice questions:'}
                    </p>

                    {/* Questions */}
                    <div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                            {slideData?.questions && slideData.questions.length > 0 ? (
                                slideData.questions.map((q, index) => (
                                    <div key={index}>
                                        <p
                                            className="text-sm font-bold mb-2"
                                            style={{ color: "#4a4035" }}
                                        >
                                            {q.question}
                                        </p>
                                        <ul className="space-y-0.5">
                                            {q.options.map((option, oIndex) => (
                                                <li
                                                    key={oIndex}
                                                    className="text-xs leading-relaxed"
                                                    style={{ color: "#6b5d52" }}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
                    style={{ background: "#f5f5f0" }}
                >
                    <span className="text-xs" style={{ color: "#6b5d52" }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: "#6b5d52" }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img
                        src="/gamma-logo.png"
                        alt="AB4C Logo"
                        className="h-14 w-14 object-contain"
                    />
                </div>
            </div>
        </>
    );
};

export default QuizAssessmentLayout;
