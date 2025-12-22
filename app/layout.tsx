import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NitroBiome - NO Activation Flow",
  description: "Fast NO activation flow you can feel. Fermentation-based metabolites + nanobubble delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
