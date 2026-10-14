"use client";

import React from "react";
import { Zap } from "lucide-react";

interface BrandLogoProps {
  variant?: "light" | "dark";
  showInstaBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({
  variant = "light",
  showInstaBadge = true,
  size = "md",
}: BrandLogoProps) {
  const iconDimensions =
    size === "sm"
      ? "w-9 h-9"
      : size === "lg"
      ? "w-12 h-12"
      : "w-10 h-10 sm:w-11 sm:h-11";

  const titleClass =
    size === "sm"
      ? "text-base sm:text-lg"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-lg sm:text-xl";

  return (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* Custom Vector Shield + Medical Cross + Capsule + Spark Emblem */}
      <div
        className={`${iconDimensions} shrink-0 transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id="mbNavy" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1B3B6F" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="mbCyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00A8E8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="mbSpark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Split Shield Base */}
          <path
            d="M60 6 L16 21 V56 C16 85 35 105 60 115 V6 Z"
            fill="url(#mbNavy)"
          />
          <path
            d="M60 6 L104 21 V56 C104 85 85 105 60 115 V6 Z"
            fill="url(#mbCyan)"
          />

          {/* Inner Shield Frame */}
          <path
            d="M60 16 L26 28 V55 C26 78 40 94 60 103 C80 94 94 78 94 55 V28 L60 16 Z"
            fill="#FFFFFF"
          />

          {/* Split Medical Cross */}
          <path
            d="M49 33 H60 V83 H49 V68 H34 V48 H49 V33 Z"
            fill="#1B3B6F"
          />
          <path
            d="M60 33 H71 V48 H86 V68 H71 V83 H60 V33 Z"
            fill="#00A8E8"
          />

          {/* Diagonal Pill Capsule & Coral Spark */}
          <g transform="rotate(-35 60 58)">
            <rect
              x="43"
              y="47"
              width="34"
              height="22"
              rx="11"
              fill="#FFFFFF"
              stroke="#1B3B6F"
              strokeWidth="2.5"
            />
            <path
              d="M43 58 A11 11 0 0 1 54 47 H60 V69 H54 A11 11 0 0 1 43 58 Z"
              fill="#1B3B6F"
            />
            <path
              d="M60 47 H66 A11 11 0 0 1 77 58 A11 11 0 0 1 66 69 H60 V47 Z"
              fill="#00A8E8"
            />
          </g>
          <path
            d="M63 39 L48 60 H58 L54 78 L71 56 H61 L63 39 Z"
            fill="url(#mbSpark)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Wordmark & Subtitle */}
      <div>
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold ${titleClass} tracking-tight leading-none transition-colors ${
              variant === "dark"
                ? "text-white group-hover:text-[#38BDF8]"
                : "text-[#1B3B6F] group-hover:text-[#1D4ED8]"
            }`}
          >
            Maa Bhagwati
          </span>
          {showInstaBadge && (
            <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#FFF7ED] border border-[#FED7AA] text-[#EA580C] text-[10px] font-bold">
              <Zap className="w-2.5 h-2.5 fill-[#EA580C]" /> InstaPharma
            </span>
          )}
        </div>
        <div
          className={`text-[10px] font-bold tracking-[0.16em] mt-0.5 ${
            variant === "dark" ? "text-[#38BDF8]" : "text-[#00A8E8]"
          }`}
        >
          PHARMACEUTICALS
        </div>
      </div>
    </div>
  );
}
