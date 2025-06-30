import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Features | LogoTweak - Free Online Logo Generator",
  description: "Discover all the features of LogoTweak, the fastest free online logo generator. Create logos online with thousands of icons, custom backgrounds, and instant downloads.",
};

export default function FeaturesPage() {
  return (
    <main className="h-full pt-12">
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h1 className="text-4xl font-bold mb-6">LogoTweak Features</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          LogoTweak is your go-to online logo generator for fast, beautiful, and professional logo creation. Here's what makes it awesome:
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">🎨 Icon Customization</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Choose from 7000+ icons (Lucide & Tabler)</li>
            <li>Adjust size, color, border, rotation, and fill</li>
            <li>Live preview as you tweak your design</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">🌈 Background Styling</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Solid colors, gradients, and custom backgrounds</li>
            <li>Border radius, padding, and shadow controls</li>
            <li>Curated color presets for inspiration</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">⚡ Instant Export</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Download as PNG, JPG, or SVG</li>
            <li>Choose your resolution (0.5x to 8x, FullRes)</li>
            <li>No registration or watermark</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">🌓 Light & Dark Mode</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Beautiful in both light and dark themes</li>
            <li>Automatic or manual theme switching</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">🚀 And More!</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Mobile-friendly, fast, and easy to use</li>
            <li>Open source and privacy-friendly</li>
          </ul>
        </section>
      </div>

      <Footer />
    </main>
  );
} 