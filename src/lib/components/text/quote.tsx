export default function Quote({ quote, name }: { quote: string, name?: string }) {
	return (
		<div className="text-lg w-fit">
			<p className="italic w-full">
				&quot;{quote}&quot;
			</p>
			<div className="w-full text-right font-semibold">~ {name}</div>
		</div>
	)
}
