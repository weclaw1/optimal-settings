import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import TableRow from "@/components/TableRow";

type SettingsTable = {
  settings: [string, string][];
};

export default function SettingsTable({ settings }: SettingsTable) {
  return (
    <Table striped border="border" tableLayout="fixed">
      <TableBody>
        {settings.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell type="th" border="border">
              {key}
            </TableCell>
            <TableCell border="border">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
