import { NextResponse } from 'next/server'

// Redeploy marker: 2026-09-03. No runtime behavior change.
export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json(
    {
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      environment: process.env.VERCEL_ENV ?? null,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
