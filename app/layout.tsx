import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/auth-provider";
import { GlobalStateProvider } from "@/providers/redux-provider";
import StyledProgressBar from "@/components/progress-bar";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={nunito.className}>
        <StyledProgressBar />
        <GlobalStateProvider>
          <AuthProvider>{children}</AuthProvider>
        </GlobalStateProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
