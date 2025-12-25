import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  const routes = [
    '',
    'about',
    'contact',
    'faq',
    'how-it-works',
    'temples',
    'my-trips',
    'plan-trip',
    'profile',
    'support',
  ]

  const now = new Date()

  return routes.map((path) => ({
    url: `${baseUrl}/${path}`.replace(/\/$/, ''),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))
}
