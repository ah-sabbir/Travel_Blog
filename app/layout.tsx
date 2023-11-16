import type { Metadata } from "next";
import { Nunito_Sans, Arima } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/auth-provider";
import { GlobalStateProvider } from "@/providers/redux-provider";
import StyledProgressBar from "@/components/progress-bar";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arima",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${nunito.className} ${arima.variable}  ${nunito.variable}`}
      >
        <StyledProgressBar />
        <GlobalStateProvider>
          <AuthProvider>{children}</AuthProvider>
        </GlobalStateProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
