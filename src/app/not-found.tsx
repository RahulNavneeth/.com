import { ArrRight } from "@/lib/components/text";

const NotFound404 = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<div className="px-4 py-2 text-xl w-full h-full flex flex-row items-center justify-center gap-3 mt-20">
				oopsie daisy lost?! <ArrRight /> <a href="/" className="underline font-semibold">Go Home</a>
			</div>
		</div>
	)
}

export default NotFound404;
