import BlogIndex from "@/lib/data/blog/index.json"

type BlogIndexType = Array<{
	title: String,
	slug: String,
	date: String
}>

export default function BlogHome() {
	return (
		<div className="flex flex-col gap-10">
			{(BlogIndex as BlogIndexType).map((entry, idx) => (
				<div>
					<div className="font-semibold text-2xl">{entry.date}</div>
					<a href={"/blog/" + entry.slug} className="text-3xl">
						<div>{idx + 1}. {entry.title}</div>
					</a>
				</div>
			))}
		</div>
	)
}
