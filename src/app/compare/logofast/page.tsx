import { IconBolt } from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "LogoTweak vs LogoFa.st: Best LogoFa.st Alternative | Free Online Logo Generator",
  description:
    "Compare LogoTweak and LogoFa.st. See why LogoTweak is the best free alternative to LogoFa.st for fast, beautiful, and customizable logo design online.",
};

export default function CompareLandingPage() {
  return (
    <main className="h-full pt-12">
      <div className="w-full py-12 px-4 pt-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            LogoTweak Vs LogoFa.st
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
            {/* LogoFa.st Card */}
            <div className="rounded-2xl border border-gray-300 dark:border-gray-700 p-8 shadow flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-800 p-2">
                  <IconBolt size={24} />
                </span>
                <span className="text-xl font-semibold">LogoFa.st</span>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Generate simple logos online. Fast and free, but with limited
                customization and export options.
              </p>
              <ul className="mb-6 space-y-2 text-gray-800 dark:text-gray-200">
                <li>✅ Free to use</li>
                <li>✅ Fast logo creation</li>
                <li>✅ PNG, SVG export</li>
                <li>❌ Limited icon selection</li>
                <li>❌ No gradients or advanced backgrounds</li>
                <li>❌ No open source</li>
              </ul>
              <a
                href="https://logofa.st/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Visit LogoFa.st
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
