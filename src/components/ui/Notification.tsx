import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Notification({
  message,
  type,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Notification disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  let bgColor = "";
  let textColor = "";

  switch (type) {
    case "success":
      bgColor = "bg-green-600";
      textColor = "text-white";
      break;
    case "error":
      bgColor = "bg-red-600";
      textColor = "text-white";
      break;
    case "info":
      bgColor = "bg-blue-600";
      textColor = "text-white";
      break;
    default:
      bgColor = "bg-gray-800";
      textColor = "text-white";
  }

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${bgColor} ${textColor} transition-opacity duration-300`}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-lg font-bold"
      >
        &times;
      </button>
    </div>
  );
}
