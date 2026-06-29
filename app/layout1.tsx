import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sacred Tradition Television — A Digital Chapel for the Faithful',
  description: 'Sacred Tradition TV brings the beauty and reverence of the Traditional Latin Mass and timeless Catholic devotions directly into your home.',
  metadataBase: new URL('https://sacredtradition.tv'),
  openGraph: {
    title: 'Sacred Tradition Television — A Digital Chapel for the Faithful',
    description: 'Live and recorded Traditional Latin Masses, Gregorian chant adoration, and Catholic devotions from faithful parishes worldwide.',
    url: 'https://sacredtradition.tv',
    siteName: 'Sacred Tradition TV',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sacred Tradition Television',
    description: 'A Digital Chapel for the Faithful — Traditional Latin Mass streaming.',
    images: ['/logo.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sacred Tradition TV',
  alternateName: 'Sacred Tradition Television',
  url: 'https://sacredtradition.tv',
  logo: 'https://sacredtradition.tv/logo.png',
  description: 'A digital chapel for the faithful, broadcasting the Traditional Latin Mass and Catholic devotions to homes worldwide.',
  email: 'info@sacredtradition.tv',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
