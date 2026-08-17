"use client";

import { useMemo, useState } from "react";
import type { FoundryDeployment } from "../../lib/api/models";
import DeploymentPicker from "./DeploymentPicker";
import ParametersCard from "./ParametersCard";
import SessionPanel from "./SessionPanel";
import SystemPromptCard from "./SystemPromptCard";

export default function PlaygroundTab({ models, hideDeprecated }: { models: FoundryDeployment[]; hideDeprecated: boolean }) {
  const visible = useMemo(() => models.filter((model) => !(hideDeprecated && model.lifecycle === "Deprecated")), [models, hideDeprecated]);
  const [selectedId, setSelectedId] = useState(models[0]?.id);
  const selected = visible.find((model) => model.id === selectedId) ?? visible[0];
  return <div className="mx-auto flex max-w-console flex-wrap items-start gap-5 p-6"><aside className="mt-playground-aside grid min-w-0 max-w-85 gap-4"><section className="mt-panel p-[18px]"><h2 className="mt-eyebrow">Deployment</h2><DeploymentPicker models={models} hideDeprecated={hideDeprecated} selected={selected} onSelect={(model) => setSelectedId(model.id)} /></section><SystemPromptCard /><ParametersCard /></aside><div className="mt-playground-main min-w-0"><SessionPanel selected={selected} /></div></div>;
}
