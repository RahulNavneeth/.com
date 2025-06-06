export default function Quote({ quote, name }: { quote: string, name?: string }) {
	return (
		<span className="text-lg">
			<span style={{ width: name ? "100%" : "fit" }} className="italic">
				&quot;{quote}&quot;
			</span>
			{name && <div className="w-full text-right font-semibold">~ {name}</div>}
		</span>
	)
}
