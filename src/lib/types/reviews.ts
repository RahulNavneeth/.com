// Review data structure for the "Things I Got Into" section
export interface ReviewData {
	type: string // Category: movies, books, games, etc.
	name: string // Name of the content
	img?: string // Optional image URL
	description?: string // Optional description
	rating?: number // Optional rating out of 5
	slug: string // URL slug for the review page
	link?: string // Optional external link
	input?: string // Optional input text where link is embedded
}

// Review content block structure (similar to blog structure)
export interface ReviewBlock {
	type: string
	raw?: string
	items?: ReviewBlock[]
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

// Available review categories
export type ReviewCategory = 'movies' | 'books' | 'games' | 'music' | 'shows' | 'tools' | 'other'

// Star rating component props
export interface StarRatingProps {
	rating: number
	maxRating?: number
	size?: 'sm' | 'md' | 'lg'
}
