import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
})

const parsed = EnvSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})

if (!parsed.success) {
  console.warn('Supabase environment variables are missing or invalid; features relying on Supabase will fail at runtime.')
}

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: parsed.success ? parsed.data.NEXT_PUBLIC_SUPABASE_URL || '' : '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: parsed.success ? parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' : '',
  NEXT_PUBLIC_SITE_URL: parsed.success ? parsed.data.NEXT_PUBLIC_SITE_URL : undefined,
}
