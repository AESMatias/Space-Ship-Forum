import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { CustomFooter } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Ship Forum",
  description: "Space Ship Forum - Welcome aboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-background via-blue-950/30 to-black`}
        style={{ backgroundColor: 'var(--background)' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <header className="justify-center items-center pb-4 select-none">
              <Navbar />
            </header>
            {children}
          </div>
          <CustomFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
