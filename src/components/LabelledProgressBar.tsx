import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";

import { UIAttachment, UISize, UIVariant } from "@neverquest/types/ui";

export default function ({
  attached,
  disableTransitions = false,
  label,
  size = UISize.Normal,
  value,
  variant,
}: {
  attached?: UIAttachment;
  disableTransitions?: boolean;
  label: string;
  size?: UISize;
  value: number;
  variant: UIVariant;
}) {
  const style: Partial<{
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    height: number;
  }> = size === UISize.Tiny ? { height: 10 } : {};

  switch (attached) {
    case UIAttachment.Above: {
      style.borderTopLeftRadius = 0;
      style.borderTopRightRadius = 0;
      break;
    }
    case UIAttachment.Below: {
      style.borderBottomLeftRadius = 0;
      style.borderBottomRightRadius = 0;
      break;
    }
  }

  return (
    <div className={`position-relative w-100 ${disableTransitions ? "no-transitions" : ""}`}>
      {size === UISize.Normal && (
        <>
          <ProgressBar now={value} style={style} variant={variant} />

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
      )}

      {size === UISize.Tiny && (
        <OverlayTrigger overlay={<Tooltip>{label}</Tooltip>} placement="bottom">
          <ProgressBar now={value} style={style} variant={variant} />
        </OverlayTrigger>
      )}
    </div>
  );
}
