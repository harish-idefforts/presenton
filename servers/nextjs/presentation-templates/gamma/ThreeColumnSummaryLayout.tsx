import React from 'react';
import * as z from "zod";

export const layoutId = 'gamma-three-column-summary';
export const layoutName = 'Three Column Summary';
export const layoutDescription = 'A comprehensive summary layout with title, description, three organized columns, and inspirational quote. Use this specifically for final summaries, closing slides, key takeaways, next steps, wrap-up presentations, or conclusion slides. Perfect for ending presentations with clear action items and memorable messages.';

const threeColumnSummarySchema = z.object({
    title: z.string().min(5).max(80).default('Summary and Next Steps').meta({
        description: "Main summary title - typically 'Summary', 'Key Takeaways', 'Conclusion', 'Next Steps', or 'Wrap-Up'",
    }),
    description: z.string().min(20).max(300).default('Import compliance is a complex but manageable aspect of international trade that requires ongoing attention, proper systems, and continuous learning. Success depends on understanding regulations, implementing robust procedures, and maintaining current knowledge of changing requirements.').meta({
        description: "Overview or context paragraph summarizing the main points of the presentation",
    }),
    column1Title: z.string().min(3).max(50).default('Key Takeaways').meta({
        description: "Heading for first column - often 'Key Takeaways', 'Main Points', or 'Lessons Learned'",
    }),
    column1Bullets: z.array(z.string().min(5).max(150)).min(3).max(8).default([
        'Compliance is an ongoing process, not a one-time event',
        'Proper classification and valuation are fundamental requirements',
        'Documentation accuracy is critical for smooth operations',
        'Risk management requires proactive identification and mitigation',
        'Technology and professional partnerships enhance compliance'
    ]).meta({
        description: "Key points, main takeaways, or important lessons from the presentation (3-8 items)",
    }),
    column2Title: z.string().min(3).max(50).default('Immediate Action Items').meta({
        description: "Heading for second column - often 'Action Items', 'Next Steps', or 'Immediate Actions'",
    }),
    column2Bullets: z.array(z.string().min(5).max(150)).min(3).max(8).default([
        'Review current classification procedures for accuracy',
        'Conduct compliance audit of recent imports',
        'Update written procedures and training materials',
        'Evaluate technology solutions for process improvement',
        'Schedule regular compliance training sessions'
    ]).meta({
        description: "Immediate action items or next steps to be taken (3-8 items)",
    }),
    column3Title: z.string().min(3).max(50).default('Ongoing Development').meta({
        description: "Heading for third column - often 'Resources', 'Long-term Goals', or 'Ongoing Development'",
    }),
    column3Bullets: z.array(z.string().min(5).max(150)).min(3).max(8).default([
        'Subscribe to regulatory update services',
        'Join trade association compliance committees',
        'Attend industry conferences and training programs',
        'Build relationships with compliance professionals',
        'Monitor changes in trade agreements and tariffs'
    ]).meta({
        description: "Long-term development points, resources, or continued learning items (3-8 items)",
    }),
    quote: z.string().min(20).max(300).default('Compliance is not about perfection—it\'s about having the right systems, knowledge, and commitment to continuous improvement in an ever-changing regulatory environment.').meta({
        description: "Inspirational or memorable closing quote that reinforces the presentation's main message",
    }),
    contactInfo: z.string().min(10).max(200).optional().default('Contact Information: For additional resources, compliance updates, or specialized training programs, please contact your compliance team or designated import specialist.').meta({
        description: "Optional contact information or additional resources for follow-up",
    })
});

export const Schema = threeColumnSummarySchema;

export type ThreeColumnSummaryData = z.infer<typeof threeColumnSummarySchema>;

interface ThreeColumnSummaryLayoutProps {
    data?: Partial<ThreeColumnSummaryData>
}

const ThreeColumnSummaryLayout: React.FC<ThreeColumnSummaryLayoutProps> = ({ data: slideData }) => {
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
                <div className="relative z-10 h-full flex flex-col px-12 lg:px-16 pt-10 pb-24">
                    {/* Title */}
                    <h1
                        className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-4"
                        style={{ color: "#4a4035" }}
                    >
                        {slideData?.title || 'Summary and Next Steps'}
                    </h1>

                    {/* Description */}
                    <p
                        className="text-sm leading-relaxed mb-6"
                        style={{ color: "#6b5d52" }}
                    >
                        {slideData?.description || 'Import compliance is a complex but manageable aspect of international trade that requires ongoing attention, proper systems, and continuous learning.'}
                    </p>

                    {/* Three Columns */}
                    <div className="flex gap-4 mb-4">
                        {/* Column 1 */}
                        <div
                            className="flex-1 rounded-lg p-4 shadow-sm"
                            style={{ background: "#e8e4dc" }}
                        >
                            <h2
                                className="text-xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.column1Title || 'Key Takeaways'}
                            </h2>
                            <ul className="space-y-2">
                                {slideData?.column1Bullets && slideData.column1Bullets.length > 0 ? (
                                    slideData.column1Bullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-xs leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div
                            className="flex-1 rounded-lg p-4 shadow-sm"
                            style={{ background: "#e8e4dc" }}
                        >
                            <h2
                                className="text-xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.column2Title || 'Immediate Action Items'}
                            </h2>
                            <ul className="space-y-2">
                                {slideData?.column2Bullets && slideData.column2Bullets.length > 0 ? (
                                    slideData.column2Bullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-xs leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div
                            className="flex-1 rounded-lg p-4 shadow-sm"
                            style={{ background: "#e8e4dc" }}
                        >
                            <h2
                                className="text-xl font-semibold mb-3"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData?.column3Title || 'Ongoing Development'}
                            </h2>
                            <ul className="space-y-2">
                                {slideData?.column3Bullets && slideData.column3Bullets.length > 0 ? (
                                    slideData.column3Bullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-xs leading-relaxed"
                                            style={{ color: "#6b5d52" }}
                                        >
                                            <span className="mr-2 mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </div>
                    </div>

                    {/* Quote */}
                    <div
                        className="mt-2 py-3 px-4 border-l-4"
                        style={{ borderColor: "#6b5d52" }}
                    >
                        <p
                            className="text-sm italic leading-relaxed"
                            style={{ color: "#6b5d52" }}
                        >
                            "{slideData?.quote || 'Compliance is not about perfection—it\'s about having the right systems, knowledge, and commitment to continuous improvement in an ever-changing regulatory environment.'}"
                        </p>
                    </div>

                    {/* Contact Info */}
                    {slideData?.contactInfo && (
                        <div className="mt-3">
                            <p
                                className="text-xs leading-relaxed font-semibold"
                                style={{ color: "#4a4035" }}
                            >
                                {slideData.contactInfo}
                            </p>
                        </div>
                    )}
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

export default ThreeColumnSummaryLayout;
