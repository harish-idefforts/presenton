import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-timeline-agenda';
export const layoutName = 'Timeline Agenda';
export const layoutDescription = 'A professional vertical timeline layout with numbered items, time slots, headings, and descriptions. Use this specifically for training agendas, event schedules, session timelines, workshop programs, or any time-based sequence of activities. This layout is essential when presenting chronological information or scheduled events.';

const timelineAgendaSchema = z.object({
    title: z.string().min(5).max(60).default('Training Agenda').meta({
        description: "Main title - typically 'Agenda', 'Training Schedule', 'Session Timeline', or 'Program Overview' (keep under 60 chars)",
    }),
    agendaItems: z.array(z.object({
        number: z.number().int().min(1).max(6),
        time: z.string().min(5).max(30),
        heading: z.string().min(5).max(70),
        description: z.string().min(10).max(100)
    })).min(4).max(6).default([
        {
            number: 1,
            time: '09:00 - 09:30',
            heading: 'Opening & Foundations',
            description: 'Introduction to compliance basics and course overview'
        },
        {
            number: 2,
            time: '09:30 - 10:30',
            heading: 'Language of Compliance',
            description: 'Understanding regulatory terminology'
        },
        {
            number: 3,
            time: '10:45 - 11:45',
            heading: 'Analytical Thinking',
            description: 'Tools and frameworks for compliance analysis'
        },
        {
            number: 4,
            time: '12:00 - 13:00',
            heading: 'Attention to Detail',
            description: 'Best practices for documentation and verification'
        },
        {
            number: 5,
            time: '14:00 - 14:45',
            heading: 'Ethical Judgement',
            description: 'Decision-making in compliance scenarios'
        }
    ]).meta({
        description: "Chronological list of agenda items - each with sequential number (1-6), time slot (under 30 chars), session heading (under 70 chars), and brief description (under 100 chars). Use 4-6 items for optimal display.",
    })
});

export const Schema = timelineAgendaSchema;

export type TimelineAgendaData = z.infer<typeof timelineAgendaSchema>;

interface TimelineAgendaLayoutProps {
    data?: Partial<TimelineAgendaData>
}

const TimelineAgendaLayout: React.FC<TimelineAgendaLayoutProps> = ({ data: slideData }) => {
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
                        className="text-3xl sm:text-4xl font-bold mb-6"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Training Agenda'}
                    </h1>

                    {/* Timeline Items */}
                    <div>
                        {slideData?.agendaItems && slideData.agendaItems.length > 0 ? (
                            slideData.agendaItems.map((item, index) => (
                                <div key={index} className="flex mb-3 last:mb-0">
                                    {/* Left Side - Time and Heading */}
                                    <div className="flex-1 text-right pr-8">
                                        <div className="mb-0.5">
                                            <span
                                                className="text-xs font-semibold"
                                                style={{ color: "#4a4035" }}
                                            >
                                                {item.time}
                                            </span>
                                        </div>
                                        <p
                                            className="text-xs leading-tight"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            {item.heading}
                                        </p>
                                    </div>

                                    {/* Center - Number and Line */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-9 h-9 rounded-sm flex items-center justify-center font-bold text-base mb-2"
                                            style={{ background: "#e8e4dc", color: "#4a4035" }}
                                        >
                                            {item.number}
                                        </div>
                                        {index < (slideData.agendaItems?.length || 0) - 1 && (
                                            <div
                                                className="w-0.5 flex-1 min-h-[20px]"
                                                style={{ background: "#e8e4dc" }}
                                            />
                                        )}
                                    </div>

                                    {/* Right Side - Description */}
                                    <div className="flex-1 pl-8 pt-1">
                                        <p
                                            className="text-xs font-medium leading-tight"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
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

export default TimelineAgendaLayout;
