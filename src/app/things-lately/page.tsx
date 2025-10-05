"use client"

import { useState } from "react"
import ReviewsIndex from "@/lib/data/things-lately/index.json"

type ReviewType = {
	type: string
	name: string
	img?: string
	description?: string
	rating?: number
	slug: string
	link?: string
	input?: string
	popup?: string[]
}

type ReviewsByCategory = {
	[key: string]: ReviewType[]
}

export default function ReviewsHome() {
	const [hoveredItem, setHoveredItem] = useState<number | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	const reviewsByCategory = (ReviewsIndex as ReviewType[]).reduce((acc: ReviewsByCategory, review) => {
		if (!acc[review.type]) {
			acc[review.type] = []
		}
		acc[review.type].push(review)
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
			{Object.entries(reviewsByCategory).map(([category, reviews]) => (
				<div key={category} className="mb-12">
					<h2 className="text-2xl font-semibold">
						{capitalizeFirst(category)}
					</h2>
					<div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 mt-2">
						{reviews.map((review, idx) => (
							<div key={idx} className="relative w-full">
								<h3 style={{color: "blue"}} className="font-medium text-3xl mb-2 w-full cursor-pointer relative" 
								    onMouseEnter={(e) => {
								    	setHoveredItem(idx)
								    	setMousePosition({ x: e.clientX + 10, y: e.clientY + 10 })
								    }}
								    onMouseMove={(e) => {
								    	if (hoveredItem === idx) {
								    		setMousePosition({ x: e.clientX + 10, y: e.clientY + 10 })
								    	}
								    }}
								    onMouseLeave={() => {
								    	setHoveredItem(null)
								    }}>
									{review.name}
								</h3>
								{hoveredItem === idx && (
									<div className={`bg-white border border-gray-200 p-4 z-10 ${review.popup && review.popup.length === 1 && review.popup.includes('img') ? 'w-auto fixed' : 'w-full absolute top-0 left-0'} flex justify-between`} 
									     style={review.popup && review.popup.length === 1 && review.popup.includes('img') ? { left: mousePosition.x + 'px', top: mousePosition.y + 'px' } : {}}
									     onMouseEnter={() => setHoveredItem(idx)}
									     onMouseLeave={() => setHoveredItem(null)}>
										{review.img && review.popup?.includes('img') && (
											<img 
												src={review.img} 
												alt={review.name}
												style={{ background: "blue", color: "white" }}
												className={`h-48 object-contain ${review.popup.length === 1 ? 'w-auto' : 'w-1/3 mr-4'}`}
											/>
										)}
										{review.popup && review.popup.length > 1 && (
											<div className="flex-1">
												{review.popup.includes('name') && (
													<h3 style={{color: "blue"}} className="font-medium text-3xl mb-2">{review.name}</h3>
												)}
												{review.description && review.popup.includes('description') && (
													<p className="text-gray-600 text-sm mb-3 line-clamp-3">
														{review.description}
													</p>
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
												{review.link && review.input && review.popup.includes('link') && (
													<a 
														href={review.link}
														target="_blank"
														rel="noopener noreferrer"
													>
														{review.input} →
													</a>
												)}
											</div>
										)}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
