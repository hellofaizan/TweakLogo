import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | LogoTweak - Free Online Logo Generator",
  description: "Read the privacy policy for LogoTweak. No personal data collected, no tracking, no ads. 100% open source.",
};

export default function PrivacyPage() {
  return (
    <main className="h-full pt-12">
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Your privacy matters. LogoTweak is designed to respect your privacy and keep things simple:
        </p>
        <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200 mb-8">
          <li>No personal data is collected</li>
          <li>No tracking, analytics, or cookies</li>
          <li>No ads or third-party scripts</li>
          <li>All your designs stay on your device</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          LogoTweak is <a href="https://github.com/hellofaizan/TweakLogo" className="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">open source on GitHub</a>. You can review the code and contribute anytime.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          If you have questions or suggestions, feel free to <a href="https://github.com/hellofaizan/TweakLogo/issues" className="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">open an issue</a>.
        </p>
      </div>

      <Footer />
    </main>
  );
} 