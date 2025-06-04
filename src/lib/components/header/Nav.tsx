export default function Nav() {
	return (
		<div className="flex flex-row md:justify-start justify-center gap-6 py-4 border-y-[1px] border-gray-200">
			<Index name="Home" link="/" />
			<Index name="Blog" link="/blog" />
			<Index name="Resource" link="/resource" />
		</div>
	)
};

function Index({ name, link }: { name: string, link?: string }) {
	return (
		<a href={link ? link : "#name"}><div className="hover:underline cursor-pointer"> {name} </div></a>
	)
};
