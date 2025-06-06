"use client"

import { Code, Quote, Tags } from "@/lib/components/text"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import React from "react"
import { ParserInline } from "@/lib/components"

type BlogBlock = {
	type: string
	raw?: string
	items?: BlogBlock[]
	url?: string
	tags?: string[]
}

export default function Blog() {
	const { slug } = useParams()
	const [content, setContent] = useState<BlogBlock[] | null>(null)

	useEffect(() => {
		import(`@/lib/data/blog/${slug}`)
			.then((mod) => setContent(mod.default || mod))
			.catch((err) => console.error("Failed to load blog content:", err))
	}, [slug])

	if (!content) return <div className="w-full h-full flex flex-col items-center justify-center">Loading...</div>

	const renderBlock = (block: BlogBlock, index: number): JSX.Element | null => {
		switch (block.type) {
			case "title":
				return <h1 key={index}>{block.raw}</h1>

			case "section":
				return <h2 key={index}>{block.raw}</h2>

			case "sub-section":
				return <h3 key={index}>{block.raw}</h3>

			case "para":
				return <p key={index}>{ParserInline(block.raw)}</p>

			case "para-it":
				return <p className="italic" key={index}>{block.raw}</p>

			case "quote":
				return (
					<p key={index}>
						<Quote quote={block.raw ?? ""} />
					</p>
				)

			case "code":
				return (
					<Code
						key={index}
						language="haskell"
						code={block.raw?.trim() || ""}
						fileName="Main.hs"
					/>
				)

			case "img":
				return <img key={index} src={block.url} alt="blog-image" />

			case "items":
				return (
					<div key={index} className="flex flex-wrap gap-x-2 gap-y-1">
						{(block.items ?? []).map((item, i) => {
							if (item.type === "para")
								return (
									<span key={i} className="inline">
										{ParserInline(item.raw ?? "")}
									</span>
								)
							if (item.type === "quote")
								return (
									<span key={i} className="inline-block">
										<Quote quote={item.raw ?? ""} />
									</span>
								)
							return null
						})}
					</div>
				)

			default:
				return null
		}
	}

	return (
		<div className="flex flex-col text-lg gap-5 pb-4">
			{content.map((block, idx) => renderBlock(block, idx))}
			<Tags tags={content.filter((block) => block.type == "tags")[0].tags} />
		</div>
	)
}
