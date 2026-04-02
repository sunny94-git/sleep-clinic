import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import AdminFloatingButton from "@/components/layout/AdminFloatingButton";

export const metadata: Metadata = {
  title: {
    default: "수면장애클리닉 | 원광대학교 광주한방병원",
    template: "%s | 원광대 광주한방병원 수면장애클리닉",
  },
  description:
    "원광대학교 광주한방병원 수면장애클리닉 — 불면증, 수면무호흡, 하지불안증후군 등 수면장애 전문 한방치료. 체계적인 진단과 맞춤 치료를 제공합니다.",
  keywords: ["수면장애", "불면증", "한방치료", "광주한방병원", "원광대", "수면클리닉", "한방수면치료"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "원광대학교 광주한방병원 수면장애클리닉",
    title: "수면장애클리닉 | 원광대학교 광주한방병원",
    description:
      "불면증, 수면무호흡, 하지불안증후군 등 수면장애 전문 한방치료",
  },
  twitter: {
    card: "summary_large_image",
    title: "수면장애클리닉 | 원광대학교 광주한방병원",
    description:
      "불면증, 수면무호흡, 하지불안증후군 등 수면장애 전문 한방치료",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "원광대학교 광주한방병원 수면장애클리닉",
              description:
                "불면증, 수면무호흡, 하지불안증후군 등 수면장애 전문 한방치료",
              address: {
                "@type": "PostalAddress",
                streetAddress: "회재로 1140-23",
                addressLocality: "광주광역시",
                addressRegion: "남구",
                postalCode: "61729",
                addressCountry: "KR",
              },
              telephone: "062-670-6700",
              openingHours: ["Mo-Fr 09:00-17:30", "Sa 09:00-12:30"],
              medicalSpecialty: "Sleep Medicine",
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          <main style={{ minHeight: "calc(100vh - 72px)" }}>{children}</main>
          <Footer />
          <AdminFloatingButton />
        </Providers>
      </body>
    </html>
  );
}
