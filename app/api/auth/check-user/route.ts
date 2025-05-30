import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Check if user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ exists: true })
  } catch (error) {
    console.error('Error checking user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
