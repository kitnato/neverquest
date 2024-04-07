import type { ReactNode } from "react"

export function CenterScreen({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<span className={`position-absolute top-50 start-50 translate-middle${className ?? ""}`}>
			{children}
		</span>
	)
}
