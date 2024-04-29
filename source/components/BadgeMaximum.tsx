import { Badge } from "react-bootstrap"

export function BadgeMaximum({ className }: { className?: string }) {
	return (
		<Badge bg="secondary" className={className}>
			<span>MAX</span>
		</Badge>
	)
}
