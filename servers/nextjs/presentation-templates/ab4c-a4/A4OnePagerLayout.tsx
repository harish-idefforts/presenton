import React from "react";
import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

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
    .max(320)
    .default(
      "Position the survey around a single strategic question to encourage reflective, narrative responses."
    ),
});

const heroImageSchema = ImageSchema.extend({
  __image_url__: z.preprocess(
    (value) => {
      if (value === undefined || value === null) return "";
      const str = String(value).trim();
      if (!str) return "";
      try {
        const parsed = new URL(str);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
          return parsed.toString();
        }
      } catch {
        // ignore
      }
      return "";
    },
    z.union([z.string().url(), z.literal("")])
  ),
  __image_prompt__: z.preprocess(
    (value) => {
      if (value === undefined || value === null) return "";
      return String(value).trim().slice(0, 200);
    },
    z.string().max(200)
  ),
});

export const Schema = z.object({
  section: z.string().min(2).max(60).default("Customer Excellence"),
  category: z.string().min(2).max(60).default("Customer Feedback Strategies"),
  subCategory: z.string().min(2).max(60).default("Survey Techniques"),
  audience: z
    .string()
    .min(2)
    .max(140)
    .default("Customer experience leaders & frontline service teams"),
  tipTitle: z.string().min(5).max(80).default("Ask One Powerful Question"),
  positioningStatement: z
    .string()
    .min(10)
    .max(500)
    .default(
      "Anchor your feedback surveys around a single, high-yield question to surface actionable insights quickly."
    ),
  keyQuestion: z
    .string()
    .min(5)
    .max(120)
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
          "Explain that you value honest reflections and will act on the suggestions gathered.",
      },
      {
        title: "Ask the catalytic question",
        detail:
          "Lead with an open-ended prompt like “What could we improve?” to invite detailed narratives.",
      },
      {
        title: "Probe for specifics",
        detail:
          "Follow up with clarifying prompts—“Which moments feel awkward?” “Where did we exceed expectations?”—to surface precise improvement paths.",
      },
    ]),
  heroImage: heroImageSchema.optional().default(
    heroImageSchema.parse({
      __image_url__: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      __image_prompt__: "Customer workshop",
    })
  )
    .meta({
      description: "Supporting image illustrating collaborative customer feedback work.",
    }),
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
    .max(600)
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
  const heroImageUrl = content.heroImage?.__image_url__;
  const hasHeroImage = Boolean(heroImageUrl && heroImageUrl.length > 0);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="relative mx-auto w-full max-w-[960px] aspect-[210/297] overflow-hidden rounded-lg border shadow-md"
        style={{
          fontFamily: "Inter, sans-serif",
          backgroundColor: palette.background,
          borderColor: palette.border,
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[rgba(216,198,181,0.35)]" />
          <div className="absolute left-[-50px] bottom-[-70px] h-[180px] w-[180px] rounded-full bg-[rgba(216,198,181,0.25)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col gap-6 p-8">
          <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[620px] space-y-4">
              <p
                className="text-[11px] uppercase tracking-[0.42em]"
                style={{ color: palette.secondary }}
              >
                {content.section}
              </p>
              <h1
                className="text-[32px] font-semibold leading-snug md:text-[36px]"
                style={{ color: palette.primary }}
              >
                {content.tipTitle}
              </h1>
              <p
                className="text-sm leading-relaxed md:text-[15px]"
                style={{ color: palette.secondary }}
              >
                {content.positioningStatement}
              </p>
              <div
                className="rounded-lg border px-5 py-4 text-[13px] leading-relaxed shadow-sm md:max-w-[380px]"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <p className="font-semibold" style={{ color: palette.primary }}>
                  Audience Focus
                </p>
                <p style={{ color: palette.secondary }}>{content.audience}</p>
              </div>
            </div>
            {hasHeroImage && (
              <div className="relative w-full max-w-[260px] overflow-hidden rounded-lg border shadow-sm">
                <img
                  src={heroImageUrl}
                  alt={content.heroImage.__image_prompt__ || "Customer excellence illustration"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/20" />
              </div>
            )}
          </header>

          <section
            className="grid flex-1 gap-5 rounded-lg border p-5 shadow-sm md:grid-cols-[180px_auto]"
            style={{ backgroundColor: palette.surface, borderColor: palette.border }}
          >
            <div className="flex flex-col gap-4">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: palette.secondary }}
                >
                  Category
                </p>
                <p className="text-[15px] font-semibold" style={{ color: palette.primary }}>
                  {content.category}
                </p>
              </div>
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: palette.secondary }}
                >
                  Sub-Category
                </p>
                <p className="text-[15px] font-semibold" style={{ color: palette.primary }}>
                  {content.subCategory}
                </p>
              </div>
              <div
                className="rounded-md border px-4 py-4 text-[15px] font-medium"
                style={{
                  backgroundColor: palette.highlight,
                  borderColor: palette.border,
                  color: palette.primary,
                }}
              >
                Anchor Question
                <span
                  className="mt-2 block text-sm font-normal italic"
                  style={{ color: palette.secondary }}
                >
                  {content.keyQuestion}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: palette.primary }}
                >
                  {content.modusOperandiHeading}
                </h2>
                <div className="mt-3 grid gap-3">
                  {content.modusOperandiSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-md border px-3 py-3"
                      style={{
                        borderColor: palette.border,
                        backgroundColor: "#fbf9f5",
                      }}
                    >
                      <div
                        className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-semibold"
                        style={{
                          backgroundColor: palette.accent,
                          color: palette.primary,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p
                          className="text-[15px] font-semibold"
                          style={{ color: palette.primary }}
                        >
                          {step.title}
                        </p>
                        <p
                          className="mt-1 text-[13px] leading-relaxed"
                          style={{ color: palette.secondary }}
                        >
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: palette.primary }}
                >
                  {content.impactHeading}
                </h2>
                <ul className="mt-3 grid gap-2 text-[14px]">
                  {content.impactHighlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 rounded-md px-3 py-2.5"
                      style={{
                        backgroundColor: "#fbf9f5",
                        border: `1px solid ${palette.border}`,
                        color: palette.secondary,
                      }}
                    >
                      <span
                        className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full"
                        style={{ backgroundColor: palette.primary }}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="rounded-md border px-4 py-4 text-[13px] leading-relaxed"
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

          <footer
            className="mt-2 flex items-center justify-between rounded-md px-4 py-2 text-[11px]"
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
              className="h-9 w-9 object-contain"
            />
          </footer>
        </div>
      </div>
    </>
  );
};

export default A4OnePagerLayout;
