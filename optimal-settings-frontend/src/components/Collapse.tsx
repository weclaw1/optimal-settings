type Collapse = {
  label: string;
  icon?: "arrow" | "plus";
  children: React.ReactNode;
};

export default function Collapse({ label, icon, children }: Collapse) {
  let collapseClasses = "collapse border border-base-300 bg-base-200";
  if (icon) {
    collapseClasses += ` collapse-${icon}`;
  }

  return (
    <div className={collapseClasses}>
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{label}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}
