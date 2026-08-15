import type { FoundryDeployment } from "../../lib/api/models";
import AdminConsole from "./AdminConsole";

async function loadModels(): Promise<FoundryDeployment[]> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) return [];

  try {
    const response = await fetch(`${apiUrl}/api/models`, { next: { revalidate: 700 } });
    if (!response.ok) return [];
    return (await response.json()) as FoundryDeployment[];
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  return <AdminConsole models={await loadModels()} />;
}
