import type { ReactNode } from "react";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";

import type { BootstrapColorVariant, UIAttachment, UISize } from "@neverquest/types/ui";

export function LabelledProgressBar({
  attached,
  children,
  disableTransitions = false,
  isStriped = false,
  sibling = null,
  size = "normal",
  value,
  variant,
}: {
  attached?: UIAttachment;
  children: ReactNode;
  disableTransitions?: boolean;
  isStriped?: boolean;
  sibling?: ReactNode;
  size?: UISize;
  value: number;
  variant: BootstrapColorVariant;
}) {
  const isSizeNormal = size === "normal";
  const borderStyle: Partial<{
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    height: number;
  }> = isSizeNormal ? {} : { height: 10 };

  if (attached) {
    switch (attached) {
      case "above": {
        borderStyle.borderTopLeftRadius = 0;
        borderStyle.borderTopRightRadius = 0;
        break;
      }
      case "below": {
        borderStyle.borderBottomLeftRadius = 0;
        borderStyle.borderBottomRightRadius = 0;
        break;
      }
    }
  }

  const progressAppearance = isStriped ? { animated: true, striped: true } : {};

  return (
    <div
      className={`labelled-progress position-relative w-100${
        disableTransitions ? " no-transitions" : ""
      }`}
    >
      {isSizeNormal ? (
        <>
          <ProgressBar style={borderStyle}>
            <ProgressBar {...progressAppearance} key={1} now={value} variant={variant} />

            {sibling}
          </ProgressBar>

          <small className="position-absolute text-light top-50 start-50 translate-middle">
            {children}
          </small>
        </>
      ) : (
        <OverlayTrigger overlay={<Tooltip>{children}</Tooltip>} placement="bottom">
          <ProgressBar style={borderStyle}>
            <ProgressBar {...progressAppearance} key={1} now={value} variant={variant} />
          </ProgressBar>
        </OverlayTrigger>
      )}
    </div>
  );
}
