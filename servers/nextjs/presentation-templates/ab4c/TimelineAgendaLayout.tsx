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

export const layoutId = 'ab4c-timeline-agenda';
export const layoutName = 'Timeline Agenda';
export const layoutDescription = 'Vertical timeline layout for agendas, showing numbered items with time slots, headings, descriptions, and a visual connecting line.';

const timelineAgendaLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Training Agenda').meta({
        description: "Main title for the agenda or timeline slide, such as 'Training Agenda' or 'Project Milestones'",
    }),
    agendaItems: z.array(z.object({
        number: z.number().min(1).max(7).meta({
            description: "Sequential number for each agenda item or step in the timeline",
        }),
        time: z.string().min(3).max(20).meta({
            description: "Estimated duration or time slot for the agenda item (e.g., '15 mins', '1:00 PM')",
        }),
        heading: z.string().min(3).max(80).meta({
            description: "Concise heading for the agenda item, summarizing its topic",
        }),
        description: z.string().min(10).max(100).meta({
            description: "Brief descriptive text explaining the content or objective of the agenda item",
        }),
    })).min(4).max(7).default([
        {
            number: 1,
            time: '10 mins',
            heading: 'Welcome & Introduction',
            description: 'Setting the stage for the training, highlighting the critical importance of accuracy, and outlining the primary objectives and overall scope of the session.',
        },
        {
            number: 2,
            time: '25 mins',
            heading: 'Imperative of Accuracy in Quality (QC) & Analysis',
            description: 'Examining the significant ramifications of inaccuracies through case studies, detailing financial, reputational, and operational costs. Emphasizing statistical significance and data integrity.',
        },
        {
            number: 3,
            time: '30 mins',
            heading: 'Understanding Sources of Error',
            description: 'Identifying prevalent error sources, encompassing human factors like cognitive biases and fatigue, process flaws including inadequate procedures, system limitations such as software glitches, and environmental influences.',
        },
        {
            number: 4,
            time: '30 mins',
            heading: 'Introduction to Accuracy Checklists',
            description: 'Defining accuracy checklists and their core purpose. Discussing the extensive benefits of their implementation, such as error reduction, consistency, and efficiency. Showcasing examples from diverse industries.',
        },
        {
            number: 5,
            time: '45 mins',
            heading: 'Designing Effective Accuracy Checklists',
            description: 'Exploring key principles for effective checklist design, focusing on clarity, conciseness, and actionability. Outlining a step-by-step development process, and customization for specific tasks using available tools and templates.',
        },
        {
            number: 6,
            time: '30 mins',
            heading: 'Implementing & Utilizing Checklists',
            description: 'Providing best practices for integrating checklists into existing workflows and effective strategies for team training and communication. Detailing methods for monitoring and feedback to ensure iterative improvement.',
        },
        {
            number: 7,
            time: '20 mins',
            heading: 'Case Studies & Practical Application',
            description: 'Engaging in a group exercise where participants develop a checklist for a given scenario, followed by a collaborative discussion.',
        },
    ]).meta({
        description: "A list of agenda items presented in a vertical timeline, each with a time, heading, and description. Best suited for sequences or schedules up to 7 items",
    }),
});

export const Schema = timelineAgendaLayoutSchema;

export type TimelineAgendaLayoutData = z.infer<typeof timelineAgendaLayoutSchema>;

interface TimelineAgendaLayoutProps {
    data?: Partial<TimelineAgendaLayoutData>;
}

const TimelineAgendaLayout: React.FC<TimelineAgendaLayoutProps> = ({ data: slideData }) => {
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
                        className="text-3xl sm:text-4xl font-bold text-center mb-8" // Adjusted title size
                    >
                        {slideData?.title || 'Training Duration & Agenda'}
                    </h1>

                    <div className="flex-1 relative flex justify-center py-4">
                        {/* Vertical Line - Background element */}
                        <div
                            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5"
                            style={{ backgroundColor: ab4cColors.accent }}
                        ></div>

                        {/* Agenda Items Container */}
                        <div className="flex flex-col space-y-4 w-full max-w-4xl py-4 items-stretch">
                            {slideData?.agendaItems?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    {index % 2 === 0 ? ( // Adjusted to match the gamma-template image for items 1, 3, 5, 7 (0-indexed even)
                                        <>
                                            {/* Time on left */}
                                            <div className="w-1/2 pr-6 text-right">
                                                <span style={{ color: ab4cColors.primaryText }} className="text-lg font-medium">
                                                    {item.time}
                                                </span>
                                            </div>

                                            {/* Circle Container */}
                                            <div className="flex items-center justify-center -mr-5 -ml-5 z-10">
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                                                    style={{ backgroundColor: ab4cColors.accent }}
                                                >
                                                    {item.number}
                                                </div>
                                            </div>

                                            {/* Heading & Description on right */}
                                            <div className="w-1/2 pl-6 text-left">
                                                <h3 style={{ color: ab4cColors.primaryText }} className="text-base font-semibold leading-tight">
                                                    {item.heading}
                                                </h3>
                                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm leading-snug">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </>
                                    ) : ( // Adjusted to match the gamma-template image for items 2, 4, 6, 8 (0-indexed odd)
                                        <>
                                            {/* Heading & Description on left */}
                                            <div className="w-1/2 pr-6 text-right">
                                                <h3 style={{ color: ab4cColors.primaryText }} className="text-base font-semibold leading-tight">
                                                    {item.heading}
                                                </h3>
                                                <p style={{ color: ab4cColors.secondaryText }} className="text-sm leading-snug">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Circle Container */}
                                            <div className="flex items-center justify-center -mr-5 -ml-5 z-10">
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                                                    style={{ backgroundColor: ab4cColors.accent }}
                                                >
                                                    {item.number}
                                                </div>
                                            </div>

                                            {/* Time on right */}
                                            <div className="w-1/2 pl-6 text-left">
                                                <span style={{ color: ab4cColors.primaryText }} className="text-lg font-medium">
                                                    {item.time}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
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

export default TimelineAgendaLayout;
