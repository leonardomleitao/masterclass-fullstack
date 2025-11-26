import "./globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

const font = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "A task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
