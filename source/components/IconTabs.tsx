import { Nav, NavItem, NavLink, Stack, TabContainer, TabContent, TabPane } from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { capitalizeAll } from "@neverquest/utilities/formatters"

import type { TabsData } from "@neverquest/types/general"

export function IconTabs<TabLabel extends string>({
	activeKey,
	onSelect,
	tabs,
}: {
	activeKey?: TabLabel
	onSelect?: (key: TabLabel) => void
	tabs: TabsData<TabLabel>
}) {
	return (
		<TabContainer
			activeKey={activeKey}
			defaultActiveKey={tabs[0].label}
			onSelect={(key) => {
				if (onSelect !== undefined && key !== null) {
					onSelect(key as TabLabel)
				}
			}}
		>
			<Stack gap={1}>
				<Nav justify variant="pills">
					{tabs.map(({ Icon, label }) => (
						<NavItem key={label}>
							<NavLink className="d-flex justify-content-center" eventKey={label}>
								<IconDisplay Icon={Icon}>
									<span>{capitalizeAll(label)}</span>
								</IconDisplay>
							</NavLink>
						</NavItem>
					))}
				</Nav>

				<hr />

				<TabContent>
					{tabs.map(({ Component, label }) => (
						<TabPane eventKey={label} key={label}>
							<Component />
						</TabPane>
					))}
				</TabContent>
			</Stack>
		</TabContainer>
	)
}
