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

export const layoutId = 'ab4c-scenario-discussion';
export const layoutName = 'Scenario Discussion Framework';
export const layoutDescription = 'A structured discussion layout with a scenario quote, framework description, and numbered step grid. Use this for group discussions, scenario-based exercises, workshop activities, interactive sessions, or structured discussion frameworks.';

const scenarioDiscussionLayoutSchema = z.object({
    title: z.string().min(5).max(80).default('Group Discussion: Ethical Judgement in Trade Compliance').meta({
        description: "Main title for the group discussion or scenario-based activity, setting the core subject",
    }),
    subtitle: z.string().min(5).max(120).default('Navigating grey areas and making sound ethical decisions').meta({
        description: "Subtitle providing a thematic context or a more detailed aspect of the discussion topic",
    }),
    scenario: z.string().min(30).max(500).default('Imagine your company discovers that a long-standing supplier has been using child labor in a remote part of their supply chain. While illegal in that country, it is a common practice. Stopping supply could severely impact your production.').meta({
        description: "A compelling and concise scenario or quote to initiate discussion and provide context",
    }),
    frameworkDescription: z.string().min(30).max(400).default('This framework provides a structured approach to analyze ethical dilemmas in trade compliance. By breaking down the problem into manageable steps, teams can ensure all critical aspects are considered before arriving at a decision.').meta({
        description: "Description of the discussion framework or methodology that will be applied to the scenario",
    }),
    steps: z.array(z.object({
        number: z.number().min(1).max(6).meta({
            description: "The sequential number for each step in the discussion framework",
        }),
        heading: z.string().min(3).max(80).meta({
            description: "A clear heading for each distinct step of the discussion process",
        }),
        description: z.string().min(20).max(200).meta({
            description: "Detailed instructions or an explanation of the objective for each discussion step",
        }),
    })).min(4).max(6).default([
        {
            number: 1,
            heading: 'Identify the Ethical Dilemma',
            description: 'Clearly articulate the core ethical conflict and associated trade compliance implications.',
        },
        {
            number: 2,
            heading: 'Gather Relevant Facts',
            description: 'Collect all pertinent information, including company policies, laws, and potential impact on stakeholders.',
        },
        {
            number: 3,
            heading: 'Evaluate Alternatives',
            description: 'Brainstorm and assess various courses of action, considering short-term and long-term consequences.',
        },
        {
            number: 4,
            heading: 'Make a Decision',
            description: 'Choose the most ethical and compliant course of action, providing clear justification.',
        },
        {
            number: 5,
            heading: 'Implement & Monitor',
            description: 'Execute the decision and monitor its effectiveness, making adjustments as necessary.',
        },
    ]).meta({
        description: "Numbered steps for the discussion framework",
    }),
});

export const Schema = scenarioDiscussionLayoutSchema;

export type ScenarioDiscussionLayoutData = z.infer<typeof scenarioDiscussionLayoutSchema>;

interface ScenarioDiscussionLayoutProps {
    data?: Partial<ScenarioDiscussionLayoutData>;
}

const ScenarioDiscussionLayout: React.FC<ScenarioDiscussionLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Group Discussion: Ethical Judgement in Trade Compliance'}
                    </h1>
                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-lg text-center mb-8"
                    >
                        {slideData?.subtitle || 'Navigating grey areas and making sound ethical decisions'}
                    </p>

                    <div
                        className="rounded-lg p-6 mb-8 text-center"
                        style={{ backgroundColor: ab4cColors.boxBackground, borderLeft: `5px solid ${ab4cColors.accent}` }}
                    >
                        <p style={{ color: ab4cColors.primaryText }} className="text-base italic">
                            "{slideData?.scenario || 'Imagine your company discovers that a long-standing supplier...'}"
                        </p>
                    </div>

                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-base text-center mb-8 max-w-3xl mx-auto"
                    >
                        {slideData?.frameworkDescription || 'This framework provides a structured approach...'}
                    </p>

                    <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
                        {slideData?.steps?.map((step, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: ab4cColors.accent }}
                                >
                                    {step.number}
                                </div>
                                <div>
                                    <h3 style={{ color: ab4cColors.primaryText }} className="text-xl font-semibold mb-1">
                                        {step.heading}
                                    </h3>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {step.description}
                                    </p>
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

export default ScenarioDiscussionLayout;
