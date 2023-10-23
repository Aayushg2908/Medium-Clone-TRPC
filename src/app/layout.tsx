import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TRPCProvider from "@/components/providers/trpc-provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Medium Clone",
  description: "This is medium clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <TRPCProvider>
          <body className={inter.className}>
            <Toaster />
            {children}
          </body>
        </TRPCProvider>
      </html>
    </ClerkProvider>
  );
}
