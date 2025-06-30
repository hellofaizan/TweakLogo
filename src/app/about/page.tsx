import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About | LogoTweak - Free Online Logo Generator",
  description: "Learn more about Mohammad Faizan (Hello Faizan), the full stack web and Android app developer behind LogoTweak. Discover his story, skills, and open-source mission.",
};

export default function AboutPage() {
  return (
    <main className="h-full pt-12">
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h1 className="text-4xl font-bold mb-6">About Mohammad Faizan (Hello Faizan)</h1>
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <Image
            src="/hellofaizan.png"
            height={100}
            width={100}
            alt="Mohammad Faizan (Hello Faizan)"
            className="rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Full Stack Web & App Developer</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Hi! I'm <a href="https://mohammadfaizan.in" className="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">Mohammad Faizan</a>, also known as <strong>Hello Faizan</strong>. I'm a passionate full stack developer specializing in both web and Android app development. I love building beautiful, fast, and user-friendly digital products that empower people and solve real-world problems.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              My journey started with curiosity for how things work on the web and mobile. Over the years, I've worked with a wide range of technologies from React, Next.js, and Node.js to Kotlin, Jetpack Compose, and Firebase. I enjoy turning ideas into reality, whether it's a SaaS platform, a creative tool, or a mobile app.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="https://github.com/hellofaizan" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400">GitHub</a>
              <a href="https://www.linkedin.com/in/hellofaizaan/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400">LinkedIn</a>
              <a href="https://x.com/hubulwattan" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400">Twitter</a>
              <a href="mailto:faizan@mohammadfaizan.in" className="underline text-blue-600 dark:text-blue-400">Email</a>
            </div>
          </div>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">🌍 Open Source & Community</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            I believe in the power of open source and love contributing to the community. LogoTweak is <a href="https://github.com/hellofaizan/TweakLogo" className="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">open source on GitHub</a>, contributions, feedback, and ideas are always welcome!
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">🚀 What Drives Me?</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Making design and development accessible to everyone</li>
            <li>Building tools that are simple, fast, and fun</li>
            <li>Learning new technologies and sharing knowledge</li>
            <li>Respecting user privacy, no tracking, no ads</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">🛠️ Skills & Technologies</h2>
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            <li>Frontend: React, Next.js, Tailwind CSS, TypeScript</li>
            <li>Backend: Node.js, Express, MongoDB, Firebase</li>
            <li>Android: Kotlin, Jetpack Compose, Material Design</li>
            <li>DevOps: Vercel, Netlify, GitHub Actions</li>
            <li>Design: Figma, Adobe XD, SVG, UI/UX</li>
          </ul>
        </section>
        <div className="mt-10 text-gray-700 dark:text-gray-300">
          <p>
            Want to collaborate or just say hi? <a href="mailto:faizan@mohammadfaizan.in" className="underline text-blue-600 dark:text-blue-400">Drop me an email</a> or connect on <a href="https://www.linkedin.com/in/hellofaizaan/" className="underline text-blue-600 dark:text-blue-400">LinkedIn</a>!
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
} 