type Form = {
  formAction: (payload: FormData) => void;
  centered?: boolean;
  errors?: string[];
  children: React.ReactNode;
};

export default function Form({
  formAction,
  centered = false,
  errors = [],
  children,
}: Form) {
  let formClass = "flex flex-col gap-2 w-full";
  if (centered) {
    formClass += " items-center";
  }
  return (
    <form className={formClass} action={formAction}>
      {errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      {children}
    </form>
  );
}
