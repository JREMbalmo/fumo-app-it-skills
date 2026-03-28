import { getImageFiles } from "./lib/getImages";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import OrderSection from "./components/OrderSection";
import ContactSection from "./components/ContactSection";

const DEFAULT_CAPTION = "Handcrafted with love — your custom plush awaits";

export default function Home() {
  const homepageSrcs = getImageFiles("images/homepage");
  const gallerySrcs = getImageFiles("images/past-works");

  const slides = homepageSrcs.map((src) => ({ src, caption: DEFAULT_CAPTION }));
  const galleryItems = gallerySrcs.map((src, i) => ({
    src,
    label: `Custom Commission #${i + 1}`,
  }));

  return (
    <>
      <Header />
      <main>
        <HomeSection slides={slides} />
        <AboutSection />
        <GallerySection items={galleryItems} />
        <OrderSection />
        <ContactSection />
      </main>
    </>
  );
}
