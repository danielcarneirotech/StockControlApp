import "./Select.css";

export function Select({
  name,
  dataTestId,
  options,
  value,
  onChange,
  placeholder,
  required,
  id,
}: {
  name: string;
  dataTestId: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id: string;
}) {
  return (
    <select
      id={id}
      name={name}
      data-testid={dataTestId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select"
      required={required}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option
          data-testid={`option ${option.value}`}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
