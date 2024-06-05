import { Table } from "react-bootstrap"

import type { ComponentChildren } from "preact"

export function DetailsTable({ children }: { children: ComponentChildren }) {
	return (
		<Table borderless size="sm">
			<tbody>{children}</tbody>
		</Table>
	)
}
