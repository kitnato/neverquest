import type { ReactNode } from "react";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";

import type { BootstrapColorVariant, UIAttachment, UISize } from "@neverquest/types/ui";

export function LabelledProgressBar({
  attached,
  disableTransitions = false,
  isStriped = false,
  label,
  sibling = null,
  size = "normal",
  value,
  variant,
}: {
  attached?: UIAttachment;
  disableTransitions?: boolean;
  isStriped?: boolean;
  label: ReactNode;
  sibling?: ReactNode;
  size?: UISize;
  value: number;
  variant: BootstrapColorVariant;
}) {
  const isSizeNormal = size === "normal";
  const style: Partial<{
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    height: number;
  }> = isSizeNormal ? {} : { height: 10 };

  switch (attached) {
    case "above": {
      style.borderTopLeftRadius = 0;
      style.borderTopRightRadius = 0;
      break;
    }
    case "below": {
      style.borderBottomLeftRadius = 0;
      style.borderBottomRightRadius = 0;
      break;
    }
  }

  const progressAppearance = isStriped ? { animated: true, striped: true } : {};

  return (
    <div className={`position-relative w-100 ${disableTransitions ? "no-transitions" : ""}`}>
      {isSizeNormal ? (
        <>
          <ProgressBar style={style}>
            <ProgressBar {...progressAppearance} key={1} now={value} variant={variant} />

            {sibling}
          </ProgressBar>

          <small
            className="position-absolute text-light"
            style={{
              left: "50%",
              textShadow:
                "-1px 1px 1px #212529, 1px 1px 1px #212529, 1px -1px 1px #212529, -1px -1px 1px #212529",
              top: 0,
              transform: "translateX(-50%)",
              width: "max-content",
            }}
          >
            {label}
          </small>
        </>
      ) : (
        <OverlayTrigger overlay={<Tooltip>{label}</Tooltip>} placement="bottom">
          <ProgressBar style={style}>
            <ProgressBar {...progressAppearance} key={1} now={value} variant={variant} />
          </ProgressBar>
        </OverlayTrigger>
      )}
    </div>
  );
}
