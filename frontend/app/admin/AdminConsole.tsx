"use client";

import { useState } from "react";
import type { FoundryDeployment } from "../../lib/api/models";
import ConfigTab from "./ConfigTab";
import ConsoleHeader from "./ConsoleHeader";
import PlaygroundTab from "./PlaygroundTab";
import RunsTab from "./RunsTab";

type Tab = "playground" | "runs" | "config";

export default function AdminConsole({ models }: { models: FoundryDeployment[] }) {
  const [tab, setTab] = useState<Tab>("playground");
  const [hideDeprecated, setHideDeprecated] = useState(false);

  return (
    <main className="min-h-screen bg-bg pb-20 text-ink">
      <ConsoleHeader tab={tab} onTab={setTab} />
      {tab === "playground" && <PlaygroundTab models={models} hideDeprecated={hideDeprecated} />}
      {tab === "runs" && <RunsTab />}
      {tab === "config" && <ConfigTab models={models} hideDeprecated={hideDeprecated} onHideDeprecated={setHideDeprecated} />}
    </main>
  );
}
