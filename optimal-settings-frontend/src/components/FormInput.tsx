type FormInputProps = {
  label: string;
  name: string;
  type: "text" | "number";
  value?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
};

export default function FormInput({
  label,
  name,
  type,
  value,
  required,
  placeholder,
  min,
  max,
  step,
  pattern,
  onChange,
  errors,
}: FormInputProps) {
  let labelTextClasses = "label-text";
  if (required) {
    labelTextClasses += " after:content-['*'] after:text-error after:ml-1";
  }
  let inputClasses = "input input-bordered w-full max-w-md";
  if (errors && errors.length > 0) {
    inputClasses += " input-error";
  }

  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span className={labelTextClasses}>{label}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        min={min}
        max={max}
        step={step}
        pattern={pattern}
        onChange={onChange}
      />
      {errors &&
        errors.map((error) => (
          <p key={error} className="text-xs text-error">
            {error}
          </p>
        ))}
    </div>
  );
}
