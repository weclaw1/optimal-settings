import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import TableRow from "@/components/TableRow";

type SettingsTableProps = {
  settings: object;
};

export default function SettingsTable({ settings }: SettingsTableProps) {
  return (
    <Table striped>
      <TableBody>
        {Object.entries(settings).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell type="th">{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}