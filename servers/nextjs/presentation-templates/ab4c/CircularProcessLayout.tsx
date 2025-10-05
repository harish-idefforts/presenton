import React from 'react';
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

// Colors for ab4c template
const ab4cColors = {
  background: "#f5f5f0",      // Beige background
  primaryText: "#4a4035",      // Dark brown headings
  secondaryText: "#6b5d52",    // Medium brown body text
  boxBackground: "#e8e4dc",    // Light brown for boxes/cards
  accent: "#6b5d52",           // Border and accent color
};

export const layoutId = 'ab4c-circular-process';
export const layoutName = 'Circular Process Diagram';
export const layoutDescription = 'A circular/cyclical process diagram with icons in the center circle and text descriptions positioned around it. Use this for continuous improvement cycles, cyclical processes, balanced frameworks, iterative methodologies, or interconnected concepts. Perfect for showing processes that loop or require ongoing iteration.';

const circularProcessLayoutSchema = z.object({
    title: z.string().min(5).max(100).default('Analytical Thinking for Compliance Professionals').meta({
        description: "Main title describing the circular process or cycle, clear and concise",
    }),
    subtitle: z.string().min(5).max(120).optional().default('A continuous cycle of observation, assessment, and adjustment').meta({
        description: "An optional subtitle to further elaborate on the continuous nature of the process",
    }),
    description: z.string().min(30).max(500).default('Effective compliance is an ongoing journey that requires iterative analysis and adaptation. This circular process illustrates the continuous engagement necessary to maintain regulatory adherence and operational excellence in a dynamic environment.').meta({
        description: "Description of the circular process",
    }),
    processSteps: z.array(z.object({
        position: z.number().min(1).max(6).meta({
            description: "Position of the step (1-6, clockwise from top)",
        }),
        icon: IconSchema.default({
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/search-bold.svg',
            __icon_query__: 'search icon'
        }).meta({
            description: "Icon symbolizing the specific action or characteristic of this process step",
        }),
        heading: z.string().min(3).max(50).meta({
            description: "A short, active heading for the process step (e.g., Identify, Analyze)",
        }),
        description: z.string().min(20).max(200).meta({
            description: "Concise description of what happens at this stage of the circular process",
        }),
    })).min(4).max(6).default([
        {
            position: 1,
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/search-bold.svg', __icon_query__: 'search' },
            heading: 'Identify',
            description: 'Continuously identify new regulations, risks, and changes in the business environment.',
        },
        {
            position: 2,
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/analyze-bold.svg', __icon_query__: 'analyze' },
            heading: 'Analyze',
            description: 'Evaluate the impact of identified factors on current compliance strategies and processes.',
        },
        {
            position: 3,
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg', "__icon_query__": "lightbulb"  },
            heading: 'Implement',
            description: 'Develop and integrate revised policies, procedures, and controls into operations.',
        },
        {
            position: 4,
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/checkmark-bold.svg', "__icon_query__": "checkmark"  },
            heading: 'Evaluate',
            description: 'Assess the effectiveness of implemented changes and overall compliance posture.',
        },
        {
            position: 5,
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/refresh-bold.svg', "__icon_query__": "refresh"  },
            heading: 'Adapt',
            description: 'Adjust strategies based on evaluation outcomes and new insights, restarting the cycle.',
        },
    ]).meta({
        description: "Steps in the circular process, ordered by position (1-6 clockwise)",
    }),
    bottomText: z.string().min(20).max(300).optional().default('This iterative approach ensures your compliance framework remains robust, responsive, and relevant in the face of evolving global trade dynamics.').meta({
        description: "Optional concluding text reinforcing the key takeaway or benefits of the circular process",
    }),
});

export const Schema = circularProcessLayoutSchema;

export type CircularProcessLayoutData = z.infer<typeof circularProcessLayoutSchema>;

interface CircularProcessLayoutProps {
    data?: Partial<CircularProcessLayoutData>;
}

const CircularProcessLayout: React.FC<CircularProcessLayoutProps> = ({ data: slideData }) => {
    const processSteps = slideData?.processSteps || [];
    const numSteps = processSteps.length;

    // Arrange steps in clockwise order around the circle
    const sortedSteps = [...processSteps].sort((a, b) => a.position - b.position);

    const getStepClasses = (index: number) => {
        // Distribute steps evenly around the circle
        const angle = (360 / numSteps) * index;
        const radius = 200; // Adjust radius as needed
        const centerX = 250; // Center of parent container (500x500 for example)
        const centerY = 250;

        const x = centerX + radius * Math.cos((angle - 90) * Math.PI / 180); // -90 to start at top
        const y = centerY + radius * Math.sin((angle - 90) * Math.PI / 180);

        return {
            left: `${x - 75}px`, // Adjust for step box width/2
            top: `${y - 75}px`,  // Adjust for step box height/2
            position: 'absolute',
        };
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
                        {slideData?.title || 'Analytical Thinking for Compliance Professionals'}
                    </h1>
                    {slideData?.subtitle && (
                        <p
                            style={{ color: ab4cColors.secondaryText }}
                            className="text-lg text-center mb-8"
                        >
                            {slideData.subtitle}
                        </p>
                    )}
                    <p
                        style={{ color: ab4cColors.secondaryText }}
                        className="text-base text-center mb-8 max-w-3xl mx-auto"
                    >
                        {slideData?.description || 'Effective compliance is an ongoing journey...'}
                    </p>

                    <div className="relative flex-1 flex items-center justify-center">
                        {/* Central Circle */}
                        <div
                            className="w-80 h-80 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: ab4cColors.boxBackground, border: `3px solid ${ab4cColors.accent}` }}
                        >
                            <span style={{ color: ab4cColors.primaryText }} className="text-2xl font-bold text-center">
                                Compliance Cycle
                            </span>
                        </div>

                        {/* Process Steps around the circle */}
                        <div className="absolute w-full h-full flex items-center justify-center">
                            {sortedSteps.map((step, index) => {
                                // Calculate position based on the number of steps
                                const angle = (360 / numSteps) * index - 90; // Start from top (-90 degrees)
                                const outerRadius = 250; // Distance from center for the step boxes
                                const innerRadius = 200; // Distance from center for the labels to approximate a circle
                                
                                const x = outerRadius * Math.cos(angle * Math.PI / 180);
                                const y = outerRadius * Math.sin(angle * Math.PI / 180);

                                const textX = innerRadius * Math.cos(angle * Math.PI / 180);
                                const textY = innerRadius * Math.sin(angle * Math.PI / 180);

                                return (
                                    <div
                                        key={index}
                                        className="absolute w-32 text-center"
                                        style={{
                                            transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`, // Center the div
                                        }}
                                    >
                                        <div
                                            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-2 shadow-md"
                                            style={{ backgroundColor: ab4cColors.accent }}
                                        >
                                            <RemoteSvgIcon
                                                url={step.icon.__icon_url__}
                                                strokeColor="#fff"
                                                className="w-8 h-8"
                                                color="#fff"
                                                title={step.icon.__icon_query__}
                                            />
                                        </div>
                                        <h3 style={{ color: ab4cColors.primaryText }} className="text-sm font-semibold">
                                            {step.heading}
                                        </h3>
                                        {step.description && (
                                            <p style={{ color: ab4cColors.secondaryText }} className="text-xs">
                                                {step.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {slideData?.bottomText && (
                        <p style={{ color: ab4cColors.secondaryText }} className="text-sm text-center mt-8 px-8">
                            {slideData.bottomText}
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

export default CircularProcessLayout;
