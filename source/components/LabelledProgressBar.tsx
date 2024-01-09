import type { ReactNode } from "react";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";

import type { BootstrapColorVariant, UIAttachment } from "@neverquest/types/ui";

export function LabelledProgressBar({
  attachment,
  children,
  disableTransitions = false,
  isSmall = false,
  isStriped = false,
  sibling,
  value,
  variant,
}: {
  attachment?: UIAttachment;
  children: ReactNode;
  disableTransitions?: boolean;
  isSmall?: boolean;
  isStriped?: boolean;
  sibling?: ReactNode;
  value: number;
  variant: BootstrapColorVariant;
}) {
  const progressAppearance = isStriped ? { animated: true, striped: true } : {};

  return (
    <div
      className={`progress-labelled w-100${isSmall ? "" : " position-relative"}${
        disableTransitions ? " transitions-none" : ""
      }`}
    >
      {isSmall ? (
        <OverlayTrigger overlay={<Tooltip>{children}</Tooltip>} placement="bottom">
          <ProgressBar className={`small${attachment ? ` attached-${attachment}` : ""}`}>
            <ProgressBar {...progressAppearance} key={1} now={value} variant={variant} />
          </ProgressBar>
        </OverlayTrigger>
      ) : (
        <>
          <ProgressBar className={attachment ? `attached-${attachment}` : undefined}>
            <ProgressBar {...progressAppearance} key={1} now={value} variant={variant} />

            {sibling}
          </ProgressBar>

          <div className="position-absolute small text-light top-50 start-50 translate-middle">
            {children}
          </div>
        </>
      )}
    </div>
  );
}
