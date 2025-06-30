import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "LogoTweak vs Looka: Best Looka Alternative | Free Online Logo Generator",
  description:
    "Compare LogoTweak and Looka. See why LogoTweak is the best free alternative to Looka for fast, beautiful, and customizable logo design online.",
};

export default function CompareLookaPage() {
  return (
    <main className="h-full pt-12">
      <div className="w-full py-12 px-4 pt-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            LogoTweak Vs Looka
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-10">
            See why LogoTweak is the better choice for online logo generation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* LogoTweak Card */}
            <div className="rounded-2xl border border-violet-300 dark:border-violet-700 p-8 shadow flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center rounded-md bg-violet-100 dark:bg-violet-900 p-2">
                  <img
                    src="/logos/logo.png"
                    alt="LogoTweak"
                    className="h-6 w-6"
                  />
                </span>
                <span className="text-xl font-semibold">LogoTweak</span>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Create beautiful, customizable logos online in seconds. No sign
                up, no watermark, open source, and packed with features.
              </p>
              <ul className="mb-6 space-y-2 text-gray-800 dark:text-gray-200">
                <li>✅ 7000+ customizable icons</li>
                <li>✅ Gradients & color presets</li>
                <li>✅ PNG, JPG, SVG export</li>
                <li>✅ No sign up required</li>
                <li>✅ Dark mode & mobile friendly</li>
                <li>✅ Open source & privacy-friendly</li>
              </ul>
              <a
                href="/"
                className="mt-auto inline-block bg-violet-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-violet-700 transition"
              >
                Try LogoTweak Free
              </a>
            </div>
            {/* Looka Card */}
            <div className="rounded-2xl border border-gray-300 dark:border-gray-700 p-8 shadow flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center rounded-md bg-yellow-100 dark:bg-yellow-900 p-2">
                  <Sparkles size={24} className="text-yellow-500 dark:text-yellow-300" />
                </span>
                <span className="text-xl font-semibold">Looka</span>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                AI-powered logo maker and brand kit generator. Fast, easy, and packed with templates, but requires payment for full access and advanced features.
              </p>
              <ul className="mb-6 space-y-2 text-gray-800 dark:text-gray-200">
                <li>✅ AI-powered logo generation</li>
                <li>✅ 300+ branding templates</li>
                <li>✅ High-res SVG, PNG, PDF export (paid)</li>
                <li>✅ Brand kit & website builder (paid)</li>
                <li>❌ No free high-res downloads</li>
                <li>❌ Subscription/paywall for full features</li>
              </ul>
              <a
                href="https://looka.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 px-6 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 dark:hover:bg-yellow-600 transition"
              >
                Visit Looka
              </a>
            </div>
          </div>
          {/* SEO/Keyword Section */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">LogoTweak vs Looka: Which Online Logo Generator is Best?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
              Looking for a <strong>Looka alternative</strong>? LogoTweak offers a free, open-source, and privacy-friendly way to make logos online—no sign up, no watermark, and instant downloads. Unlike Looka, all features are available for free, including SVG export and thousands of icons. Try LogoTweak as your next <strong>online logo generator</strong> and see why creators are switching from Looka, Canva, and other paid tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-semibold mb-2">LogoTweak Pros</h3>
                <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
                  <li>Completely free & open source</li>
                  <li>No watermark, no sign up</li>
                  <li>Full SVG, PNG, JPG export</li>
                  <li>Thousands of icons & gradients</li>
                  <li>Mobile friendly, dark mode</li>
                  <li>Privacy-first, no tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Looka Pros</h3>
                <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
                  <li>AI-powered logo suggestions</li>
                  <li>Brand kit & website builder</li>
                  <li>300+ templates for social & print</li>
                  <li>High-res files (with payment)</li>
                  <li>Easy to use, fast results</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">LogoTweak Cons</h3>
                <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
                  <li>Fewer brand kit templates</li>
                  <li>No built-in website builder</li>
                  <li>Community-driven support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Looka Cons</h3>
                <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
                  <li>Paywall for high-res/logo files</li>
                  <li>Subscription required for full features</li>
                  <li>Limited free downloads</li>
                  <li>Mixed reviews on logo originality</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <a
                href="/"
                className="inline-block bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-violet-700 transition text-lg"
              >
                Try LogoTweak Free – The Best Looka Alternative
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
