import { ArrRight } from "../text"
import Nav from "./Nav"
import { GithubIcon, MailIcon, CoffeeIcon, RssIcon } from "lucide-react"

export default function Header() {
	return (
		<header className="absolute w-full md:w-1/2 bg-white flex flex-col justify-between my-8">
			<div className="pb-4">
				<div className="text-3xl md:text-left text-center">Rahul M. Navneeth</div>
				<div className="flex flex-col md:flex-row items-center justify-between">
					{/*<div>Wake up at 11:30 Feeling like a bag of shit (oh no) <ArrRight /> <a href="">link to something interesting</a> </div>*/}
					{/*<div className="flex-row flex gap-3">AhHa Ahah aHah ahah AhHa <ArrRight /> <a href="https://www.youtube.com/watch?v=JLAtVgtevpw&pp=ygUWc2FzaWt1bWFyIGxhdWdoIDNob3Vycw%3D%3D">(^_^)</a> </div>*/}
					<div className="flex-row flex gap-3">Jam with me<ArrRight /> <a href="https://music.apple.com/profile/rahulmnavneeth">Music</a> </div>
					<div className="flex flex-row gap-6">
						<a className="hover:bg-[#0000FF] hover:text-white rounded-full p-1" href="/rss.xml"><RssIcon size={15} /></a>
						<a className="hover:bg-[#0000FF] hover:text-white rounded-full p-1" href="https://github.com/RahulNavneeth"><GithubIcon size={15} /></a>
						<a className="hover:bg-[#0000FF] hover:text-white rounded-full p-1" href="mailto:rahulmnaveeth@gmail.com"><MailIcon size={15} /></a>
						<a className="hover:bg-[#0000FF] hover:text-white rounded-full p-1" href="https://coff.ee/rahulmnavn6"><CoffeeIcon size={15} /></a>
					</div>
				</div>
			</div>
			<Nav />
		</header>
	)
};
