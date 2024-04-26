// import Image from "next/image";

import { Index } from "@/lib/components";

export default function Home() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className="bg-gray-50 w-[300px] border-black border-[1px] shadow-md">
				<div className="bg-gray-200 flex flex-col items-center justify-center p-2 border-black border-b-[1px]">Rahul M. Navneeth</div>
				<div className="w-full p-4 flex flex-col items-start justify-center gap-1">
					<Index id="1" topic="Read" link={{ name: "blog", url: "/blog" }} />
					<Index id="2" topic="Code" link={{ name: "github", url: "https://github.com/RahulNavneeth" }} />
					<Index id="3" topic="Contact" link={{ name: "mail", url: "mailto:rahulmnavneeth@gmail.com" }} />
					<Index id="4" topic="Coffee" link={{ name: "buy me one", url: "https://buymeacoffee.com/rahulmnavn6" }} />
				</div>
			</div>
		</div>
	);
}
