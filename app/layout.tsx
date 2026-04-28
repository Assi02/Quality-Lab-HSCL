import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HSCL QC Dashboard',
  description: 'Himadri Speciality Chemicals — Quality Control',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
