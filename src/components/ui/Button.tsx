import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "btn focus:outline-none transition-all duration-200 font-semibold";
  const variantClasses = {
    primary:
      "bg-brown-800 text-cream-50 rounded-full shadow-md hover:bg-brown-700 active:scale-95 active:opacity-90 border-2 border-brown-900 backdrop-blur-sm",
    secondary: "bg-brown-700 text-cream-50 rounded-full hover:bg-brown-600",
    outline:
      "border-2 border-brown-800 text-cream-50 rounded-full bg-transparent hover:bg-brown-800 hover:text-cream-50 active:scale-95 active:opacity-90",
  }[variant];

  const sizeClasses = {
    small: "text-sm px-4 py-2",
    medium: "text-base px-6 py-3",
    large: "text-lg px-8 py-4 sm:text-lg sm:px-8 sm:py-4 text-base px-4 py-3",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
