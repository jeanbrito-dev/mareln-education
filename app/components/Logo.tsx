import React from "react";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { icon: "w-8 h-8", name: "text-lg", badge: "text-[9px] px-1.5 py-0.5", sub: "text-[10px]" },
  md: { icon: "w-10 h-10", name: "text-xl", badge: "text-[10px] px-1.5 py-0.5", sub: "text-[11px]" },
  lg: { icon: "w-16 h-16", name: "text-3xl", badge: "text-xs px-2 py-1", sub: "text-xs" },
} as const;

export default function Logo({
  variant = "horizontal",
  theme = "light",
  size = "md",
}: LogoProps) {
  const s = SIZE_MAP[size];

  const textColor = theme === "light" ? "text-white" : "text-[#26364A]";
  const subtextColor = theme === "light" ? "text-[#DCEEFF]/80" : "text-[#5B7089]";
  const badgeBg = theme === "light" ? "bg-white/15" : "bg-[#EAF4FC]";
  const badgeText = theme === "light" ? "text-white" : "text-[#5B8DEF]";

  const ShieldIcon = (
    <div className={`${s.icon} relative flex-shrink-0`}>
      <img
        src="/logo.png"
        alt="Maré LN"
        className="w-full h-full object-contain"
      />
    </div>
  );

  const Wordmark = (
    <div className="flex items-center gap-2">
      <span className={`${s.name} font-extrabold tracking-tight ${textColor} leading-none`}>
        MARÉ LN
      </span>
      <span className={`${s.badge} font-bold ${badgeText} ${badgeBg} rounded leading-none`}>
        Educa+
      </span>
    </div>
  );

  if (variant === "icon") {
    return ShieldIcon;
  }

  if (variant === "vertical") {
    return (
      <div className="flex flex-col items-center text-center gap-3">
        {ShieldIcon}
        <div className="flex flex-col items-center gap-1.5">
          {Wordmark}
          <span className={`${s.sub} ${subtextColor} font-medium tracking-wide`}>
            Levando você a descobrir o litoral
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {ShieldIcon}
      <div className="flex flex-col gap-0.5">
        {Wordmark}
        <span className={`${s.sub} ${subtextColor} font-medium tracking-wide`}>
          Levando você a descobrir o litoral
        </span>
      </div>
    </div>
  );
}