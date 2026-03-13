"use client";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ChatBot24 Logo"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488">
              <animate
                attributeName="stop-color"
                values="#0d9488;#14b8a6;#2dd4bf;#14b8a6;#0d9488"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#2dd4bf">
              <animate
                attributeName="stop-color"
                values="#2dd4bf;#14b8a6;#0d9488;#14b8a6;#2dd4bf"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="20" fill="url(#logoGradient)" />
        <text
          x="50"
          y="70"
          fontSize="55"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          C
        </text>
      </svg>
    </div>
  );
}
