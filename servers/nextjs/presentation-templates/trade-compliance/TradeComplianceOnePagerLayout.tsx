import React from "react";
import * as z from "zod";

export const layoutId = "trade-compliance-one-pager";
export const layoutName = "Trade Compliance One-Pager";
export const layoutDescription =
  "Professional one-pager for trade compliance best practices with three-step implementation and benefits grid.";

// Using the same color palette as ab4c-a4
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
    .default("Step 1: Develop Framework"),
  description: z
    .string()
    .min(5)
    .max(350)
    .default(
      "Create comprehensive end-use questionnaires covering military applications, nuclear use, and re-export intentions. Include clear yes/no questions with follow-up requirements for concerning responses."
    )
    .meta({
      description: "Step description. MAX 350 characters - keep to ~3-4 sentences.",
    }),
});

const benefitSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(50)
    .default("Risk Mitigation"),
  description: z
    .string()
    .min(5)
    .max(250)
    .default(
      "Proactively identifies prohibited end-uses before transactions occur, preventing regulatory violations and protecting your company from penalties up to millions in fines."
    )
    .meta({
      description: "Benefit description. MAX 250 characters - keep concise.",
    }),
});

export const Schema = z.object({
  mainTitle: z
    .string()
    .min(5)
    .max(100)
    .default("Master Trade Compliance: Ask the Right Questions"),
  subtitle: z
    .string()
    .min(10)
    .max(350)
    .default(
      "Ensure export control compliance with a systematic end-use questionnaire approach. This proven method helps identify prohibited activities early, protecting your business from violations while streamlining customer onboarding for legitimate trade partners."
    )
    .meta({
      description: "Subtitle explaining the strategy. MAX 350 characters - 2-3 sentences.",
    }),
  audienceFocus: z
    .string()
    .min(10)
    .max(300)
    .default(
      "Trade compliance professionals and export control officers managing customer screening processes who need to balance thorough due diligence with operational efficiency. Essential for companies dealing with dual-use goods, technology exports, or international trade."
    )
    .meta({
      description: "Target audience description. MAX 300 characters.",
    }),
  categoryFocus: z
    .string()
    .min(10)
    .max(300)
    .default(
      "Export Control Management — End-use verification strategies designed to help you identify red flags, ensure regulatory compliance, and protect your business from inadvertent support of prohibited activities."
    )
    .meta({
      description: "Category focus description. MAX 300 characters.",
    }),
  implementationTitle: z
    .string()
    .min(5)
    .max(80)
    .default("Implement Your End-Use Questionnaire"),
  step1: stepSchema.default({
    title: "Step 1: Develop Questionnaire",
    description:
      "Create a comprehensive form covering military use, nuclear applications, chemical/biological concerns, and re-export intentions. Include verification requirements—request end-user certificates and conduct database checks for high-risk responses.",
  }),
  step2: stepSchema.default({
    title: "Step 2: Screen Each Customer",
    description:
      "For every new customer, ask three critical questions: Will products be used for military or defense purposes? Are there any connections to nuclear, chemical, or biological activities? Will items be re-exported to embargoed destinations or sanctioned parties?",
  }),
  step3: stepSchema.default({
    title: "Step 3: Verify & Document",
    description:
      "If red flags emerge, conduct enhanced due diligence including third-party verification and additional documentation. Maintain complete records of all screening activities—these audit trails demonstrate compliance during regulatory reviews.",
  }),
  benefitsTitle: z
    .string()
    .min(5)
    .max(80)
    .default("Tangible Benefits: Protect Your Business"),
  benefitsSubtitle: z
    .string()
    .min(10)
    .max(250)
    .default(
      "By implementing comprehensive end-use questionnaires, you'll achieve measurable improvements in compliance and risk management. This isn't just about avoiding penalties—it's about building sustainable international trade relationships."
    )
    .meta({
      description: "Benefits section subtitle. MAX 250 characters.",
    }),
  benefit1: benefitSchema.default({
    title: "Reduced Violation Risk",
    description:
      "Dramatically reduces exposure to export control violations, protecting your company from penalties ranging from warnings to criminal prosecution. Many companies report 70% fewer compliance incidents after implementation.",
  }),
  benefit2: benefitSchema.default({
    title: "Regulatory Confidence",
    description:
      "Demonstrates robust due diligence to authorities during audits and investigations. Your documented screening process becomes evidence of good faith efforts to comply with complex export regulations.",
  }),
  benefit3: benefitSchema.default({
    title: "Operational Efficiency",
    description:
      "Standardizes customer screening across your organization, reducing review time by up to 40%. Clear protocols eliminate guesswork and ensure consistent application of export controls regardless of sales team or region.",
  }),
  benefit4: benefitSchema.default({
    title: "Business Protection",
    description:
      "Preserves export privileges and market access by preventing inadvertent support of prohibited activities. The cost of implementing questionnaires is minimal compared to losing export licenses or facing reputational damage.",
  }),
  keyQuestion: z
    .string()
    .min(10)
    .max(200)
    .default(
      "How can systematic end-use questionnaires transform your compliance program from reactive to proactive?"),
  keyQuestionAnswer: z
    .string()
    .min(10)
    .max(400)
    .default(
      "The answer lies in early detection and documentation. This systematic approach creates a defensible compliance position that satisfies regulators while enabling legitimate trade. Start with high-risk customers, refine your questions based on experience, and gradually expand to all new accounts for comprehensive protection."
    )
    .meta({
      description: "Answer to the key question. MAX 400 characters.",
    }),
  callToAction: z
    .string()
    .min(10)
    .max(350)
    .default(
      "Transform your export compliance from a cost center into a competitive advantage. Begin implementing end-use questionnaires this week—start with your next new customer inquiry. Document everything, train your team, and build a compliance culture that protects your business while facilitating legitimate international trade."
    )
    .meta({
      description: "Final call to action. MAX 350 characters.",
    }),
});

export type TradeComplianceOnePagerData = z.infer<typeof Schema>;

interface TradeComplianceOnePagerLayoutProps {
  data?: Partial<TradeComplianceOnePagerData>;
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

const sanitizeData = (raw: Partial<TradeComplianceOnePagerData>): Partial<TradeComplianceOnePagerData> => {
  const sanitized: Partial<TradeComplianceOnePagerData> = { ...raw };

  const applyTruncation = <K extends keyof TradeComplianceOnePagerData>(key: K, max: number) => {
    const value = raw[key];
    if (typeof value === "string") {
      sanitized[key] = truncateValue(value, max) as TradeComplianceOnePagerData[K];
    }
  };

  // Apply truncation to string fields
  applyTruncation("mainTitle", 100);
  applyTruncation("subtitle", 350);
  applyTruncation("audienceFocus", 300);
  applyTruncation("categoryFocus", 300);
  applyTruncation("implementationTitle", 80);
  applyTruncation("benefitsTitle", 80);
  applyTruncation("benefitsSubtitle", 250);
  applyTruncation("keyQuestion", 200);
  applyTruncation("keyQuestionAnswer", 400);
  applyTruncation("callToAction", 350);

  // Truncate step objects
  const truncateStep = (step: any) => {
    if (step && typeof step === 'object') {
      return {
        ...step,
        title: typeof step.title === "string" ? truncateValue(step.title, 60) : step.title,
        description: typeof step.description === "string" ? truncateValue(step.description, 350) : step.description,
      };
    }
    return step;
  };

  if (raw.step1) sanitized.step1 = truncateStep(raw.step1);
  if (raw.step2) sanitized.step2 = truncateStep(raw.step2);
  if (raw.step3) sanitized.step3 = truncateStep(raw.step3);

  // Truncate benefit objects
  const truncateBenefit = (benefit: any) => {
    if (benefit && typeof benefit === 'object') {
      return {
        ...benefit,
        title: typeof benefit.title === "string" ? truncateValue(benefit.title, 50) : benefit.title,
        description: typeof benefit.description === "string" ? truncateValue(benefit.description, 250) : benefit.description,
      };
    }
    return benefit;
  };

  if (raw.benefit1) sanitized.benefit1 = truncateBenefit(raw.benefit1);
  if (raw.benefit2) sanitized.benefit2 = truncateBenefit(raw.benefit2);
  if (raw.benefit3) sanitized.benefit3 = truncateBenefit(raw.benefit3);
  if (raw.benefit4) sanitized.benefit4 = truncateBenefit(raw.benefit4);

  return sanitized;
};

const TradeComplianceOnePagerLayout: React.FC<TradeComplianceOnePagerLayoutProps> = ({ data }) => {
  const content = Schema.parse(sanitizeData(data ?? {}));

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        data-slide-root
        className="relative mx-auto flex w-full max-w-[820px] justify-center overflow-hidden"
        style={{
          fontFamily: "Inter, sans-serif",
          backgroundColor: palette.background,
          aspectRatio: "210 / 297",
        }}
      >
        <div className="relative z-10 flex h-full w-full flex-col gap-3 p-6">
          {/* Main Title */}
          <header className="text-center">
            <h1
              className="text-[24px] font-bold leading-tight md:text-[28px]"
              style={{ color: palette.primary }}
            >
              {content.mainTitle}
            </h1>
            <p
              className="mx-auto mt-2 max-w-[700px] text-[11px] leading-relaxed"
              style={{ color: palette.secondary }}
            >
              {content.subtitle}
            </p>
          </header>

          {/* Audience and Category Focus Grid */}
          <div className="grid gap-3 md:grid-cols-2">
            <div
              className="rounded-lg border p-3"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              <h3
                className="text-[12px] font-semibold"
                style={{ color: palette.primary }}
              >
                Audience Focus
              </h3>
              <p
                className="mt-1 text-[10px] leading-relaxed"
                style={{ color: palette.secondary }}
              >
                {content.audienceFocus}
              </p>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              <h3
                className="text-[12px] font-semibold"
                style={{ color: palette.primary }}
              >
                Category Focus
              </h3>
              <p
                className="mt-1 text-[10px] leading-relaxed"
                style={{ color: palette.secondary }}
              >
                {content.categoryFocus}
              </p>
            </div>
          </div>

          {/* Implementation Steps Section */}
          <section>
            <h2
              className="mb-3 text-[16px] font-semibold"
              style={{ color: palette.primary }}
            >
              {content.implementationTitle}
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {[content.step1, content.step2, content.step3].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg border p-4"
                  style={{
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[14px] font-bold"
                      style={{
                        backgroundColor: palette.accent,
                        color: palette.primary,
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-[12px] font-semibold"
                        style={{ color: palette.primary }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="mt-2 text-[10px] leading-relaxed"
                    style={{ color: palette.secondary }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tangible Benefits Section */}
          <section>
            <h2
              className="text-[16px] font-semibold"
              style={{ color: palette.primary }}
            >
              {content.benefitsTitle}
            </h2>
            <p
              className="mt-1 mb-3 text-[10px] leading-relaxed"
              style={{ color: palette.secondary }}
            >
              {content.benefitsSubtitle}
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {[content.benefit1, content.benefit2, content.benefit3, content.benefit4].map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-md border p-3"
                  style={{
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                  }}
                >
                  <h4
                    className="text-[11px] font-semibold"
                    style={{ color: palette.primary }}
                  >
                    {benefit.title}
                  </h4>
                  <p
                    className="mt-1 text-[9.5px] leading-relaxed"
                    style={{ color: palette.secondary }}
                  >
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Question Section */}
          <section
            className="rounded-lg border p-4"
            style={{
              backgroundColor: palette.highlight,
              borderColor: palette.border,
            }}
          >
            <div className="flex items-start gap-2">
              <div
                className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[12px]"
                style={{
                  backgroundColor: palette.accent,
                  color: palette.primary,
                }}
              >
                ?
              </div>
              <div className="flex-1">
                <h3
                  className="text-[12px] font-semibold"
                  style={{ color: palette.primary }}
                >
                  Key Question to Consider
                </h3>
                <p
                  className="mt-1 text-[11px] font-medium italic"
                  style={{ color: palette.primary }}
                >
                  {content.keyQuestion}
                </p>
                <p
                  className="mt-2 text-[10px] leading-relaxed"
                  style={{ color: palette.secondary }}
                >
                  {content.keyQuestionAnswer}
                </p>
              </div>
            </div>
          </section>

          {/* Start Today Section */}
          <section>
            <h2
              className="mb-2 text-[14px] font-semibold"
              style={{ color: palette.primary }}
            >
              Start Protecting Your Business Today
            </h2>
            <p
              className="text-[10px] leading-relaxed"
              style={{ color: palette.secondary }}
            >
              {content.callToAction}
            </p>
          </section>

          {/* Footer - same as ab4c-a4 */}
          <footer
            className="mt-auto flex items-center justify-between rounded-md px-3 py-2 text-[9px]"
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

export default TradeComplianceOnePagerLayout;