// scripts/generate-sitemap.mjs
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE_URL = 'https://meatwala.co.uk/';
const now = new Date().toISOString();

const staticPaths = [
  '/', '/login', '/signup', '/otp', '/offers', '/cart', '/address',
  '/confirmorder', '/bookingConfirm', '/payment', '/Restaurantlist',
  '/Selectaddress', '/toprestaurant', '/contact', '/review', '/map',
  '/localHeros', '/family-deal', '/com', '/privacy-policy', '/terms-of-service',
  '/cancel', '/become-a-rider', '/partner', '/setting', '/myhistory',
  '/favourite', '/faq', '/support', '/generateTicket', '/notification',
  '/cookies-policy', '/bitesforbusiness', '/recipes', '/blog-detail', '/form',
  '/supported-by-meatwala', '/driver', '/all-restaurant', '/content-detail',
  '/loyaltypoint', '/shop', '/wholesale'
];

// If you have dynamic items, fetch IDs and expand here (optional)
// Example placeholders:
// const storeIds = ['123', '456']; // TODO: fetch from your API
// const ticketIds = ['T1', 'T2'];  // TODO: fetch from your API
const dynamicPaths = [
  // ...storeIds.map(id => `/store/${id}`),
  // ...ticketIds.map(id => `/ticketdetails/${id}`),
  // For param routes like /category/:name/:id or /near-me/:cityName/:cityid
  // you’ll want to generate real combos from your DB/API later.
];

// Build the list for the sitemap
const links = [...new Set([...staticPaths, ...dynamicPaths])].map((url) => ({
  url,
  changefreq: 'daily',
  priority: url === '/' ? 1.0 : 0.6,
  lastmod: now,
}));

// Resolve /public path in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outPath = path.resolve(__dirname, '../public/sitemap.xml');

// Generate and write the sitemap
const stream = new SitemapStream({ hostname: SITE_URL });
const writeStream = createWriteStream(outPath);

stream.pipe(writeStream);
links.forEach(link => stream.write(link));
stream.end();

await streamToPromise(stream);

console.log(`✅ sitemap.xml generated at ${outPath}`);
