import type { components } from "./schema";

export type FoundryDeployment =
  components["schemas"]["FoundryDeploymentResponse"];

export async function getModels(): Promise<FoundryDeployment[]> {
  const response = await fetch("/api/models");
  if (!response.ok) throw new Error(`GET /api/models failed: ${response.status}`);
  return response.json();
}
