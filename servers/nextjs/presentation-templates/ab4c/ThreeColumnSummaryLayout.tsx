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

export const layoutId = 'ab4c-three-column-summary';
export const layoutName = 'Three Column Summary';
export const layoutDescription = 'Summary slide with a title, description, three columns of headings and bullet points, and an optional quote and contact information.';

const threeColumnSummaryLayoutSchema = z.object({
    title: z.string().min(3).max(60).default('Training Summary and Next Steps').meta({
        description: "Main title for the summary or concluding slide of a presentation, like 'Key Takeaways' or 'Next Steps'",
    }),
    description: z.string().min(50).max(200).default('This training program has equipped you with a foundational understanding of trade compliance and practical strategies for effective implementation.').meta({
        description: "Introductory summary paragraph for the conclusion of the presentation",
    }),
    columns: z.array(z.object({
        heading: z.string().min(3).max(80).meta({
            description: "Heading for each summary column, such as 'Key Takeaways', 'Next Steps', or 'Resources'",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(5).default([
            'Comprehensive understanding of compliance regulations.',
            'Enhanced risk assessment and mitigation skills.',
            'Best practices for documentation and internal controls.'
        ]).meta({
            description: "Bullet points detailing the summary information for each column",
        }),
    })).min(3).max(3).default([
        {
            heading: 'Key Takeaways',
            bullets: [
                'Comprehensive understanding of compliance regulations.',
                'Enhanced risk assessment and mitigation skills.',
                'Best practices for documentation and internal controls.'
            ]
        },
        {
            heading: 'Next Steps',
            bullets: [
                'Review provided resources and course materials.',
                'Apply learned concepts to real-world scenarios.',
                'Participate in follow-up Q&A sessions.'
            ]
        },
        {
            heading: 'Support & Resources',
            bullets: [
                'Access to online compliance toolkit and templates.',
                'Dedicated support team for ongoing queries.',
                'Regular updates on regulatory changes.'
            ]
        },
    ]).meta({
        description: "Three columns with headings and bullet points",
    }),
    quote: z.string().min(30).max(300).optional().default('“Compliance is not just a legal obligation; it is a strategic advantage that fosters trust and sustainable growth in the global marketplace.”').meta({
        description: "An optional, impactful quote to reinforce the presentation's core message or theme",
    }),
    contactInfo: z.string().min(10).max(200).optional().default('For further information, please contact: compliance@ab4c.com | +1 (800) 123-4567 | www.ab4c.com').meta({
        description: "Optional contact information for further inquiries or follow-up",
    }),
});

export const Schema = threeColumnSummaryLayoutSchema;

export type ThreeColumnSummaryLayoutData = z.infer<typeof threeColumnSummaryLayoutSchema>;

interface ThreeColumnSummaryLayoutProps {
    data?: Partial<ThreeColumnSummaryLayoutData>;
}

const ThreeColumnSummaryLayout: React.FC<ThreeColumnSummaryLayoutProps> = ({ data: slideData }) => {
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
                        className="text-4xl lg:text-5xl font-bold text-center mb-6"
                    >
                        {slideData?.title || 'Training Summary and Next Steps'}
                    </h1>
                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-base text-center mb-10 max-w-3xl mx-auto"
                    >
                        {slideData?.description || 'This training program has equipped you with a foundational understanding of trade compliance and practical strategies for effective implementation.'}
                    </p>

                    <div className="flex-1 grid grid-cols-3 gap-8 ">
                        {slideData?.columns?.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                className="flex flex-col  rounded-lg p-6"
                                style={{ backgroundColor: ab4cColors.boxBackground }}
                            >
                                <h3
                                    style={{ color: ab4cColors.primaryText }}
                                    className="text-xl font-semibold mb-4"
                                >
                                    {column.heading}
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 flex-1">
                                    {column.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} style={{ color: ab4cColors.secondaryText }} className="text-sm leading-relaxed">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {slideData?.quote && (
                        <p style={{ color: ab4cColors.primaryText }} className="text-lg italic text-center mt-8">
                            {slideData.quote}
                        </p>
                    )}
                    {slideData?.contactInfo && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-4">
                            {slideData.contactInfo}
                        </p>
                    )}
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

export default ThreeColumnSummaryLayout;
