"use client";
import { Inter } from "next/font/google";
import apolloClient from "@/api/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={apolloClient}>
          <ChakraProvider>{children}</ChakraProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
