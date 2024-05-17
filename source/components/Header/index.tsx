import { Badge, Container, Nav, Navbar, NavbarBrand, Stack } from "react-bootstrap"

import { About } from "@neverquest/components/Header/About"
import { ImportExport } from "@neverquest/components/Header/ImportExport"
import { Ouroboros } from "@neverquest/components/Header/Ouroboros"
import { Repository } from "@neverquest/components/Header/Repository"
import { Reset } from "@neverquest/components/Header/Reset"
import { version } from "@neverquest/configuration"

export function Header() {
	return (
		<Navbar bg="dark" className="mb-4" collapseOnSelect expand="lg" variant="dark">
			<Container>
				<Stack direction="horizontal" gap={3}>
					<Ouroboros />

					<div>
						<NavbarBrand>neverquest</NavbarBrand>

						<Badge bg="light" text="dark">
							v
							{version}
						</Badge>
					</div>
				</Stack>

				<Nav>
					<Stack direction="horizontal" gap={3}>
						<About />

						<Repository />

						<div className="text-white vr" />

						<ImportExport />

						<Reset />
					</Stack>
				</Nav>
			</Container>
		</Navbar>
	)
}
