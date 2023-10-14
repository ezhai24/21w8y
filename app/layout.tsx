import { Dela_Gothic_One } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emily Zhai | 21W8Y Portfolio",
  description:
    "An unofficial portfolio for the Unsplash photographer Mateusz Delegacz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={delaGothicOne.className}>
        {children}
        <footer className="footer">
          Photos by <a href="https://unsplash.com/@21w8y">Mateusz Delegacz</a>{" "}
          on <a href="https://unsplash.com/">Unsplash</a>
        </footer>
      </body>
    </html>
  );
}
