"use client";

const SITE_NAME = "Shu Plush";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      style={{ backgroundColor: "#FFFFFF", borderBottomColor: "#F4ACB7" }}
      className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span
          style={{ color: "#9D8189" }}
          className="text-xl font-bold tracking-wide"
        >
          {SITE_NAME}
        </span>
        <nav className="flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              style={{ color: "#9D8189" }}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
