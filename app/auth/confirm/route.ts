import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null


  if (!token_hash || !type) {
    return NextResponse.redirect(new URL('/erreur', request.url))
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  })

  if (error) {
    return NextResponse.redirect(new URL('/erreur', request.url))
  }
  
  const { data: roles } = await supabase.rpc("get_user_role");
  let redirectPath = '/'

  if (roles.includes("etudiant")){
    redirectPath = '/etudinat';
  }
  if (roles.includes("enseignant")){
    redirectPath = '/enseignant';
  }

  return NextResponse.redirect(new URL(redirectPath, request.url));

}