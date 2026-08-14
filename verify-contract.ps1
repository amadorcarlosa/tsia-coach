$ErrorActionPreference = "Stop"

$repoRoot = $PSScriptRoot

dotnet build (Join-Path $repoRoot "tsia-coach.Server")
if ($LASTEXITCODE -ne 0) {
    throw "Server build and OpenAPI generation failed."
}

Push-Location (Join-Path $repoRoot "frontend-vite")
try {
    npm run generate:api
    if ($LASTEXITCODE -ne 0) {
        throw "frontend-vite API generation failed."
    }
}
finally {
    Pop-Location
}

Push-Location (Join-Path $repoRoot "frontend")
try {
    npm run generate:api
    if ($LASTEXITCODE -ne 0) {
        throw "frontend API generation failed."
    }
}
finally {
    Pop-Location
}

git -C $repoRoot diff --exit-code -- openapi frontend-vite/src/api frontend/lib/api
if ($LASTEXITCODE -ne 0) {
    Write-Error "Generated API contract artifacts are stale. Run the two generate:api steps and commit the resulting spec and TypeScript files."
    exit 1
}

Write-Host "API contract artifacts are current."
