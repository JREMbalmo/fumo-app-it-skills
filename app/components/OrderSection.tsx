"use client";

import { useRef, useState } from "react";

export default function OrderSection() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: "#FFFFFF",
    borderColor: "#F4ACB7",
    color: "#9D8189",
    outlineColor: "#9D8189",
  };

  return (
    <section
      id="order"
      style={{ backgroundColor: "#FFCAD4" }}
      className="py-24 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          style={{ color: "#9D8189" }}
          className="text-4xl font-bold mb-8 tracking-wide text-center"
        >
          Order
        </h2>

        <div
          className="w-16 h-1 mx-auto mb-10 rounded-full"
          style={{ backgroundColor: "#9D8189" }}
        />

        <p
          style={{ color: "#9D8189" }}
          className="text-center text-base mb-10 opacity-80"
        >
          Fill out the form below to request a custom commission. I&apos;ll get back
          to you as soon as possible!
        </p>

        {submitted ? (
          <div
            className="rounded-2xl p-10 text-center shadow"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="text-5xl mb-4">🧸</div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "#9D8189" }}
            >
              Request Received!
            </h3>
            <p style={{ color: "#9D8189" }} className="opacity-80">
              Thank you for your commission request. I&apos;ll review your details
              and reach out to your email soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 shadow flex flex-col gap-6"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                style={{ color: "#9D8189" }}
                className="text-sm font-semibold"
              >
                Your Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="rounded-lg border px-4 py-3 text-sm focus:outline-2 transition"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                style={{ color: "#9D8189" }}
                className="text-sm font-semibold"
              >
                Design Description *
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your plush design in as much detail as you'd like — character, colors, outfit, accessories, expressions, etc."
                rows={6}
                className="rounded-lg border px-4 py-3 text-sm resize-none focus:outline-2 transition"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                style={{ color: "#9D8189" }}
                className="text-sm font-semibold"
              >
                Reference Images (optional)
              </label>
              <div
                className="rounded-lg border-2 border-dashed px-4 py-8 flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition"
                style={{ borderColor: "#F4ACB7" }}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="text-3xl mb-2">📎</span>
                <p className="text-sm text-center" style={{ color: "#9D8189" }}>
                  {files && files.length > 0
                    ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                    : "Click to upload reference images"}
                </p>
                <p className="text-xs mt-1 opacity-60" style={{ color: "#9D8189" }}>
                  PNG, JPG, GIF up to 10MB each
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-white transition hover:opacity-80"
              style={{ backgroundColor: "#9D8189" }}
            >
              Submit Commission Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
