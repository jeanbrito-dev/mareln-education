import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Maré LN Educa+",
  description: "Descubra as melhores atrações, passeios e viva experiências inesquecíveis pelo litoral.",
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

