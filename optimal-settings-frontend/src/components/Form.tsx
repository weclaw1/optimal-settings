type FormProps = {
  formAction: (payload: FormData) => void;
  centered?: boolean;
  children: React.ReactNode;
};

export default function Form({
  formAction,
  centered = false,
  children,
}: FormProps) {
  let formClass = "flex flex-col gap-2 w-full";
  if (centered) {
    formClass += " items-center";
  }
  return (
    <form className={formClass} action={formAction}>
      {children}
    </form>
  );
}
