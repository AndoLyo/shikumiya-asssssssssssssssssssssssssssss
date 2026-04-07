"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingParticles from "@/components/FloatingParticles";
import { SiteDataProvider } from "@/lib/SiteDataContext";
import type { SiteData } from "@/lib/site-data";

const siteData: SiteData = {
  artistName: "Sora",
  subtitle: "Art Portfolio",
  catchcopy: "sdasdsadasdas",
  heroImage: undefined,
  profileImage: "/images/about.webp",
  bio: "xdscvSDVsvszdvsdvszvs",
  motto: "SDSDVsd",
  email: "ryoya112@outlook.com",
  tools: ["SDvSvSADv", "ADSvADSDv"],
  works: [
    { src: "/images/work_02.webp", title: "作品 01" },
    { src: "/images/work_03.webp", title: "作品 02" },
    { src: "/images/work_04.webp", title: "作品 03" },
    { src: "/images/work_05.webp", title: "作品 04" },
    { src: "/images/work_06.webp", title: "作品 05" },
    { src: "/images/work_07.webp", title: "作品 06" },
    { src: "/images/work_08.webp", title: "作品 07" },
  ],
  snsX: "https://x.com/sora_manga_test",
  snsInstagram: "https://instagram.com/sora_manga_test",
};

export default function Home() {
  return (
    <SiteDataProvider data={siteData}>
      <FloatingParticles />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </SiteDataProvider>
  );
}
