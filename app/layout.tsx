import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sacred Tradition Television — A Digital Chapel for the Faithful',
  description: 'Sacred Tradition TV brings the beauty and reverence of the Traditional Latin Mass and timeless Catholic devotions directly into your home.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
