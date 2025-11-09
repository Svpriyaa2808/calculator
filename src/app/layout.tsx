import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scientific Calculator",
  description: "A beautiful scientific calculator built with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
