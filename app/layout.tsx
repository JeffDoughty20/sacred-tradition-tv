import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sacred Tradition TV — A Digital Chapel for the Faithful',
  description: 'Bringing the beauty and reverence of the Traditional Latin Mass and Catholic devotions into your home. Daily programming rooted in Sacred Tradition.',
  keywords: ['Traditional Latin Mass', 'Catholic', 'Sacred Tradition', 'TLM', 'streaming', 'devotions', 'Gregorian chant'],
  openGraph: {
    title: 'Sacred Tradition TV',
    description: 'A Digital Chapel for the Faithful',
    url: 'https://sacredtradition.tv',
    siteName: 'Sacred Tradition TV',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
