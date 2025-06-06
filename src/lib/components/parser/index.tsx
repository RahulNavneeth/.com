import parse, { DOMNode, domToReact } from 'html-react-parser'

export default function parseInline(raw: string) {
	return parse(raw, {
		replace: (node: DOMNode) => {
			if (node.type === 'tag') {
				switch (node.name) {
					case 'a':
						return (
							<a
								href={(node.attribs?.href || '#')}
								target="_blank"
								rel="noopener noreferrer"
							>
								{ // @ts-ignore
									domToReact(node.children)
								}
							</a>
						)

					case 'b':
						return <strong>
							{ // @ts-ignore
								domToReact(node.children)
							}
						</strong>

					case 'i':
						return <em>
							{ // @ts-ignore
								domToReact(node.children)
							}
						</em>

					case 'strike':
						return <del>
							{ // @ts-ignore
								domToReact(node.children)
							}
						</del>

				}
			}
			return undefined
		},
	})
}
