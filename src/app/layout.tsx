import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { UTMProvider } from "@/contexts/UTMContext";
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
  icons: {
    icon: "/favico.png",
    shortcut: "/favico.png",
    apple: "/favico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const utmifyPixelId = process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID;

  return (
    <html lang="pt-BR" className={`${inter.variable} ${nunitoSans.variable}`}>
      <head>
        {/* Meta Pixel Code */}
        {metaPixelId && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${metaPixelId}');
                  fbq('track', 'QPageView');
                `,
              }}
            />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height={1}
                width={1}
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=QPageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        
        {/* Utmify Pixel Script */}
        {utmifyPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.pixelId = "${utmifyPixelId}";
                var a = document.createElement("script");
                a.setAttribute("async", "");
                a.setAttribute("defer", "");
                a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
                document.head.appendChild(a);
              `,
            }}
          />
        )}
        
      </head>
      <body className="antialiased font-sans">
        <UTMProvider
          enableGA4={false}
          enableMetaPixel={true}
          enableUtmify={true}
          enableConsoleLog={true}
        >
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </UTMProvider>
      </body>
    </html>
  );
}
