import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Watch Traditional Latin Mass Live Online | Sacred Tradition TV',
  description: 'Watch live Traditional Latin Masses streaming daily from FSSP, ICRSS, SSPX, and faithful Catholic parishes worldwide. Free Latin Mass live streams, Gregorian chant adoration, the Holy Rosary, and Catholic devotions.',
  keywords: ['Traditional Latin Mass', 'Latin Mass live stream', 'watch Latin Mass online', 'FSSP live mass', 'SSPX live mass', 'ICRSS live mass', 'Catholic Mass online', 'Gregorian chant', 'Traditional Catholic'],
  metadataBase: new URL('https://sacredtradition.tv'),
  openGraph: {
    title: 'Watch Traditional Latin Mass Live Online | Sacred Tradition TV',
    description: 'Live and recorded Traditional Latin Masses streamed daily from forty+ faithful Catholic parishes worldwide. Gregorian chant adoration, the Holy Rosary, and Catholic devotions for the faithful.',
    url: 'https://sacredtradition.tv',
    siteName: 'Sacred Tradition TV',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch Traditional Latin Mass Live Online | Sacred Tradition TV',
    description: 'A Digital Chapel for the Faithful — Live Traditional Latin Mass streams worldwide.',
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
  description: 'A digital chapel for the faithful, broadcasting live Traditional Latin Mass streams, Gregorian chant adoration, and Catholic devotions from faithful parishes worldwide.',
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
