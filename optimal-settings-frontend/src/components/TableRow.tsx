type TableRow = {
  highlightOnHover?: boolean;
  children: React.ReactNode;
};

export default function TableRow({
  highlightOnHover = false,
  children,
}: TableRow) {
  return <tr className={highlightOnHover ? "hover" : undefined}>{children}</tr>;
}
