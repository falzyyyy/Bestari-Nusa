import { MetadataRoute } from "next";
import { db } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bestarinusa.id";

  let programs: any[] = [];
  let posts: any[] = [];

  try {
    // Fetch dynamic pages from db
    programs = await db.getPrograms(false);
    posts = await db.getPosts(false);
  } catch (error) {
    console.error("Error generating sitemap dynamic paths:", error);
  }

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/news",
    "/team",
    "/contact"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Dynamic program routes
  const programRoutes = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: new Date(program.updated_at || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  // Dynamic post routes
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.published_at || post.updated_at || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...programRoutes, ...postRoutes];
}
