import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const baseUrl = 'https://rahulmnavneeth.in'
  const thingsLatelyPath = path.join(process.cwd(), 'src/lib/data/things-lately/index.json')
  const thingsLatelyIndex = JSON.parse(fs.readFileSync(thingsLatelyPath, 'utf8'))
  
  // Filter only blog posts
  const blogPosts = thingsLatelyIndex.filter((item: any) => item.type === 'blog')
  
  const items = await Promise.all(
    blogPosts.map(async (post: any) => {
      const postPath = path.join(process.cwd(), 'src/lib/data/things-lately', post.slug, 'index.json')
      const postContent = JSON.parse(fs.readFileSync(postPath, 'utf8'))
      
      const description = postContent.find((item: any) => item.type === 'para')?.raw || ''
      
      const [day, month, year] = post.date.split('/')
      const pubDate = new Date(`20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`
    })
  )

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rahul M. Navneeth - Blog</title>
    <description>Thoughts, resources, and learnings from Rahul M. Navneeth</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>rahulmnaveeth@gmail.com (Rahul M. Navneeth)</managingEditor>
    <webMaster>rahulmnaveeth@gmail.com (Rahul M. Navneeth)</webMaster>
${items.join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

