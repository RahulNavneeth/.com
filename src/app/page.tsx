import { Quote } from "@/lib/components/text";

export default function Home() {
	return (
		<div className="flex flex-col justify-center w-full h-full items-center">
			{/*<div className="text-2xl mb-3 font-semibold"> About Me </div>*/}
			<Quote quote="I don't want to live in a world where someone else is making the world a better place better than we are." name="Gavin Belson" />
		</div>
	);
}
