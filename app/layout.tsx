import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'VisuaLive - Music Visualization',
    description: 'Web-based music visualization platform with AI-powered preset generation',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
          <html lang="en">
                <body className="dark bg-bg-primary">
                  {children}
                </body>body>
          </html>html>
            )
}        
