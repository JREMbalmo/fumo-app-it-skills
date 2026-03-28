import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import OrderSection from "./components/OrderSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <AboutSection />
        <GallerySection />
        <OrderSection />
        <ContactSection />
      </main>
    </>
  );
}
