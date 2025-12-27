import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer";
import { PageNavigator } from "@/components/page-navigator";
import { ToastProvider } from "@/components/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HousingPlan – Smart Affordable Housing Tool",
  description:
    "Plan, simulate, and optimize affordable housing projects with real-time cost, demand, and impact analysis.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <AuthProvider>
              {/* Main Content Area */}
            <main className="flex-1 flex flex-col w-full">
              <div className="flex-1">{children}</div>

              {/* Persistent Bottom Navigator – Clean & Elevated */}
              <div className="sticky bottom-0 z-40 w-full border-t border-border/60 bg-background/80 backdrop-blur-md shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                  <PageNavigator />
                </div>
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </AuthProvider>
        </ToastProvider>

        <Analytics />
      </body>
    </html>
  );
}