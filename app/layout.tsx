import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    <html lang="pt-BR">
      <body className="bg-[#F5F9FC] text-[#26364A] flex flex-col min-h-screen antialiased">
        {/* Cabeçalho fixo em todas as páginas */}
        <Header />

        {/* Conteúdo principal dinâmico */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Rodapé fixo */}
        <Footer />
      </body>
    </html>
  );
}

