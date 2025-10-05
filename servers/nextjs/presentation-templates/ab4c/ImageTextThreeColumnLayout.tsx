import React from 'react';
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-image-text-three-column';
export const layoutName = 'Image-Text Three Column';
export const layoutDescription = 'A three-column layout with images and extensive text content, featuring small images at top followed by large paragraphs and bullets. Use this for detailed three-part explanations, complex topics requiring extensive text, comparative analysis with visuals, or multi-faceted solutions. Perfect for in-depth content that needs visual support.';

const imageTextThreeColumnLayoutSchema = z.object({
    title: z.string().min(5).max(100).default('Overcoming Cultural and Language Barriers in Global Trade').meta({
        description: "Main title for a slide comparing three key aspects visually and with detailed explanations",
    }),
    columns: z.array(z.object({
        image: ImageSchema.default({
            __image_url__: 'https://images.unsplash.com/photo-1516585141230-cb0b9c9f2b8f?auto=format&fit=crop&w=640&q=80',
            __image_prompt__: 'Diverse group of business people from different cultures in a meeting communicating harmoniously'
        }).meta({
            description: "A small, illustrative image representing the column's topic, for visual support of the text",
        }),
        heading: z.string().min(3).max(80).meta({
            description: "Headline for each column, introducing the specific aspect being discussed",
        }),
        description: z.string().min(50).max(400).meta({
            description: "Extensive descriptive paragraph for the column, providing detailed context and explanation",
        }),
        bullets: z.array(z.string().min(10).max(150)).min(2).max(6).default([
            'Cultural sensitivity training.',
            'Use of neutral, clear language.'
        ]).meta({
            description: "Supporting bullet points for the column's main description, highlighting key takeaways or examples",
        }),
    })).min(3).max(3).default([
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1516585141230-cb0b9c9f2b8f?auto=format&fit=crop&w=640&q=80',
                __image_prompt__: 'Diverse group of business people from different cultures in a meeting communicating harmoniously'
            },
            heading: 'Cultural Nuances',
            description: 'Understanding and respecting cultural differences is paramount in international trade. Misinterpretations can arise from varying communication styles, business etiquettes, and negotiation tactics, leading to compliance pitfalls and strained relationships. Training and awareness programs are crucial to bridge these gaps. Building empathy and adopting a global mindset fosters better collaboration and reduces errors.',
            bullets: [
                'Cultural sensitivity training for teams.',
                'Local context awareness in policy interpretation.',
                'Respect for diverse communication styles.'
            ],
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1522204539890-fd62078693c0?auto=format&fit=crop&w=640&q=80',
                __image_prompt__: 'Zoomed in image of hands typing on a laptop keyboard, representing digital communication and translation'
            },
            heading: 'Language Precision',
            description: 'Even with standard terms, literal translations can miss context or local legal interpretations. Using clear, concise, and unambiguous language in all trade documents and communications is vital. Employing professional translators and ensuring back-translation can prevent costly errors and disputes. Avoid jargon and simplify complex clauses for universal understanding across all stakeholders.',
            bullets: [
                'Utilize certified translation services.',
                'Employ plain language in documentation.',
                'Verify understanding through cultural liaisons.'
            ],
        },
        {
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1502945015378-0e28516c567e?auto=format&fit=crop&w=640&q=80',
                __image_prompt__: 'Two business people shaking hands over a globe, symbolizing global partnership and effective communication'
            },
            heading: 'Communication Strategies',
            description: 'Developing effective communication strategies globally involves active listening, reiterating key points, and seeking clarification constantly. Establishing clear feedback loops and using visual aids can reinforce understanding. Regular cross-cultural team meetings provide forums for discussion and resolution of potential misunderstandings. Transparency and openness are key pillars for resilient global operations and compliance adherence.',
            bullets: [
                'Implement active listening techniques.',
                'Establish clear feedback mechanisms.',
                'Conduct regular cross-cultural team check-ins.'
            ],
        },
    ]).meta({
        description: "Three columns with images, headings, extensive descriptions, and bullet points",
    }),
    footerText: z.string().min(20).max(400).optional().default('By proactively addressing cultural and language barriers, organizations can significantly enhance their global trade compliance, fostering smoother operations and stronger international partnerships.').meta({
        description: "Optional concluding sentence summarizing the key message or implication of the three-column comparison",
    }),
});

export const Schema = imageTextThreeColumnLayoutSchema;

export type ImageTextThreeColumnLayoutData = z.infer<typeof imageTextThreeColumnLayoutSchema>;

interface ImageTextThreeColumnLayoutProps {
    data?: Partial<ImageTextThreeColumnLayoutData>;
}

const ImageTextThreeColumnLayout: React.FC<ImageTextThreeColumnLayoutProps> = ({ data: slideData }) => {
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
                        {slideData?.title || 'Overcoming Cultural and Language Barriers in Global Trade'}
                    </h1>

                    <div className="flex-1 grid grid-cols-3 gap-8 ">
                        {slideData?.columns?.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                className="flex flex-col  rounded-lg p-6 shadow-md"
                                style={{ backgroundColor: ab4cColors.boxBackground }}
                            >
                                <div className="h-24 mb-4 rounded-md overflow-hidden flex-shrink-0">
                                     <img
                                        src={column.image.__image_url__ || ''}
                                        alt={column.image.__image_prompt__ || column.heading || ''}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3
                                    style={{ color: ab4cColors.primaryText }}
                                    className="text-xl font-semibold mb-3 text-center"
                                >
                                    {column.heading}
                                </h3>
                                <p
                                    style={{ color: ab4cColors.secondaryText }}
                                    className="text-sm leading-relaxed mb-4 flex-grow"
                                >
                                    {column.description}
                                </p>
                                <ul className="list-disc pl-5 space-y-1 mt-auto">
                                    {column.bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex} style={{ color: ab4cColors.secondaryText }} className="text-sm">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {slideData?.footerText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-8 px-8">
                            {slideData.footerText}
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

export default ImageTextThreeColumnLayout;
