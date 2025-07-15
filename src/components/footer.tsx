"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white bottom-0 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Create Your Logo?
        </h2>
        <p className="text-xl max-w-2xl mx-auto">
          Join thousands of users who trust LogoTweak for their logo design
          needs. Start creating your professional logo today!
        </p>
        <div className="flex gap-2 w-full items-center justify-center mb-8 mt-2">
          <Link
            href="https://x.com/mofaizandev"
            target="_blank"
            className="text-white"
          >
            <IconBrandTwitter size={28} />
          </Link>
          <Link
            href="https://github.com/mofaizandev"
            target="_blank"
            className="text-white"
          >
            <IconBrandGithub size={28} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/hellofaizaan/"
            target="_blank"
            className="text-white"
          >
            <IconBrandLinkedin size={28} />
          </Link>
        </div>
        <Button
          onClick={() => (window.location.href = "/")}
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
        >
          Start Creating Now
        </Button>
      </div>
    </section>
  );
}
