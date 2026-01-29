interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  color?: "primary" | "secondary" | "danger";
}

export default function Button({ children, onClick, type="button", className="", color="primary" }: ButtonProps) {
  let bgColor = "#1E3A8A"; // primary
  if(color==="secondary") bgColor="#6B7280";
  if(color==="danger") bgColor="#DC2626";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  )
}
