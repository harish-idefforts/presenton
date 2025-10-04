import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-exercise-activity';
export const layoutName = 'Exercise Activity';
export const layoutDescription = 'A comprehensive exercise layout with description, structure details, learning objectives, and numbered activity steps. Use this specifically for practical exercises, workshop activities, training sessions, hands-on learning, or interactive components. Essential for presenting structured learning activities.';

const exerciseActivitySchema = z.object({
    title: z.string().min(5).max(80).default('Practical Exercise').meta({
        description: "Main exercise title - typically 'Exercise', 'Activity', 'Workshop', or 'Practice Session'",
    }),
    subtitle: z.string().min(5).max(120).default('Translating Complex Regulations').meta({
        description: "Specific exercise topic or learning focus",
    }),
    description: z.string().min(30).max(500).default('This interactive exercise challenges participants to transform complex regulatory language into clear, actionable procedures that can be implemented across departments. Working in cross-functional teams, participants will practice the essential skills needed for effective compliance communication.').meta({
        description: "Detailed explanation of the exercise purpose and what participants will do",
    }),
    exerciseStructure: z.object({
        duration: z.string().min(5).max(100).default('45 minutes including debrief'),
        teams: z.string().min(5).max(100).default('Mixed departmental groups of 4-5 participants'),
        materials: z.string().min(5).max(150).default('Sample regulatory texts, templates, and reference materials')
    }).default({
        duration: '45 minutes including debrief',
        teams: 'Mixed departmental groups of 4-5 participants',
        materials: 'Sample regulatory texts, templates, and reference materials'
    }).meta({
        description: "Logistics and structure - duration, team composition, and required materials",
    }),
    learningObjectives: z.string().min(30).max(400).default('Participants will develop practical skills in regulatory interpretation, cross-departmental communication, and procedure development whilst building collaborative relationships with colleagues from other departments.').meta({
        description: "What participants will learn or accomplish through this exercise",
    }),
    activitySteps: z.array(z.string().min(10).max(250)).min(4).max(8).default([
        'Teams receive authentic regulatory excerpts from current trade compliance requirements',
        'Each team identifies key obligations, timelines, and responsible parties within the regulation',
        'Teams translate the regulatory language into plain English procedures suitable for their respective departments',
        'Groups create implementation checklists and communication protocols',
        'Teams present their interpretations and receive feedback from other participants',
        'Facilitator leads discussion on best practices and common interpretation challenges'
    ]).meta({
        description: "Sequential activity steps - clear instructions for participants to follow (4-8 steps for optimal display)",
    })
});

export const Schema = exerciseActivitySchema;

export type ExerciseActivityData = z.infer<typeof exerciseActivitySchema>;

interface ExerciseActivityLayoutProps {
    data?: Partial<ExerciseActivityData>
}

const ExerciseActivityLayout: React.FC<ExerciseActivityLayoutProps> = ({ data: slideData }) => {
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
                        className="text-4xl sm:text-5xl font-bold mb-2"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Practical Exercise'}
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className="text-2xl font-semibold mb-3"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.subtitle || 'Translating Complex Regulations'}
                    </h2>

                    {/* Description */}
                    <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.description}
                    </p>

                    {/* Content Grid */}
                    <div className="flex gap-6">
                        {/* Left - Activity Steps */}
                        <div className="flex-[2]">
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                Activity Steps
                            </h3>
                            <ol className="space-y-2">
                                {slideData?.activitySteps && slideData.activitySteps.length > 0 ? (
                                    slideData.activitySteps.map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-sm leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span
                                                className="mr-3 font-semibold flex-shrink-0"
                                                style={{ color: "#4a4035" }}
                                            >
                                                {index + 1}.
                                            </span>
                                            <span>{step}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ol>
                        </div>

                        {/* Right - Structure and Objectives */}
                        <div className="flex-1 space-y-4">
                            {/* Exercise Structure */}
                            <div
                                className="p-4 rounded-lg"
                                style={{ background: "#e8e4dc" }}
                            >
                                <h3
                                    className="text-lg font-bold mb-3"
                                    style={{ color: "#4a4035" }}
                                >
                                    Exercise Structure
                                </h3>
                                <div className="space-y-2 text-sm" style={{ color: "#6b5d52" }}>
                                    <div>
                                        <span className="font-semibold" style={{ color: "#4a4035" }}>Duration:</span>{' '}
                                        {slideData?.exerciseStructure?.duration || '45 minutes including debrief'}
                                    </div>
                                    <div>
                                        <span className="font-semibold" style={{ color: "#4a4035" }}>Teams:</span>{' '}
                                        {slideData?.exerciseStructure?.teams || 'Mixed departmental groups of 4-5 participants'}
                                    </div>
                                    <div>
                                        <span className="font-semibold" style={{ color: "#4a4035" }}>Materials:</span>{' '}
                                        {slideData?.exerciseStructure?.materials || 'Sample regulatory texts, templates, and reference materials'}
                                    </div>
                                </div>
                            </div>

                            {/* Learning Objectives */}
                            <div
                                className="p-4 rounded-lg"
                                style={{ background: "#e8e4dc" }}
                            >
                                <h3
                                    className="text-lg font-bold mb-2"
                                    style={{ color: "#4a4035" }}
                                >
                                    Learning Objectives
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "#6b5d52" }}
                                >
                                    {slideData?.learningObjectives || 'Participants will develop practical skills in regulatory interpretation.'}
                                </p>
                            </div>
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

export default ExerciseActivityLayout;
