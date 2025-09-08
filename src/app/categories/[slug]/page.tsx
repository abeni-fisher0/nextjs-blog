import Layout from "@/app/components/Layout";
import PostCard, { Post } from "@/app/components/PostCard";

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

async function getCategory(slug: string) {
  const res = await fetch(`${WP_BASE}/categories?slug=${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  return data[0];
}

async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const res = await fetch(`${WP_BASE}/articles?categories=${categoryId}&_embed`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// Type for page props
interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.slug);
  const posts = category ? await getPostsByCategory(category.id) : [];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">
          {category ? `Posts in “${category.name}”` : "Category not found"}
        </h1>

        {posts.length === 0 ? (
          <p>No posts found in this category.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
