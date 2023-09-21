
export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
    
    
    <url>
      <loc>https://www.dev-portfolio.kr/</loc>
      <lastmod>2023-09-20T15:01:34+00:00</lastmod>
    </url>
    
    
    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}