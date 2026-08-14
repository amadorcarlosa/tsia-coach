export async function GET() {
    const apiUrl = process.env.API_URL
    if(!apiUrl) {
        return new Response("API_URL environment variable is not set", { status: 500 });
    }

    try {
    const response = await fetch(`${apiUrl}/health`,
        {
            cache: "no-store",
        });
    const data = await response.text();
    return Response.json( {
        status: data,
        apiStatus: response.status,
    });
    } catch (error) {
        return Response.json(
      {
        error: "Next.js could not reach the ASP.NET API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
    }
}