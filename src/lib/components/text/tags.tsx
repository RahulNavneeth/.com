"use client"
import { useRouter } from "next/navigation"

export default function Tags({ tags }: { tags: Array<String> }) {
	const router = useRouter();
	return (
		<div className="flex flex-row gap-3 cursor-pointer">
			{tags.map((tag, idx) => (
				<div key={idx} onClick={() => { router.push("/blog?tag=" + tag) }} style={{ background: "blue" }} className="px-2 text-white" > {tag}</div>
			))}
		</div>
	);
}
