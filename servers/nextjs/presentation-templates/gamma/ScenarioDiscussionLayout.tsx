import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-scenario-discussion';
export const layoutName = 'Scenario Discussion Framework';
export const layoutDescription = 'A structured discussion layout with scenario quote, framework description, and numbered step grid. Use this specifically for group discussions, scenario-based exercises, workshop activities, interactive sessions, or structured discussion frameworks. Perfect for facilitating collaborative learning and guided conversations.';

const scenarioDiscussionSchema = z.object({
    title: z.string().min(5).max(80).default('Group Discussion').meta({
        description: "Main discussion or activity title - typically 'Group Discussion', 'Workshop', 'Interactive Session', or 'Scenario Exercise'",
    }),
    subtitle: z.string().min(5).max(120).default('Navigating Ethical Dilemmas in Compliance').meta({
        description: "Specific discussion topic or scenario theme being explored",
    }),
    scenario: z.string().min(30).max(250).default('"A key customer requests expedited shipment that requires bypassing compliance procedures. The order represents 15% of quarterly revenue but would delay shipment by three days."').meta({
        description: "Brief scenario description or ethical dilemma presented as a quote - sets context for discussion (keep under 250 chars)",
    }),
    frameworkDescription: z.string().min(30).max(180).default('This session explores ethical dilemmas in trade compliance, encouraging participants to share experiences and develop collaborative approaches.').meta({
        description: "Brief description of the discussion framework and its purpose (keep under 180 chars)",
    }),
    steps: z.array(z.object({
        number: z.number().int().min(1).max(4),
        heading: z.string().min(3).max(60),
        description: z.string().min(20).max(100)
    })).min(4).max(4).default([
        {
            number: 1,
            heading: 'Scenario Presentation',
            description: 'Facilitator presents realistic compliance dilemma requiring ethical judgement.'
        },
        {
            number: 2,
            heading: 'Individual Reflection',
            description: 'Participants consider responses and identify key ethical principles.'
        },
        {
            number: 3,
            heading: 'Small Group Discussion',
            description: 'Groups explore perspectives and develop potential solutions.'
        },
        {
            number: 4,
            heading: 'Collective Debrief',
            description: 'Groups share insights and build shared understanding.'
        }
    ]).meta({
        description: "Numbered framework steps (exactly 4 steps in 2x2 grid) - each with number, heading, and brief description (under 100 chars)",
    })
});

export const Schema = scenarioDiscussionSchema;

export type ScenarioDiscussionData = z.infer<typeof scenarioDiscussionSchema>;

interface ScenarioDiscussionLayoutProps {
    data?: Partial<ScenarioDiscussionData>
}

const ScenarioDiscussionLayout: React.FC<ScenarioDiscussionLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Group Discussion'}
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className="text-2xl font-semibold mb-4"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.subtitle || 'Navigating Ethical Dilemmas in Compliance'}
                    </h2>

                    {/* Scenario Quote */}
                    <div
                        className="p-3 mb-4 border-l-4"
                        style={{ background: "#e8e4dc", borderColor: "#6b5d52" }}
                    >
                        <p
                            className="text-xs italic leading-relaxed"
                            style={{ color: "#4a4035" }}
                        >
                            {slideData?.scenario}
                        </p>
                    </div>

                    {/* Framework Description */}
                    <h3
                        className="text-base font-bold mb-2"
                        style={{ color: "#4a4035" }}
                    >
                        Discussion Framework
                    </h3>
                    <p
                        className="text-xs leading-relaxed mb-4"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.frameworkDescription}
                    </p>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-2 gap-5">
                        {slideData?.steps && slideData.steps.length > 0 ? (
                            slideData.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="border-t-4 pt-2"
                                    style={{ borderColor: "#6b5d52" }}
                                >
                                    <div
                                        className="text-xs font-bold mb-1"
                                        style={{ color: "#6b5d52" }}
                                    >
                                        {String(step.number).padStart(2, '0')}
                                    </div>
                                    <h4
                                        className="text-sm font-bold mb-1.5"
                                        style={{ color: "#4a4035" }}
                                    >
                                        {step.heading}
                                    </h4>
                                    <p
                                        className="text-xs leading-relaxed"
                                        style={{ color: "#6b5d52" }}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            ))
                        ) : null}
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

export default ScenarioDiscussionLayout;
