type TableRowProps = {
  highlightOnHover?: boolean;
  children: React.ReactNode;
};

export default function TableRow({ highlightOnHover = false, children }: TableRowProps) {
  return (
    <tr className={highlightOnHover ? 'hover' : undefined}>
      {children}
    </tr>
  );
}