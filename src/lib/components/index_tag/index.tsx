type IndexProps = {
	id: string;
	link: {
		name: string;
		url: string;
	}
}

const Index_Tag = ({ id, link }: IndexProps) => {
	return (
		<span key={id} className="flex flex-col justify-center text-xl text-accent hover:text-accent"><a href={link.url} className="hover:underline">{link.name}</a></span>
	)
}

export default Index_Tag;
