type FormSelect = {
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: [string, string][]; // [value, text]
  errors?: string[];
};

export default function FormSelect({
  label,
  name,
  required,
  value,
  defaultValue,
  placeholder,
  onChange,
  options,
  errors,
}: FormSelect) {
  const isControlled = value !== undefined;

  let labelTextClasses = "label-text";
  if (required) {
    labelTextClasses += " after:content-['*'] after:text-error after:ml-1";
  }
  let selectClasses = "select select-bordered w-full max-w-md";
  if (errors && errors.length > 0) {
    selectClasses += " select-error";
  }

  let inputValue = undefined;
  let inputDefaultValue = undefined;
  if (isControlled) {
    if (value) {
      inputValue = value;
    } else if (placeholder) {
      inputValue = "";
    }
  } else {
    if (defaultValue) {
      inputDefaultValue = defaultValue;
    } else if (placeholder) {
      inputDefaultValue = "";
    }
  }

  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span className={labelTextClasses}>{label}</span>
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className={selectClasses}
        value={inputValue}
        defaultValue={inputDefaultValue}
        onChange={onChange}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      {errors &&
        errors.map((error) => (
          <p key={error} className="text-xs text-error">
            {error}
          </p>
        ))}
    </div>
  );
}
