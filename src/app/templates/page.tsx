import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Templates | LogoTweak - Free Online Logo Generator",
  description: "Browse logo templates on LogoTweak. Start with a template and customize your logo online instantly. More templates coming soon!",
};

export default function TemplatesPage() {
  return (
    <main className="h-full pt-12">
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h1 className="text-4xl font-bold mb-6">Logo Templates</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          Kickstart your logo design with ready-made templates! Choose a template, customize it, and download your logo in seconds.
        </p>
        <div className="mb-8">
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-gray-500 dark:text-gray-400">
            <span className="block text-xl mb-2">🚧</span>
            <span>Templates are coming soon! Stay tuned for a growing collection of beautiful, customizable logo templates.</span>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Want to contribute a template? <a href="https://github.com/hellofaizan/TweakLogo" className="underline text-blue-600 dark:text-blue-400">Open a pull request on GitHub</a>!
        </p>
      </div>

      <Footer />
    </main>
  );
} 