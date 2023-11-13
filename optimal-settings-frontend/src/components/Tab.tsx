type TabProps = {
  label: string;
  type?: "bordered" | "lifted";
  size?: "xs" | "sm" | "md" | "lg";
  active?: boolean;
  onClick: () => void;
};

export default function Tab({ label, type, size, active, onClick }: TabProps) {
  let tabClasses = "tab";
  if (type) {
    tabClasses += ` tab-${type}`;
  }
  if (size) {
    tabClasses += ` tab-${size}`;
  }
  if (active) {
    tabClasses += " tab-active";
  }
  return (
    <a className={tabClasses} onClick={onClick}>
      {label}
    </a>
  );
}
