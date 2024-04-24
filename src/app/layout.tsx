import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Footer } from "@/lib/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home?",
    description: "Rahul M Navneeth",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.cdnfonts.com/css/cmu-serif" rel="stylesheet" />
            </head>
            <body className={inter.className}>
                <div className="w-screen h-screen">
                    {children}
                    {/* <Footer/> */}
                </div>
            </body>
        </html>
    );
}
