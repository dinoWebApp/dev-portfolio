import axios from "axios";
import { PUBLIC_BACKEND_URL, PUBLIC_DOMAIN_URL } from "$env/static/public";
export async function GET() {
  let emails = (await axios.get(`${PUBLIC_BACKEND_URL}/auth/users`)).data;
  const userUrls = emails.map((/** @type {any} */ email)=>`${PUBLIC_DOMAIN_URL}/portfolio/${email}`);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
    ${userUrls.map((/** @type {any} */ url)=>`
      <url>
        <loc>${url}</loc>
      </url>
    `).join("\n")}
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