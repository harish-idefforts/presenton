import React from 'react';
import * as z from "zod";

const ab4cColors = { background: "#f5f5f0", primaryText: "#4a4035", secondaryText: "#6b5d52", boxBackground: "#e8e4dc", accent: "#6b5d52" };

export const layoutId = 'ab4c-new-quiz-assessment';
export const layoutName = 'Quiz Assessment';
export const layoutDescription = 'Knowledge assessment slide with multiple choice questions and answer options.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Knowledge Assessment').meta({ description: "Main title. Max 8 words" }),
    instructions: z.string().min(10).max(400).default('Select the best answer for each question based on your training.').meta({ description: "Instructions. Max 20 words" }),
    questions: z.array(z.object({
        question: z.string().min(10).max(400).meta({ description: "Question text. Max 20 words" }),
        options: z.array(z.string().min(5).max(200)).length(4).meta({ description: "Four answer options. Max 10 words each" }),
        correctAnswer: z.number().min(0).max(3).meta({ description: "Correct answer index (0-3)" }),
    })).min(2).max(4).default([
        { question: 'What is the primary purpose of tariff classification?', options: ['Revenue generation', 'Trade compliance', 'Product marketing', 'Supply chain'], correctAnswer: 1 },
        { question: 'Which document is essential for import clearance?', options: ['Invoice only', 'Commercial invoice and packing list', 'Sales receipt', 'Price quote'], correctAnswer: 1 }
    ]).meta({ description: "Quiz questions. 2-4 questions" }),
});

export { Schema };
export type QuizAssessmentLayoutData = z.infer<typeof Schema>;

const QuizAssessmentLayout: React.FC<{ data?: Partial<QuizAssessmentLayoutData> }> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}>
                <div className="relative z-10 flex flex-col h-full p-10 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-3xl font-bold mb-2">{slideData?.title || 'Knowledge Assessment'}</h1>
                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm mb-6">{slideData?.instructions || ''}</p>

                    <div className="space-y-5 flex-1">
                        {slideData?.questions?.map((q, qIdx) => (
                            <div key={qIdx}>
                                <p style={{ color: ab4cColors.primaryText }} className="font-semibold mb-2">{qIdx + 1}. {q.question}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className={`p-2 rounded border-2 flex items-center ${oIdx === q.correctAnswer ? 'border-green-500' : 'border-transparent'}`} style={{ backgroundColor: ab4cColors.boxBackground }}>
                                            <span className="font-semibold mr-2" style={{ color: ab4cColors.accent }}>{String.fromCharCode(65 + oIdx)}.</span>
                                            <span style={{ color: ab4cColors.secondaryText }} className="text-sm">{opt}</span>
                                            {oIdx === q.correctAnswer && <span className="ml-auto text-green-500">✓</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8" style={{ background: ab4cColors.background }}>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img src="/ab4c-new-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
                </div>
            </div>
        </>
    );
};

export default QuizAssessmentLayout;
