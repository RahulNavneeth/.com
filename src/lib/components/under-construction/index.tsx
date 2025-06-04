import { ArrRight } from "@/lib/components/text";

export default function UnderConstruction() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<div className="px-4 py-2 text-xl w-full h-full flex flex-row items-center justify-center gap-3 mt-20">
				page under construction! until then <ArrRight /> <a href="/blog" className="underline font-semibold">Read</a>
			</div>
		</div >
	)
}
