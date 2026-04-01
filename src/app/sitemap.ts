import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://sleepclinic.com';

  const staticPages = [
    '', '/about', '/sleep-info', '/board', '/qa', '/contact',
  ];

  const sleepInfoSlugs = [
    'insomnia', 'sleep-apnea', 'sleep-hygiene',
    'restless-leg', 'herbal-medicine', 'acupuncture-sleep',
  ];

  return [
    ...staticPages.map(path => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...sleepInfoSlugs.map(slug => ({
      url: `${baseUrl}/sleep-info/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
