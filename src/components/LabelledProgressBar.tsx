import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";

import type { BootstrapColorVariant, UIAttachment, UISize } from "@neverquest/types/ui";

export function LabelledProgressBar({
  attached,
  disableTransitions = false,
  label,
  sibling = <></>,
  size = "normal",
  value,
  variant,
}: {
  attached?: UIAttachment;
  disableTransitions?: boolean;
  label: string;
  sibling?: JSX.Element;
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

  return (
    <div className={`position-relative w-100 ${disableTransitions ? "no-transitions" : ""}`}>
      {isSizeNormal ? (
        <>
          <ProgressBar style={style}>
            <ProgressBar key={1} now={value} variant={variant} />

            {sibling}
          </ProgressBar>

          <small
            className="position-absolute text-light"
            style={{
              right: "50%",
              textShadow:
                "-1px 1px 1px #212529, 1px 1px 1px #212529, 1px -1px 1px #212529, -1px -1px 1px #212529",
              top: 0,
              transform: "translateX(50%)",
            }}
          >
            {label}
          </small>
        </>
      ) : (
        <OverlayTrigger overlay={<Tooltip>{label}</Tooltip>} placement="bottom">
          <ProgressBar style={style}>
            <ProgressBar key={1} now={value} variant={variant} />

            {sibling}
          </ProgressBar>
        </OverlayTrigger>
      )}
    </div>
  );
}
