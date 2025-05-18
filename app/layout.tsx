import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";

import { LoadingProvider } from "./_context/LoadingContext";
import ViewCanvas from "./_components/3DComponents/ViewCanvas";
import ReactLenis from "lenis/react";
import { VersionProvider } from "./_context/VersionContext";

// ✅ Global SEO metadata
export const metadata: Metadata = {
  title: "Xbox Series X | Redesign Microsoft Xbox",
  description:
    "Experience the power of the Xbox Series X. Learn about its next-gen specs, blazing performance, and premium accessories.",
  openGraph: {
    title: "Xbox Series X | Redesign Microsoft Xbox",
    description:
      "Experience the power of the Xbox Series X. Learn about its next-gen specs, blazing performance, and premium accessories.",
    url: "https://your-domain.com",
    siteName: "Xbox Series X",
    images: [
      {
        url: "/assets/images/xbox_logo.svg",
        width: 1200,
        height: 630,
        alt: "Xbox Series X Hero Shot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xbox Series X | Redesign Microsoft Xbox",
    description:
      "Experience the power of the Xbox Series X. Learn about its next-gen specs, blazing performance, and premium accessories.",
    images: ["/assets/images/xbox_logo.svg"],
    creator: "@adelYasser",
  },
  metadataBase: new URL("https://your-domain.com"), // 🔁 Replace with your actual base URL
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased w-screen min-h-dvh overflow-x-hidden">
        <ReactLenis root>
          <LoadingProvider>
            <VersionProvider>
              <Header />
              {children}
              <ViewCanvas />
            </VersionProvider>
          </LoadingProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
