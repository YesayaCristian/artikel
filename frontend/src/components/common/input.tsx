interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function Input({ value, onChange, placeholder, className = "" }: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-primary rounded px-3 py-2 w-full focus:ring-2 focus:ring-primary ${className}`}
    />
  );
}
