import Layout from "@/app/components/Layout";

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

async function getPost(id: string) {
  const res = await fetch(`${WP_BASE}/articles/${id}?_embed`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  const author = post._embedded?.author?.[0]?.name || "Unknown";

  return (
    <Layout>
      <article className="max-w-3xl mx-auto py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>

        {/* Meta */}
        <p className="text-gray-600 mb-6">
          By {author} on {new Date(post.date).toLocaleDateString()}
        </p>

        {/* Featured Image */}
        {featuredImage && (
          <img
            src={featuredImage}
            alt={post.title.rendered}
            className="mb-6 rounded-lg shadow"
          />
        )}

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </Layout>
  );
}
