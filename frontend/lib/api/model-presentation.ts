import type { FoundryDeployment } from "./models";

type Lifecycle = FoundryDeployment["lifecycle"];
type Feature = FoundryDeployment["features"][number];

export const LIFECYCLE_BADGE: Record<Lifecycle, { label: string; className: string }> = {
  GenerallyAvailable: { label: "GA", className: "bg-primary-500/14 text-primary-700" },
  Preview: { label: "Preview", className: "bg-amber-500/16 text-amber-700" },
  Legacy: { label: "Legacy", className: "bg-slate-500/16 text-slate-600" },
  Deprecated: { label: "Deprecated", className: "bg-coral-500/16 text-coral-600" },
};

export const FEATURE_LABEL: Record<Feature, string> = {
  ToolCalling: "tool calling",
  StructuredOutput: "structured output",
  Reasoning: "reasoning",
  FileInput: "file input",
  ComputerUse: "computer use",
  JsonOutput: "json output",
};
