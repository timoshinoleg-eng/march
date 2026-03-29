"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton({ href = "/blog", label = "Все статьи" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-6"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
