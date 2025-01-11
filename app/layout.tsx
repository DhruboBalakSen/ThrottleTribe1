import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import Login from "@/components/landing/loginpage";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThrottleTribe",
  description: "Connect with riders and explore events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <Login />
          </SignedOut>
          <SignedIn>
            <div className="min-h-screen bg-gray-50">{children}</div>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
