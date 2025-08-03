import Link from "next/link";
import React from "react";

export default function Branding() {
  return (
    <Link href="https://mohammadfaizan.com" target="_blank" className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg w-max bottom-5 left-5 shadow-2xl bg-card">
        <span>App by Mohammad Faizan</span>
    </Link>
  );
}
