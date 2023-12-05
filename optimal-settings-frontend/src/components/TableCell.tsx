type TableCell = {
  type?: "th" | "td";
  children: React.ReactNode;
};

export default function TableCell({ type = "td", children }: TableCell) {
  const Cell = type;
  return <Cell>{children}</Cell>;
}
