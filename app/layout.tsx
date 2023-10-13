import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav>
          <div className="navContent">
            <Link href="/">21W8Y</Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
