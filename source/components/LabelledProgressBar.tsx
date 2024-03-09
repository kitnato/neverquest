import type { ReactNode } from "react";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";

import type { BootstrapColorVariant, UIAttachment } from "@neverquest/types/ui";

export function LabelledProgressBar({
  attachment,
  children,
  disableTransitions = false,
  isSmall = false,
  sibling,
  striping,
  value,
  variant = "dark",
}: {
  attachment?: UIAttachment;
  children: ReactNode;
  disableTransitions?: boolean;
  isSmall?: boolean;
  sibling?: ReactNode;
  striping?: Partial<{ animated: boolean; striped: boolean }>;
  value: number;
  variant?: BootstrapColorVariant;
}) {
  const appearance = {
    animated: striping?.animated ?? false,
    striped: striping?.striped ?? false,
  };

  return (
    <div
      className={`progress-labelled w-100${isSmall ? "" : " position-relative"}${
        disableTransitions ? " transitions-none" : ""
      }`}
    >
      {isSmall ? (
        <OverlayTrigger overlay={<Tooltip>{children}</Tooltip>} placement="bottom">
          <ProgressBar className={`small${attachment ? ` attached-${attachment}` : ""}`}>
            <ProgressBar {...appearance} now={value} variant={variant} />
          </ProgressBar>
        </OverlayTrigger>
      ) : (
        <>
          <ProgressBar className={attachment ? `attached-${attachment}` : undefined}>
            <ProgressBar {...appearance} now={value} variant={variant} />

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
