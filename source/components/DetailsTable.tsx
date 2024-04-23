import { Table } from "react-bootstrap"

import type { ReactNode } from "react"

export function DetailsTable({ children }: { children: ReactNode }) {
	return (
		<Table borderless className="m-0 table-details" size="sm">
			<tbody>{children}</tbody>
		</Table>
	)
}
