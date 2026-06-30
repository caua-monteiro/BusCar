import "./Input.css";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  ...props
}) {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}