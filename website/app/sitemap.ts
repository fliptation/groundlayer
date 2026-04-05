import type { MetadataRoute } from 'next';
import { LAYERS } from '@/lib/layers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const staticRoutes = [
    '/',
    '/vision',
    '/get-started',
    '/contribute',
    '/contribute',
    '/examples',
    '/contribute/discussions',
    '/contribute/ideas',
    '/contribute/projects',
    '/auth/signin',
    '/auth/signup',
  ];

  const layerRoutes = LAYERS.map((layer) => `/layers/${layer.slug}`);

  const allRoutes = [...staticRoutes, ...layerRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
