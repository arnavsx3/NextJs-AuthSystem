import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/src/contexts/auth-context";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Auth App",
  description: "Auth App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
