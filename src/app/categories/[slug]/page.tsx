import Layout from "@/app/components/Layout";
import PostCard, { Post } from "@/app/components/PostCard";

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

// Data fetching helpers
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

// Page component
export default async function CategoryPage({
  params,
}: {
  params: { slug: string }; // only type params here
}) {
  const category = await getCategory(params.slug);

  if (!category) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-3xl font-bold">Category not found</h1>
        </div>
      </Layout>
    );
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">
          Posts in “{category.name}”
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
