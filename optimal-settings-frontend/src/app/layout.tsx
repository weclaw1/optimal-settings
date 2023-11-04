import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

const title = "Optimal Settings";

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/games',
    name: 'Games',
  },
  {
    path: '/guides',
    name: 'Guides',
  },
]

export const metadata: Metadata = {
  title,
  description: "Web app with optimal settings for games and guides for game settings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation title={title} routes={routes}>
          {children}
        </Navigation>
      </body>
    </html>
  );
}
