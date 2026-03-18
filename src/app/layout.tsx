import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/providers/app-providers'

export const metadata: Metadata = {
  title: 'AturDana',
  description: 'Personal finance tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
