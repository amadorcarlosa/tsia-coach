import type { FoundryDeployment } from "../../../lib/api/models";

export async function GET() {
    const apiUrl = process.env.API_URL
    if (!apiUrl) {return Response.json({ error: "API_URL environment variable is not set" }, { status: 500 }); }

    try {
        const response = await fetch(`${apiUrl}/api/models`, { next: { revalidate: 700 } });

        if (!response.ok) {
            return Response.json(
                {
                    error: "ASP.NET models request failed",
                    apiStatus: response.status,
                },
                { status: response.status },
            );
        }
        const models: FoundryDeployment[] = await response.json();
        return Response.json(models);
    }
    catch (error) {
        return Response.json(
            {
                error: "Next.js could not reach the ASP.NET API",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 502 }
        );
    }
}
