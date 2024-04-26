type IndexProps = {
	id: string;
	topic: string;
	link: {
		name: string;
		url: string;
	}
}

const Index_Tag = ({ id, link, topic }: IndexProps) => {
	return (
		<div className="w-full flex flex-row items-start justify-between">
			<span className="flex flex-row">
				<div className="text-red-700 w-[20px]">{id}.</div>{topic}?
			</span>
			<span className="absolute left-[49%]">-&gt;</span>
			<span>(<a href={link.url} className="underline">{link.name}</a>)</span>
		</div>
	)
}

export default Index_Tag;
