import Link from "next/link";
import Image from "next/image";

// Types
type FeaturedMedia = { source_url: string };
type Embedded = { "wp:featuredmedia"?: FeaturedMedia[] };

export type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: Embedded;
  featured_image_url?: string;
};

// Component
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
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="rounded mb-4 object-cover"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{excerpt}</p>
      <Link
        href={`/posts/${post.id}`}
        className="text-green-600 font-medium mt-auto"
      >
        Read more →
      </Link>
    </article>
  );
}
