type TableCell = {
  type?: "th" | "td";
  border?: "border" | "border-2" | "border-4" | "border-8";
  children: React.ReactNode;
};

export default function TableCell({
  type = "td",
  border,
  children,
}: TableCell) {
  const Cell = type;
  let cellClasses = "";
  if (border) {
    cellClasses += ` ${border} border-base-300`;
  }
  return <Cell className={cellClasses}>{children}</Cell>;
}
