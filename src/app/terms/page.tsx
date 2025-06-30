import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | LogoTweak - Free Online Logo Generator",
  description: "Read the terms of service for LogoTweak. Free, open-source, and provided as-is. Users are responsible for their own designs.",
};

export default function TermsPage() {
  return (
    <main className="h-full pt-12">
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          By using LogoTweak, you agree to these simple terms:
        </p>
        <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200 mb-8">
          <li>LogoTweak is free and open source</li>
          <li>Service is provided as-is, with no warranties</li>
          <li>You are responsible for your own designs and their use</li>
          <li>No liability for any damages or losses</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          LogoTweak is <a href="https://github.com/hellofaizan/TweakLogo" className="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">open source on GitHub</a>. Please review the code and contribute if you like!
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          If you have questions or suggestions, feel free to <a href="https://github.com/hellofaizan/TweakLogo/issues" className="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">open an issue</a>.
        </p>
      </div>

      
      <Footer />
    </main>
  );
} 