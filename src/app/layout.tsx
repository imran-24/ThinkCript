import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

import { Box, Container } from "@chakra-ui/react";
import Header from "./components/header";
import ReduxProvider from "@/components/redux-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Provider>
              <Toaster />
              <Box minH='100vh' bg='gray.50'>
                <Header />
                <Container as='main' maxW='7xl' px={4} py={6}>
                  {children}
                </Container>
              </Box>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
