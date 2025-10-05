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

export const layoutId = 'ab4c-exercise-activity';
export const layoutName = 'Exercise/Activity';
export const layoutDescription = 'Interactive layout designed for practical exercises, workshops, or hands-on activities. Features a clear title and description, details on exercise structure (duration, teams, materials), explicit learning objectives, and numbered activity steps. Ideal for training sessions requiring participant engagement and structured tasks.';

const exerciseStructureSchema = z.object({
    duration: z.string().min(3).max(50).default('30 Minutes').meta({
        description: "Time allotted for the exercise (e.g., '15 mins', '1 Hour')",
    }),
    teams: z.string().min(3).max(50).default('Small Groups (3-4)').meta({
        description: "Team structure (e.g., 'Small Groups', 'Individual')",
    }),
    materials: z.string().min(10).max(150).optional().default('Handouts, pens, flip chart').meta({
        description: "Required materials for the exercise",
    }),
});

const exerciseActivityLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Practical Exercise: Export Control Checklist').meta({
        description: "Main title for the exercise or activity, clearly stating its purpose",
    }),
    subtitle: z.string().min(10).max(120).default('Applying the dual-use goods regulations to practical scenarios').meta({
        description: "Subtitle providing a brief context or specific focus for the exercise",
    }),
    description: z.string().min(50).max(300).default('In this exercise, you will apply the knowledge gained on export control regulations to a series of real-world scenarios. Your task is to determine if a product is dual-use, identify necessary licenses, and complete an export control checklist.').meta({
        description: "Detailed description outlining the exercise's goals, methods, and expected outcomes for participants",
    }),
    exerciseStructure: exerciseStructureSchema.default({
        duration: '30 Minutes',
        teams: 'Small Groups (3-4)',
        materials: 'Handouts (scenario descriptions), pens, flip chart',
    }).meta({
        description: "Details about the structure of the exercise",
    }),
    learningObjectives: z.union([z.string().min(50).max(400), z.array(z.string().min(10).max(150))]).default([
        'Accurately identify dual-use items based on regulation.',
        'Determine the correct export license requirements for various destinations.',
        'Effectively utilize the provided export control checklist.',
    ]).meta({
        description: "Key learning outcomes participants should achieve by completing the exercise, either as a single paragraph or a list of bullet points",
    }),
    activitySteps: z.array(z.string().min(10).max(150)).min(3).max(8).default([
        'Form into small groups of 3-4 participants.',
        'Review the provided product scenario handouts.',
        'Discuss within your group and identify dual-use characteristics.',
        'Complete the export control checklist for each scenario.',
        'Be prepared to present your findings and justification to the class.',
    ]).meta({
        description: "Numbered, sequential steps participants need to follow to complete the activity",
    }),
});

export const Schema = exerciseActivityLayoutSchema;

export type ExerciseActivityLayoutData = z.infer<typeof exerciseActivityLayoutSchema>;

interface ExerciseActivityLayoutProps {
    data?: Partial<ExerciseActivityLayoutData>;
}

const ExerciseActivityLayout: React.FC<ExerciseActivityLayoutProps> = ({ data: slideData }) => {
    const renderObjectives = (objectives: string | string[]) => {
        if (Array.isArray(objectives)) {
            return (
                <ul className="list-disc pl-5 space-y-1">
                    {objectives.map((item, index) => (
                        <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }
        return (
            <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                {objectives}
            </p>
        );
    };

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
                        {slideData?.title || 'Practical Exercise: Export Control Checklist'}
                    </h1>
                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-lg text-center mb-8"
                    >
                        {slideData?.subtitle || 'Applying the dual-use goods regulations to practical scenarios'}
                    </p>

                    <div className="grid grid-cols-2 gap-8 flex-1">
                        {/* Left Column - Description & Steps */}
                        <div>
                            <p
                                style={{ color: ab4cColors.secondaryText }}
                                className="text-base leading-relaxed mb-6"
                            >
                                {slideData?.description || 'In this exercise, you will apply the knowledge gained...'}
                            </p>
                            <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                Activity Steps
                            </h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                {slideData?.activitySteps?.map((step, index) => (
                                    <li key={index} style={{ color: ab4cColors.secondaryText }} className="text-base">
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Right Column - Structure & Objectives */}
                        <div className="flex flex-col space-y-6">
                            <div
                                className="rounded-lg p-6 shadow-md"
                                style={{ backgroundColor: ab4cColors.boxBackground, borderLeft: `5px solid ${ab4cColors.accent}` }}
                            >
                                <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                    Exercise Structure
                                </h2>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                    <strong>Duration:</strong> {slideData?.exerciseStructure?.duration || '30 Minutes'}
                                </p>
                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                    <strong>Teams:</strong> {slideData?.exerciseStructure?.teams || 'Small Groups (3-4)'}
                                </p>
                                {slideData?.exerciseStructure?.materials && (
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        <strong>Materials:</strong> {slideData.exerciseStructure.materials}
                                    </p>
                                )}
                            </div>

                            <div
                                className="rounded-lg p-6 shadow-md"
                                style={{ backgroundColor: ab4cColors.boxBackground, borderLeft: `5px solid ${ab4cColors.accent}` }}
                            >
                                <h2 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-3">
                                    Learning Objectives
                                </h2>
                                {renderObjectives(slideData?.learningObjectives || '')}
                            </div>
                        </div>
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

export default ExerciseActivityLayout;
