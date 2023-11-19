import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  title: string;
};

export default function FormSubmitButton({ title }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary my-2 max-w-md"
      aria-disabled={pending}
    >
      {title}
    </button>
  );
}
