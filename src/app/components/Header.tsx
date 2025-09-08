import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Blog Title */}
        <Link href="/" className="font-bold text-2xl text-green-600">
          My Blog
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-8">
          {/* Home */}
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          {/* Categories Section */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 font-medium">🗂 Categories</span>
            <Link href="/categories/tech" className="hover:text-green-600">
              Tech
            </Link>
            <Link href="/categories/lifestyle" className="hover:text-green-600">
              Lifestyle
            </Link>
            <Link href="/categories/travel" className="hover:text-green-600">
              Travel
            </Link>
            <Link href="/categories/food" className="hover:text-green-600">
              Food
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
