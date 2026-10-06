import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sacredtradition.tv'
  const now = new Date()

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    { url: `${base}/masses`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/masses/sspx`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
  ]
}
