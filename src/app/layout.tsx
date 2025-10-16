import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import CartSidebar from "@/components/CartSidebar";

// Configuração das fontes otimizadas
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Perfumes Alemanha",
  description: "Loja de perfumes importados da Alemanha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito+Sans:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${nunitoSans.variable} antialiased font-sans`}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
