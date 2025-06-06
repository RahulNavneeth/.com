import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

function ArrLeft() {
	return <span className={inter.className}>&larr;</span>
}

function ArrRight() {
	return <span className={inter.className}>&rarr;</span>
}

export { ArrLeft, ArrRight };
