import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./components/AppShell";
import { AuthProvider } from "./components/AuthProvider";

export const metadata: Metadata = {
  title: "MaréLN | Eventos do Litoral Norte",
  description: "Descubra shows, festivais, feiras e eventos gratuitos do Litoral Norte de São Paulo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#F5F9FC] text-[#26364A] antialiased">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}

