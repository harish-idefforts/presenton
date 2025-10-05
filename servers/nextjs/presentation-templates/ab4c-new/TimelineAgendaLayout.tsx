import React from 'react';
import * as z from "zod";

const ab4cColors = {
  background: "#f5f5f0",
  primaryText: "#4a4035",
  secondaryText: "#6b5d52",
  boxBackground: "#e8e4dc",
  accent: "#6b5d52",
};

export const layoutId = 'ab4c-new-timeline-agenda';
export const layoutName = 'Timeline Agenda';
export const layoutDescription = 'Vertical timeline layout perfect for agendas, schedules, or sequential processes. Displays numbered items with time slots, headings, and descriptions.';

const Schema = z.object({
    title: z.string().min(3).max(100).default('Training Agenda').meta({
        description: "Main slide title. Max 8 words",
    }),
    agendaItems: z.array(z.object({
        number: z.string().min(1).max(5).meta({ description: "Item number or sequence" }),
        time: z.string().min(3).max(20).meta({ description: "Time slot or duration" }),
        heading: z.string().min(5).max(60).meta({ description: "Item heading. Max 8 words" }),
        description: z.string().min(10).max(400).meta({ description: "Item description. Max 20 words" }),
    })).min(4).max(8).default([
        { number: '1', time: '9:00-10:00', heading: 'Introduction & Overview', description: 'Welcome session covering program objectives and participant introductions' },
        { number: '2', time: '10:00-11:30', heading: 'Regulatory Framework', description: 'Deep dive into import/export regulations and compliance requirements' },
        { number: '3', time: '11:30-13:00', heading: 'Practical Application', description: 'Hands-on exercises with real-world compliance scenarios' },
        { number: '4', time: '13:00-14:00', heading: 'Q&A and Wrap-up', description: 'Open discussion and summary of key takeaways' },
    ]).meta({
        description: "Timeline items with sequence, time, heading and description. 4-8 items",
    }),
});

export { Schema };
export type TimelineAgendaLayoutData = z.infer<typeof Schema>;

interface TimelineAgendaLayoutProps {
    data?: Partial<TimelineAgendaLayoutData>;
}

const TimelineAgendaLayout: React.FC<TimelineAgendaLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: ab4cColors.background }}
            >
                <div className="relative z-10 flex flex-col h-full p-12 pb-24">
                    <h1 style={{ color: ab4cColors.primaryText }} className="text-4xl font-bold mb-8">
                        {slideData?.title || 'Training Agenda'}
                    </h1>

                    <div className="flex-1 flex flex-col justify-center space-y-4">
                        {slideData?.agendaItems?.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                                        style={{ backgroundColor: ab4cColors.accent }}
                                    >
                                        {item.number}
                                    </div>
                                    <div className="w-24 text-sm font-semibold flex-shrink-0" style={{ color: ab4cColors.primaryText }}>
                                        {item.time}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 style={{ color: ab4cColors.primaryText }} className="text-lg font-semibold mb-1">
                                        {item.heading}
                                    </h3>
                                    <p style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8" style={{ background: ab4cColors.background }}>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>Do not share without permission</span>
                    <span className="text-xs" style={{ color: ab4cColors.secondaryText }}>© 2025 AB4C Compliance & Customer Relations. All rights reserved.</span>
                    <img src="/ab4c-new-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
                </div>
            </div>
        </>
    );
};

export default TimelineAgendaLayout;
