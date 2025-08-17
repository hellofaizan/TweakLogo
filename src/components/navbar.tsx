import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 border-b border-border bg-card text-foreground backdrop-blur-md fixed top-0 left-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logos/logo.png" alt="LogoTweak" width={32} height={32} className="rounded" />
        <span className="font-bold text-lg tracking-tight">LogoTweak</span>
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>

        <Link href="https://github.com/hellofaizan/tweaklofo" className="hover:text-primary transition-colors"><IconBrandGithub /></Link>
        <Link href="https://x.com/curiousfaizaan" className="hover:text-primary transition-colors"><IconBrandTwitter /></Link>
      </div>
    </nav>
  );
}
