import React from "react";
import * as z from "zod";

export const layoutId = "ab4c-a4-one-pager";
export const layoutName = "AB4C A4 One-Pager";
export const layoutDescription =
  "Single-slide one-pager for customer excellence tips with clear sections.";

const palette = {
  background: "#f8f6f1",
  surface: "#ffffff",
  primary: "#3d3026",
  secondary: "#65584d",
  accent: "#d8c6b5",
  highlight: "#f1e7dc",
  border: "#d4cfc7",
};

const stepSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(60)
    .default("Lead with one powerful, open-ended prompt"),
  detail: z
    .string()
    .min(5)
    .max(360)
    .default(
      "Position the survey around a single strategic question to encourage reflective, narrative responses."
    ),
});

export const Schema = z.object({
  section: z.string().min(2).max(60).default("Customer Excellence"),
  category: z.string().min(2).max(60).default("Customer Feedback Strategies"),
  subCategory: z.string().min(2).max(60).default("Survey Techniques"),
  audience: z
    .string()
    .min(2)
    .max(220)
    .default("Customer experience leaders & frontline service teams"),
  tipTitle: z.string().min(5).max(80).default("Ask One Powerful Question"),
  positioningStatement: z
    .string()
    .min(10)
    .max(420)
    .default(
      "Anchor your feedback surveys around a single, high-yield question to surface actionable insights quickly."
    ),
  keyQuestion: z
    .string()
    .min(5)
    .max(160)
    .default('“What could we improve to better support you?”'),
  modusOperandiHeading: z
    .string()
    .min(3)
    .max(80)
    .default("Modus Operandi"),
  modusOperandiSteps: z
    .array(stepSchema)
    .min(2)
    .max(5)
    .default([
      {
        title: "Frame the intent",
        detail:
          "Share why candid feedback matters, how the results will drive real improvements, and the commitment to act on the insights gathered.",
      },
      {
        title: "Ask the catalytic question",
        detail:
          "Lead with a focused, open-ended prompt like “What could we improve?” to spark reflective, specific responses.",
      },
      {
        title: "Probe for specifics",
        detail:
          "Follow up with focused prompts—ask where the journey felt strained, where service excelled, and what specific improvements customers expect next.",
      },
    ]),
  impactHeading: z
    .string()
    .min(3)
    .max(80)
    .default("Why It Works"),
  impactHighlights: z
    .array(
      z
        .string()
        .min(5)
        .max(260)
    )
    .min(2)
    .max(5)
    .default([
      "Shows genuine care by centering the customer’s voice, not the company’s assumptions.",
      "Uncovers rich qualitative feedback that pinpoints process gaps and innovation opportunities.",
      "Increases engagement by keeping surveys focused and respectful of customer time.",
    ]),
  closingNote: z
    .string()
    .min(5)
    .max(820)
    .default(
      "Integrate the findings into your customer excellence roadmap to close the loop and demonstrate responsiveness."
    ),
});

export type A4OnePagerData = z.infer<typeof Schema>;

interface A4OnePagerLayoutProps {
  data?: Partial<A4OnePagerData>;
}

const A4OnePagerLayout: React.FC<A4OnePagerLayoutProps> = ({ data }) => {
  const content = Schema.parse(data ?? {});
  const textContainerClasses = `space-y-3`;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="relative mx-auto flex w-full max-w-[860px] justify-center overflow-hidden rounded-lg border shadow-md"
        style={{
          fontFamily: "Inter, sans-serif",
          backgroundColor: palette.background,
          borderColor: palette.border,
          aspectRatio: "210 / 297",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[rgba(216,198,181,0.35)]" />
          <div className="absolute left-[-50px] bottom-[-70px] h-[180px] w-[180px] rounded-full bg-[rgba(216,198,181,0.25)]" />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col gap-4 p-6 md:p-7">
          <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className={textContainerClasses}>
              <p
                className="text-[10.5px] uppercase tracking-[0.4em]"
                style={{ color: palette.secondary }}
              >
                {content.section}
              </p>
              <h1
                className="text-[24px] font-semibold leading-snug md:text-[28px]"
                style={{ color: palette.primary }}
              >
                {content.tipTitle}
              </h1>
              <p
                className="text-[12px] leading-relaxed md:text-[12.5px]"
                style={{ color: palette.secondary }}
              >
                {content.positioningStatement}
              </p>
              <div
                className="rounded-lg border px-3.5 py-2.5 text-[11px] leading-relaxed shadow-sm md:max-w-[340px]"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <p className="font-semibold" style={{ color: palette.primary }}>
                  Audience Focus
                </p>
                <p style={{ color: palette.secondary }}>{content.audience}</p>
              </div>
            </div>
          </header>

          <div className="flex-1">
            <section
              className="grid h-full gap-3 rounded-lg border p-3 pr-4 shadow-sm md:grid-cols-[170px_auto]"
              style={{ backgroundColor: palette.surface, borderColor: palette.border }}
            >
              <div className="flex flex-col gap-3">
                <div>
                  <p
                  className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: palette.secondary }}
                  >
                    Category
                  </p>
                  <p className="text-[12.5px] font-semibold" style={{ color: palette.primary }}>
                    {content.category}
                  </p>
                </div>
                <div>
                  <p
                  className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: palette.secondary }}
                  >
                    Sub-Category
                  </p>
                  <p className="text-[12.5px] font-semibold" style={{ color: palette.primary }}>
                    {content.subCategory}
                  </p>
                </div>
                <div
                className="rounded-md border px-3.5 py-2.5 text-[12px] font-medium"
                  style={{
                    backgroundColor: palette.highlight,
                    borderColor: palette.border,
                    color: palette.primary,
                  }}
                >
                  Anchor Question
                  <span
                    className="mt-2 block text-[12px] font-normal italic"
                    style={{ color: palette.secondary }}
                  >
                    {content.keyQuestion}
                  </span>
                </div>
                </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h2
                    className="text-[15px] font-semibold"
                    style={{ color: palette.primary }}
                  >
                    {content.modusOperandiHeading}
                  </h2>
                  <div className="mt-3 grid gap-2">
                    {content.modusOperandiSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-md border px-3.5 py-2.5"
                        style={{
                          borderColor: palette.border,
                          backgroundColor: "#fbf9f5",
                        }}
                      >
                        <div
                          className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full text-[9.5px] font-semibold"
                          style={{
                            backgroundColor: palette.accent,
                            color: palette.primary,
                          }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p
                            className="text-[13px] font-semibold"
                            style={{ color: palette.primary }}
                          >
                            {step.title}
                          </p>
                          <p
                            className="mt-1 text-[11px] leading-relaxed"
                            style={{ color: palette.secondary }}
                          >
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h2
                    className="text-[15px] font-semibold"
                    style={{ color: palette.primary }}
                  >
                    {content.impactHeading}
                  </h2>
                  <ul className="mt-2 grid gap-2 text-[11.5px] md:grid-cols-2">
                    {content.impactHighlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 rounded-md px-3.5 py-2.5"
                        style={{
                          backgroundColor: "#fbf9f5",
                          border: `1px solid ${palette.border}`,
                          color: palette.secondary,
                        }}
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="rounded-md border px-3.5 py-2.5 text-[11px] leading-relaxed"
                    style={{
                      borderColor: palette.border,
                      backgroundColor: "#f7f1ea",
                      color: palette.secondary,
                    }}
                  >
                    {content.closingNote}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <footer
            className="mt-2 flex items-center justify-between rounded-md px-4 py-2 text-[10px]"
            style={{
              backgroundColor: palette.background,
              color: palette.secondary,
              border: `1px solid ${palette.border}`,
            }}
          >
            <span>Do not share without permission</span>
            <span>
              © 2025 AB4C Compliance &amp; Customer Relations. All rights
              reserved.
            </span>
            <img
              src="/ab4c-logo.png"
              alt="AB4C Logo"
              className="h-8 w-8 object-contain"
            />
          </footer>
        </div>
      </div>
    </>
  );
};

export default A4OnePagerLayout;
