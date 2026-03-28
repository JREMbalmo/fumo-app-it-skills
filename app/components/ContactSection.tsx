export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{ backgroundColor: "#9D8189" }}
      className="py-24 px-6"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          style={{ color: "#FFFFFF" }}
          className="text-4xl font-bold mb-8 tracking-wide"
        >
          Contact
        </h2>

        <div
          className="w-16 h-1 mx-auto mb-10 rounded-full"
          style={{ backgroundColor: "#FFCAD4" }}
        />

        <p
          style={{ color: "#FFCAD4" }}
          className="text-base mb-12 opacity-90"
        >
          Have questions before ordering? Feel free to reach out through any of
          the channels below!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <div
            className="flex-1 rounded-2xl p-8 flex flex-col items-center gap-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <span className="text-4xl">💬</span>
            <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              Discord
            </h3>
            <p style={{ color: "#FFCAD4" }} className="text-sm">
              yourdiscord#0000
            </p>
          </div>

          <div
            className="flex-1 rounded-2xl p-8 flex flex-col items-center gap-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <span className="text-4xl">✉️</span>
            <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              Email
            </h3>
            <p style={{ color: "#FFCAD4" }} className="text-sm">
              your@email.com
            </p>
          </div>
        </div>

        <p
          className="mt-16 text-xs opacity-50"
          style={{ color: "#FFFFFF" }}
        >
          © {new Date().getFullYear()} Fumo Commissions. All rights reserved.
        </p>
      </div>
    </section>
  );
}
