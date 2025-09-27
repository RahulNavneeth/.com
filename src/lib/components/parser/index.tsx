import parse, { DOMNode, domToReact } from "html-react-parser"
import React from "react"

export default function parseInline(
	raw: string,
	refTerms: string[] = []
) {
	return parse(raw, {
		replace: (node: DOMNode) => {
			if (node.type === "text") {
				const text = node.data
				if (!refTerms.length || !text.trim()) {
					return undefined
				}

				const regex = new RegExp(`\\b(${refTerms.join("|")})\\b`, "gi")
				if (!regex.test(text)) {
					return undefined
				}

				const parts = text.split(regex)
				const elements = parts.map((part, index) => {
					const isRefTerm = refTerms.some(
						(term) => term.toLowerCase() === part.toLowerCase()
					)
					if (isRefTerm) {
						const refId = `ref-${part.toLowerCase().replace(/\s+/g, "-")}`
						return (
							<a
								key={index}
								href={`#${refId}`}
								style={{color: "blue"}}
								className="font-semibold underline decoration-dotted underline-offset-4 hover:text-blue-800 transition-colors"
							>
								{part}
							</a>
						)
					}
					return part
				})
				return <>{elements}</>
			}

			if (node.type === "tag") {
				switch (node.name) {
					case "a":
						return (
							<a
								href={node.attribs?.href || "#"}
								target="_blank"
								rel="noopener noreferrer"
							>
								{domToReact(node.children, {})}
							</a>
						)

					case "b":
						return <strong>{domToReact(node.children, {})}</strong>

					case "i":
						return <em>{domToReact(node.children, {})}</em>

					case "strike":
						return <del>{domToReact(node.children, {})}</del>
				}
			}
			return undefined
		},
	})
}
