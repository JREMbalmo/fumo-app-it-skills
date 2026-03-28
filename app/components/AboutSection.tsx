export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ backgroundColor: "#D8E2DC" }}
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          style={{ color: "#9D8189" }}
          className="text-4xl font-bold mb-8 tracking-wide"
        >
          About
        </h2>

        <div
          className="w-16 h-1 mx-auto mb-10 rounded-full"
          style={{ backgroundColor: "#F4ACB7" }}
        />

        <p
          style={{ color: "#9D8189" }}
          className="text-lg leading-relaxed mb-6"
        >
          <strong>Fumo plushies</strong> are adorable, chibi-style stuffed toys inspired by the
          iconic plush figures from the <em>Touhou Project</em> series. Known for their round faces,
          floppy limbs, and irresistibly soft design, fumos have captured the hearts of fans
          and collectors worldwide.
        </p>

        <p
          style={{ color: "#9D8189" }}
          className="text-lg leading-relaxed mb-6"
        >
          Here, you can order a <strong>fully custom fumo plush</strong> designed entirely
          around your vision. Whether it&apos;s your original character, a favorite fictional figure,
          or a unique concept all your own — I bring it to life stitch by stitch.
        </p>

        <p
          style={{ color: "#9D8189" }}
          className="text-lg leading-relaxed"
        >
          Every commission is crafted with care using quality materials, and each plush is
          one-of-a-kind. Tell me your idea, share your references, and let&apos;s create something
          you&apos;ll treasure forever.
        </p>
      </div>
    </section>
  );
}
