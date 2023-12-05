type Table = {
  size?: "xs" | "sm" | "md" | "lg";
  border?: "border" | "border-2" | "border-4" | "border-8";
  pinRows?: boolean;
  pinColumns?: boolean;
  striped?: boolean;
  textAlignment?: "left" | "center" | "right";
  children: React.ReactNode;
};

export default function Table({
  size,
  border,
  pinRows,
  pinColumns,
  striped,
  textAlignment,
  children,
}: Table) {
  let tableClasses = "table";
  if (size) {
    tableClasses += ` table-${size}`;
  }
  if (border) {
    tableClasses += ` ${border} border-base-300`;
  }
  if (pinRows) {
    tableClasses += " table-pin-rows";
  }
  if (pinColumns) {
    tableClasses += " table-pin-columns";
  }
  if (striped) {
    tableClasses += " table-zebra";
  }
  if (textAlignment) {
    tableClasses += ` text-${textAlignment}`;
  }
  return (
    <div className="overflow-x-auto">
      <table className={tableClasses}>{children}</table>
    </div>
  );
}
