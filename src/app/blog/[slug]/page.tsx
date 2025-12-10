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
	alt?: string
	tags?: string[]
	name?: string
	lang?: string
	filename?: string
	header?: string[]
	rows?: string[][]
	tableDescription?: string
	ref?: { term: string; definition: string }[]
}

export default function Blog() {
	const { slug } = useParams()
	const [content, setContent] = useState<BlogBlock[] | null>(null)

	useEffect(() => {
		import(`@/lib/data/things-lately/${slug}`)
			.then((mod) => setContent(mod.default || mod))
			.catch((err) => console.error("Failed to load blog content:", err))
	}, [slug])

	if (!content) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center">
				Loading...
			</div>
		)
	}

	const tagsBlock = content.find((block) => block.type === "tags")
	const refBlock = content.find((block) => block.type === "reference")

	const refTerms = refBlock?.ref?.map((item) => item.term) ?? []

	const renderBlock = (block: BlogBlock, index: number): JSX.Element | null => {
		const nextBlock = content[index + 1]
		const isSubSectionFollowedByCode = block.type === "sub-section" && nextBlock?.type === "code"
		
		switch (block.type) {
			case "title":
				return <h1 key={index}>{block.raw}</h1>
			case "section":
				return <h2 key={index}>{block.raw}</h2>
			case "sub-section":
				return <h3 key={index} className={`font-black ${isSubSectionFollowedByCode ? "mb-1" : ""}`}>{block.raw}</h3>
			case "para":
				return <p key={index}>{ParserInline(block.raw ?? "", refTerms)}</p>
			case "para-it":
				return (
					<p className="italic" key={index}>
						{ParserInline(block.raw ?? "", refTerms)}
					</p>
				)
			case "quote":
				return (
					<blockquote key={index}>
						<Quote quote={block.raw ?? ""} name={block.name ?? ""} />
					</blockquote>
				)
			case "callout":
				return (
					<div
						key={index}
						style={{ borderColor: "blue", background: "#f2f2ff" }}
						className={`p-4 border-l-4`}
					>
						<p>{ParserInline(block.raw ?? "", refTerms)}</p>
					</div>
				)
			case "code":
				const prevBlock = content[index - 1]
				const isCodeAfterSubSection = prevBlock?.type === "sub-section"
				return (
					<div key={index} className={isCodeAfterSubSection ? "-mt-4" : ""}>
						<Code
							language={block.lang ?? "plaintext"}
							code={block.raw?.trim() || ""}
							fileName={block.filename}
						/>
					</div>
				)
			case "img":
				return (
					<img
						key={index}
						src={block.url}
						alt={block.alt ?? "Blog post image"}
					/>
				)
			case "table":
				return (
					<div key={index} className="overflow-x-auto my-4">
						<div className="text-right">{block.tableDescription}</div>
						<table className="min-w-full border-collapse border border-white">
							<thead>
								<tr className="bg-gray-100">
									{(block.header ?? []).map((headerText, i) => (
										<th
											key={i}
											className="border border-white p-2 text-left font-semibold"
										>
											{headerText}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{(block.rows ?? []).map((row, i) => (
									<tr key={i} className="even:bg-gray-50">
										{row.map((cellText, j) => (
											<td key={j} className="border border-white p-2">
												{ParserInline(cellText, refTerms)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)
			case "items":
				return (
					<div key={index} className="flex flex-wrap gap-x-2 gap-y-1">
						{(block.items ?? []).map((item, i) => {
							if (item.type === "para")
								return (
									<span key={i} className="inline">
										{ParserInline(item.raw ?? "", refTerms)}
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
				if (block.type === "tags") return null
				return null
		}
	}

	return (
		<div className="flex flex-col text-lg gap-5 pb-4">
			{content.map((block, idx) => renderBlock(block, idx))}
			{refBlock && (
				<div>
					<hr
						style={{ borderStyle: "dashed", borderColor: "blue" }}
						className="border-t w-full"
					/>
					<div className="py-4 flex flex-col gap-2">
						{refBlock.ref?.map((item, i) => {
							const refId = `ref-${item.term.toLowerCase().replace(/\s+/g, "-")}`
							return (
								<p
									key={i}
									id={refId}
									className="scroll-mt-20 target:p-2 target:bg-[#f2f2ff] target:border-l-4 target:border-[#0000ff] transition-all duration-300"
								>
									<strong
										style={{ color: "blue" }}
										className="font-semibold"
									>
										{item.term} :
									</strong>{" "}
									{ParserInline(item.definition, refTerms)}
								</p>
							)
						})}
					</div>
					<hr
						style={{ borderStyle: "dashed", borderColor: "blue" }}
						className="border-t w-full"
					/>
				</div>
			)}
			{tagsBlock && (
				<div className="mt-10">
					<Tags tags={tagsBlock.tags ?? []} />
				</div>
			)}
		</div>
	)
}
