"use client"

import { useState } from "react"
import { Filter, SortAsc } from "lucide-react"
import ReviewsIndex from "@/lib/data/things-lately/index.json"

type ReviewType = {
	type: string
	title: string
	img?: string
	description?: string
	rating?: number
	slug: string
	link?: string
	input?: string
	popup?: string[]
	date?: string
}

type ReviewsByCategory = {
	[key: string]: ReviewType[]
}

export default function ReviewsHome() {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [selectedFilter, setSelectedFilter] = useState<string>('all')
	const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

	// Get unique types for filter options
	const availableTypes = Array.from(new Set((ReviewsIndex as ReviewType[]).map(item => item.type)))
	
	const allItems = (ReviewsIndex as ReviewType[])
		.filter(item => selectedFilter === 'all' || item.type === selectedFilter)
		.sort((a, b) => {
			if (!a.date || !b.date) return 0
			const dateA = new Date(a.date.split('/').reverse().join('-'))
			const dateB = new Date(b.date.split('/').reverse().join('-'))
			return sortOrder === 'newest' 
				? dateB.getTime() - dateA.getTime()
				: dateA.getTime() - dateB.getTime()
		})

	const itemsByDate = allItems.reduce((acc: { [date: string]: ReviewType[] }, item) => {
		const date = item.date || 'No Date'
		if (!acc[date]) {
			acc[date] = []
		}
		acc[date].push(item)
		return acc
	}, {})

	const renderStars = (rating: number = 0) => {
		return Array.from({ length: 5 }, (_, i) => (
			<span key={i} style={{ color: i < rating ? "blue" : "#d1d5db" }}>
				★
			</span>
		))
	}

	const capitalizeFirst = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	return (
		<div className="flex flex-col gap-8">
			{Object.entries(itemsByDate).map(([date, items]) => (
				<div key={date} className="">
					<h2 className="text-2xl font-semibold mb-4">
						{date}
					</h2>
					<div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 mt-2">
						{items.map((review, idx) => {
							const uniqueId = `${date}-${review.slug}`
							return (
							<div key={idx} className="relative w-full">
								{review.type === 'blog' ? (
									<h3 className="font-medium text-3xl mb-2 w-full">
										<a href={`/blog/${review.slug}`} style={{color: "blue"}} className="hover:underline cursor-pointer">
											{review.title}
										</a>
										<span className="text-black"> :: {review.type}</span>
									</h3>
								) : (
									<h3 className="font-medium text-3xl mb-2 w-full cursor-pointer relative" 
									    onMouseEnter={(e) => {
									    	setHoveredItem(uniqueId)
									    	setMousePosition({ x: e.clientX + 10, y: e.clientY + 10 })
									    }}
									    onMouseMove={(e) => {
									    	if (hoveredItem === uniqueId) {
									    		setMousePosition({ x: e.clientX + 10, y: e.clientY + 10 })
									    	}
									    }}
									    onMouseLeave={() => {
									    	setHoveredItem(null)
									    }}
									    onClick={(e) => {
									    	if (hoveredItem === uniqueId) {
									    		setHoveredItem(null)
									    	} else {
									    		setHoveredItem(uniqueId)
									    		setMousePosition({ x: e.clientX + 10, y: e.clientY + 10 })
									    	}
									    }}>
										<span style={{color: "blue"}}>{review.title}</span>
										<span className="text-black"> :: {review.type}</span>
									</h3>
								)}
								{review.type !== 'blog' && hoveredItem === uniqueId && (
									<div className={`bg-white border border-gray-200 p-4 z-10 ${review.popup && review.popup.length === 1 && review.popup.includes('img') ? 'w-auto fixed' : 'w-full absolute top-0 left-0'} flex justify-between`} 
									     style={review.popup && review.popup.length === 1 && review.popup.includes('img') ? { left: mousePosition.x + 'px', top: mousePosition.y + 'px' } : {}}
								     onMouseEnter={() => setHoveredItem(uniqueId)}
								     onMouseLeave={() => setHoveredItem(null)}>
										{review.img && review.popup?.includes('img') && (
											<img 
												src={review.img} 
												alt={review.title}
												style={{ background: "blue", color: "white" }}
												className={`h-48 object-contain ${review.popup.length === 1 ? 'w-auto' : 'w-fit mr-4'}`}
											/>
										)}
										{review.popup && review.popup.length > 1 && (
											<div className="flex-1">
												{review.popup.includes('name') && (
													<h3 style={{color: "blue"}} className="font-medium text-3xl mb-2">{review.title}</h3>
												)}
												{review.description && review.popup.includes('description') && (
													<p style={{color: "black"}} className="text-lg mb-3 line-clamp-3">
														{review.description}
													</p>
												)}
												{review.link && review.input && review.popup.includes('link') && (
													<a 
														href={review.link}
														target="_blank"
														rel="noopener noreferrer"
													>
														{review.input} →
													</a>
												)}
												{review.rating && review.popup.includes('rating') && (
													<div className="flex items-center gap-2 mb-3">
														<div className="flex text-[35px]">
															{renderStars(review.rating)}
														</div>
														<span className="text-lg text-gray-500">
															{review.rating}/5
														</span>
													</div>
												)}
											</div>
										)}
									</div>
								)}
								</div>
							)
						})}
					</div>
				</div>
			))}
		</div>
	)
}
