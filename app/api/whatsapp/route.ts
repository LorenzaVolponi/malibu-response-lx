import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json(
    { error: 'Contato indisponível.' },
    { status: 410 },
  )
}
