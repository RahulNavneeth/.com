type Language = 'haskell' | 'C' | 'C++';
export default function Code({ language = 'haskell', code, fileName }: { language: Language, code: string, fileName?: string }) {
	return (
		<div>
			<div className="mt-2 italic text-right">{language} {fileName && ` | ${fileName}`}</div>
			<pre className="line-numbers">
				<code>
					{code}
				</code>
			</pre>
		</div>
	)
}
