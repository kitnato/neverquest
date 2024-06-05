import { useState } from "preact/hooks"
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalTitle,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap"
import ReactMarkdown, { type ExtraProps } from "react-markdown"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import manual from "@neverquest/data/manual.md?raw"
import IconAbout from "@neverquest/icons/about.svg?react"
import { formatKebabCase } from "@neverquest/utilities/formatters"

import type { HTMLAttributes } from "preact/compat"

const HEADERS = ["h2", "h3", "h4", "h5", "h6"] as const

export function About() {
	const [isShowingModal, setIsShowingModal] = useState(false)

	return (
		<>
			<OverlayTrigger overlay={<Tooltip>About</Tooltip>} placement="bottom">
				<Button
					onClick={() => {
						setIsShowingModal(true)
					}}
					variant="outline-light"
				>
					<IconImage className="small" Icon={IconAbout} />
				</Button>
			</OverlayTrigger>

			<Modal
				onHide={() => {
					setIsShowingModal(false)

					window.history.replaceState(undefined, "", " ")
				}}
				show={isShowingModal}
				size="lg"
			>
				<ModalHeader closeButton>
					<ModalTitle>
						<IconDisplay Icon={IconAbout}>About</IconDisplay>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<ReactMarkdown
						components={{
							...Object.fromEntries(
								HEADERS.map(Current => [
									Current,
									({
										children,
										node: _,
										...properties
									}: ExtraProps & HTMLAttributes<HTMLHeadingElement>) => (
										<Current
											id={typeof children === "string" ? formatKebabCase(children) : undefined}
											{...properties}
										>
											{children}
										</Current>
									),
								]),
							),
							blockquote: ({ children }) =>
								<blockquote className="blockquote text-center">{children}</blockquote>
							,
						}}
					>
						{manual}
					</ReactMarkdown>
				</ModalBody>
			</Modal>
		</>
	)
}
