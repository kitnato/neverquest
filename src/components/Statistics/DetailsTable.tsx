import { ReactNode } from "react";
import { Table } from "react-bootstrap";

export function DetailsTable({ children }: { children: ReactNode }) {
  return (
    <Table borderless className="m-0" size="sm">
      <tbody>{children}</tbody>
    </Table>
  );
}
