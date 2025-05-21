import React from "react";

interface LogoProps {
  variant?: "default" | "light";
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "medium",
  showText = true,
}) => {
  const textColor = variant === "light" ? "text-cream-50" : "text-brown-800";

  const sizeClasses = {
    small: "text-lg md:text-xl",
    medium: "text-2xl md:text-3xl",
    large: "text-4xl md:text-5xl",
  };

  const iconSize = {
    small: 48,
    medium: 72,
    large: 100,
  };

  return (
    <div
      className={`flex items-center font-display font-semibold gap-4 ${textColor} ${sizeClasses[size]}`}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-cream-50`}
        style={{ width: iconSize[size], height: iconSize[size] }}
      >
        <img
          src="/icon.svg"
          alt="A Carpinteira Logo"
          className="object-cover w-full h-full rounded-full"
        />
      </span>
      {showText && (
        <span style={{ fontFamily: "serif", letterSpacing: 1 }}>
          A Carpinteira
        </span>
      )}
    </div>
  );
};

export default Logo;
