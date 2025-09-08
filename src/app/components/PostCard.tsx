import Link from "next/link";

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: any;
  featured_image_url?: string;
};

export default function PostCard({ post }: { post: Post }) {
  const title = post.title?.rendered || "Untitled";
  const excerpt = post.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, "") || "";
  const image =
    post.featured_image_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "";

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{excerpt}</p>
      <Link href={`/posts/${post.id}`} className="text-green-600 font-medium mt-auto">
        Read more →
      </Link>
    </article>
  );
}
