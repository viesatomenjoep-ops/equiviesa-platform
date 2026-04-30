import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/cms-login'],
    },
    sitemap: 'https://www.equiviesaworldwide.com/sitemap.xml',
  }
}
