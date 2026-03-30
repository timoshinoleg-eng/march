"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 48,
  };

  return (
    <div className={`relative ${className}`} style={{ width: sizes[size], height: sizes[size] }}>
      <Image
        src="/favicon.png"
        alt="ChatBot24"
        width={sizes[size]}
        height={sizes[size]}
        className="rounded-lg"
        priority
      />
    </div>
  );
}
