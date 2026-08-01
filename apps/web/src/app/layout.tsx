import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrimAtlas Product OS",
  description: "Enterprise Product OS for product, supplier, factory, inventory, and analytics workflows."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
