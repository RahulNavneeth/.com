export default function Code({ language, code, fileName }: { language: string, code: string, fileName?: string }) {
	return (
		<div>
			<div className="mt-2 text-right">{language} {fileName && ` | ${fileName}`}</div>
			<pre className="line-numbers">
				<code>
					{code}
				</code>
			</pre>
		</div>
	)
}
