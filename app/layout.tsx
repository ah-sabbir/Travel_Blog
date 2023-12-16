import type { Metadata } from "next";
import { Arima, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/auth-provider";
import StyledProgressBar from "@/components/progress-bar";
import { websiteDescription, websiteName } from "@/constant";

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arima",
});

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});

export const generateMetadata = async () => {
  return {
    title: {
      template: `%s | ${websiteName}`,
      default: websiteName,
    },
    description: websiteDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    openGraph: {
      title: websiteName,
      description: websiteDescription,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      siteName: websiteName,
      images: [
        {
          url: "https://localhost:3000/opengraph-image.png",
          width: 1280,
          height: 720,
        },
      ],
      locale: "vi",
      type: "website",
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${arima.className} ${arima.variable} ${dancing_script.variable}`}
      >
        <StyledProgressBar />
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
