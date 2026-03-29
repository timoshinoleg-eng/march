"use client";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const sizeStyles = {
    sm: { width: "2rem", height: "2rem" },
    md: { width: "2.5rem", height: "2.5rem" },
    lg: { width: "3.5rem", height: "3.5rem" },
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`} style={sizeStyles[size]}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ChatBot24 Logo"
      >
        <defs>
          {/* Gradients for 4 spheres */}
          <radialGradient id="sphere1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </radialGradient>
          <radialGradient id="sphere2" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </radialGradient>
          <radialGradient id="sphere3" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
          <radialGradient id="sphere4" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </radialGradient>
          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* 4 spheres in clover pattern */}
        <g filter="url(#shadow)">
          {/* Top-left */}
          <circle cx="32" cy="32" r="26" fill="url(#sphere1)" opacity="0.95" />
          {/* Top-right */}
          <circle cx="68" cy="32" r="26" fill="url(#sphere2)" opacity="0.95" />
          {/* Bottom-left */}
          <circle cx="32" cy="68" r="26" fill="url(#sphere3)" opacity="0.95" />
          {/* Bottom-right */}
          <circle cx="68" cy="68" r="26" fill="url(#sphere4)" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}
