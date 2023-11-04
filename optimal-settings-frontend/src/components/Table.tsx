type TableProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pinRows?: boolean;
  pinColumns?: boolean;
  striped?: boolean;
  children: React.ReactNode;
};

export default function Table({ size, pinRows, pinColumns, striped, children }: TableProps) {
  let tableClasses = 'table';
  if (size) {
    tableClasses += ` table-${size}`;
  }
  if (pinRows) {
    tableClasses += ' table-pin-rows';
  }
  if (pinColumns) {
    tableClasses += ' table-pin-columns';
  }
  if (striped) {
    tableClasses += ' table-zebra';
  }
  return (
    <div className="overflow-x-auto">
      <table className={tableClasses}>
        {children}
      </table>
    </div>
  );
}