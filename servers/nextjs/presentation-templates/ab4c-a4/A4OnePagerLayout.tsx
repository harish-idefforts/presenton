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
    .max(220)
    .default(
      "Position the survey around a single strategic question to encourage reflective, narrative responses."
    )
    .meta({
      description: "Brief explanation of the step. MAX 220 characters - keep to ~2 sentences.",
    }),
});

export const Schema = z.object({
  section: z.string().min(2).max(60).default("Customer Excellence"),
  category: z.string().min(2).max(60).default("Customer Feedback Strategies"),
  subCategory: z.string().min(2).max(60).default("Survey Techniques"),
  audience: z
    .string()
    .min(2)
    .max(220)
    .default("Customer experience leaders & frontline service teams")
    .meta({
      description: "Target audience for this tip. MAX 220 characters - be specific but concise.",
    }),
  tipTitle: z.string().min(5).max(80).default("Ask One Powerful Question"),
  positioningStatement: z
    .string()
    .min(10)
    .max(320)
    .default(
      "Use one powerful question to gather focused, actionable customer feedback."
    )
    .meta({
      description: "Brief positioning statement explaining the tip's value. MAX 320 characters - keep it to 2 sentences.",
    }),
  keyQuestion: z
    .string()
    .min(5)
    .max(165)
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
          "Explain why feedback matters and how results will drive improvements.",
      },
      {
        title: "Ask the catalytic question",
        detail:
          "Lead with an open-ended prompt to spark reflective responses.",
      },
      {
        title: "Probe for specifics",
        detail:
          "Follow up to understand where service excelled and what needs improvement.",
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
        .max(180)
        .meta({
          description: "Single impact point. MAX 180 characters - keep to 1 concise sentence.",
        })
    )
    .min(2)
    .max(5)
    .default([
      "Centers the customer's voice rather than company assumptions.",
      "Uncovers qualitative feedback highlighting process gaps.",
      "Respects customer time with focused surveys.",
    ])
    .meta({
      description: "2-5 key benefits or impacts. Each point MAX 180 characters.",
    }),
  closingNote: z
    .string()
    .min(5)
    .max(320)
    .default(
      "Use these insights to refine your customer excellence strategy."
    )
    .meta({
      description: "Brief closing note or call to action. Keep it concise - MAX 320 characters. Should be 1-2 sentences.",
    }),
});

export type A4OnePagerData = z.infer<typeof Schema>;

interface A4OnePagerLayoutProps {
  data?: Partial<A4OnePagerData>;
}

const truncateValue = (value: unknown, max: number) => {
  if (typeof value !== "string") {
    return value;
  }

  if (value.length <= max) {
    return value;
  }

  const sliceLength = Math.max(max - 3, 0);
  return `${value.slice(0, sliceLength)}...`;
};

const sanitizeData = (raw: Partial<A4OnePagerData>): Partial<A4OnePagerData> => {
  const sanitized: Partial<A4OnePagerData> = { ...raw };

  const applyTruncation = <K extends keyof A4OnePagerData>(key: K, max: number) => {
    const value = raw[key];
    if (typeof value === "string") {
      sanitized[key] = truncateValue(value, max) as A4OnePagerData[K];
    }
  };

  applyTruncation("section", 60);
  applyTruncation("category", 60);
  applyTruncation("subCategory", 60);
  applyTruncation("audience", 220);
  applyTruncation("tipTitle", 80);
  applyTruncation("positioningStatement", 320);
  applyTruncation("keyQuestion", 165);
  applyTruncation("modusOperandiHeading", 80);
  applyTruncation("impactHeading", 80);
  applyTruncation("closingNote", 320);

  if (raw.modusOperandiSteps) {
    sanitized.modusOperandiSteps = raw.modusOperandiSteps.map((step) => ({
      ...step,
      title:
        typeof step.title === "string"
          ? (truncateValue(
              step.title,
              60
            ) as A4OnePagerData["modusOperandiSteps"][number]["title"])
          : step.title,
      detail:
        typeof step.detail === "string"
          ? (truncateValue(
              step.detail,
              220
            ) as A4OnePagerData["modusOperandiSteps"][number]["detail"])
          : step.detail,
    }));
  }

  if (raw.impactHighlights) {
    sanitized.impactHighlights = raw.impactHighlights.map(
      (highlight) =>
        typeof highlight === "string"
          ? (truncateValue(
              highlight,
              180
            ) as A4OnePagerData["impactHighlights"][number])
          : highlight
    );
  }

  return sanitized;
};

const A4OnePagerLayout: React.FC<A4OnePagerLayoutProps> = ({ data }) => {
  const content = Schema.parse(sanitizeData(data ?? {}));

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        data-slide-root
        className="relative mx-auto flex w-full max-w-[820px] justify-center overflow-hidden rounded-lg border shadow-md"
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

        <div className="relative z-10 flex h-full w-full flex-col gap-2.5 p-5 md:p-6">
          <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <p
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: palette.secondary }}
              >
                {content.section}
              </p>
              <h1
                className="text-[22px] font-semibold leading-tight md:text-[24px] md:max-w-[540px]"
                style={{ color: palette.primary }}
              >
                {content.tipTitle}
              </h1>
              <p
                className="text-[11px] leading-relaxed md:text-[11.5px] md:max-w-[560px]"
                style={{ color: palette.secondary }}
              >
                {content.positioningStatement}
              </p>
              <div
                className="rounded-md border px-3 py-2 text-[10.5px] leading-relaxed shadow-sm md:max-w-[400px]"
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
              className="grid h-full gap-2.5 rounded-md border p-3 shadow-sm sm:grid-cols-[190px_auto]"
              style={{ backgroundColor: palette.surface, borderColor: palette.border }}
            >
              <div className="flex flex-col gap-2.5 sm:pr-2">
                <div>
                  <p
                  className="text-[9px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: palette.secondary }}
                  >
                    Category
                  </p>
                  <p className="text-[11.5px] font-semibold" style={{ color: palette.primary }}>
                    {content.category}
                  </p>
                </div>
                <div>
                  <p
                  className="text-[9px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: palette.secondary }}
                  >
                    Sub-Category
                  </p>
                  <p className="text-[11.5px] font-semibold" style={{ color: palette.primary }}>
                    {content.subCategory}
                  </p>
                </div>
                <div
                className="rounded-md border px-3 py-2.5 text-[10.5px] font-medium"
                  style={{
                    backgroundColor: palette.highlight,
                    borderColor: palette.border,
                    color: palette.primary,
                  }}
                >
                  Anchor Question
                  <span
                    className="mt-1 block text-[10.5px] font-normal italic"
                    style={{ color: palette.secondary }}
                  >
                    {content.keyQuestion}
                  </span>
                </div>
                </div>

              <div className="flex flex-col gap-2.5 sm:pr-1">
                <div className="sm:pr-2">
                  <h2
                    className="text-[14px] font-semibold md:text-[15px]"
                    style={{ color: palette.primary }}
                  >
                    {content.modusOperandiHeading}
                  </h2>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {content.modusOperandiSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-2.5 rounded-md border px-3 py-2"
                        style={{
                          borderColor: palette.border,
                          backgroundColor: "#fbf9f5",
                        }}
                      >
                        <div
                          className="flex h-[20px] w-[20px] flex-none items-center justify-center rounded-full text-[9px] font-semibold"
                          style={{
                            backgroundColor: palette.accent,
                            color: palette.primary,
                          }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p
                            className="text-[12px] font-semibold"
                            style={{ color: palette.primary }}
                          >
                            {step.title}
                          </p>
                          <p
                            className="mt-0.5 text-[10.25px] leading-snug"
                            style={{ color: palette.secondary }}
                          >
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2
                    className="text-[14px] font-semibold"
                    style={{ color: palette.primary }}
                  >
                    {content.impactHeading}
                  </h2>
                  <ul className="grid gap-1.5 text-[10.5px] sm:grid-cols-2">
                    {content.impactHighlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 rounded-md px-3 py-2"
                        style={{
                          backgroundColor: "#fbf9f5",
                          border: `1px solid ${palette.border}`,
                          color: palette.secondary,
                        }}
                      >
                        <span
                          className="mt-[5px] h-1.5 w-1.5 flex-none rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <span className="text-[10.25px] leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="rounded-md border px-3 py-2 text-[10.5px] leading-relaxed"
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
            className="mt-1.5 flex items-center justify-between rounded-md px-3 py-1.5 text-[9px]"
            style={{
              backgroundColor: palette.background,
              color: palette.secondary,
              border: `1px solid ${palette.border}`,
            }}
          >
            <span>Do not share without permission</span>
            <span className="text-center">
              © 2025 AB4C Compliance &amp; Customer Relations
            </span>
            <img
              src="/ab4c-logo.png"
              alt="AB4C Logo"
              className="h-6 w-6 object-contain"
            />
          </footer>
        </div>
      </div>
    </>
  );
};

export default A4OnePagerLayout;
