import { UnderConstruction } from "@/lib/components";

export default function BlogHome() {
	// return <UnderConstruction />
	return (
		<div className="flex flex-col gap-10">
			<div>
				<div className="font-semibold text-2xl">01/01/2025</div>
				<a href="/blog/sample-blog" className="text-3xl">
					<div>1. Lorem Ipsum I   : Lorem ipsum dolor sit ametadipiscing eli</div>
				</a>
			</div>
			<div>
				<div className="font-semibold text-2xl">02/01/2025</div>
				<a href="/blog/sample-blog" className="text-3xl">
					<div>2. Lorem Ipsum I   : Lorem ipsum dolor , consectetur </div>
				</a>
			</div>
			<div>
				<div className="font-semibold text-2xl">03/01/2025</div>
				<a href="/blog/sample-blog" className="text-3xl">
					<div>3. Lorem Ipsum I   : Lorem ipsum dolor </div>
				</a>
			</div>
			<div>
				<div className="font-semibold text-2xl">05/01/2025</div>
				<a href="/blog/sample-blog" className="text-3xl">
					<div>4. Lorem Ipsum I   : Lorem ipsum dolr , cnsectetur adipiscing eli</div>
				</a>
			</div>
		</div>
	)
}
