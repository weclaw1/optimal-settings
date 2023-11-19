type FormTextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: string[];
};

export default function FormTextarea({
  label,
  name,
  placeholder,
  value,
  required,
  onChange,
  errors,
}: FormTextareaProps) {
  let labelTextClasses = "label-text";
  if (required) {
    labelTextClasses += " after:content-['*'] after:text-error after:ml-1";
  }
  let textareaClasses = "textarea textarea-bordered w-full max-w-md";
  if (errors && errors.length > 0) {
    textareaClasses += " textarea-error";
  }
  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span className={labelTextClasses}>{label}</span>
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={textareaClasses}
        value={value}
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
