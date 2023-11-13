type TableCellProps = {
  type?: "th" | "td";
  children: React.ReactNode;
};

export default function TableCell({ type = "td", children }: TableCellProps) {
  const Cell = type;
  return <Cell>{children}</Cell>;
}
