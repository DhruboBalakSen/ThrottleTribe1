import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThrottleTribe",
  description: "Connect with riders and explore events",
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-gray-50">
        <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </head>
        <body className={inter.className}>
          <div className=" max-h-full bg-gray-50 select-none">
            {modal}{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
