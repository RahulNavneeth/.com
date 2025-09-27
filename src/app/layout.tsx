import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import "./globals.css";
import { Header } from "@/lib/components";
import localFont from "next/font/local";

const iosevka = localFont({
  src: [
    { path: "../../public/fonts/Iosevka-Medium.ttf", weight: "400" },
  ],
  variable: "--font-iosevka",
});

const crimson = Crimson_Text({ subsets: ['latin'], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
	title: "Home?",
	description: "Rahul M Navneeth",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="https://github.com/RahulNavneeth.png" />
			</head>
			<body className={`${crimson.className} ${iosevka.variable}`}>
				<div className="w-full h-screen flex flex-col items-center">
					<div className="w-full md:w-1/2 h-screen border-black bg-white ">
						<Header />
						<div className="px-4 md:px-0 py-52 w-full h-screen">
							{children}
						</div>
					</div>
					{/* <Footer/> */}
				</div>
			</body>
		</html>
	);
}
