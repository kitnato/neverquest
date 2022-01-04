import ProgressBar from "react-bootstrap/ProgressBar";

export default function Progress({
  attached,
  label,
  size = "normal",
  value,
  variant,
}) {
  const style = size === "tiny" ? { height: 10 } : {};

  switch (attached) {
    case "above":
      style.borderTopLeftRadius = 0;
      style.borderTopRightRadius = 0;
      break;
    case "below":
      style.borderBottomLeftRadius = 0;
      style.borderBottomRightRadius = 0;
      break;
    default:
      break;
  }

  return (
    <div className="position-relative w-100">
      <ProgressBar now={value} style={style} variant={variant} />

      {size === "normal" && (
        <small
          className="position-absolute text-light"
          style={{
            letterSpacing: 1,
            right: "50%",
            textShadow:
              "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
            top: 0,
            transform: "translateX(50%)",
          }}
        >
          {label}
        </small>
      )}
    </div>
  );
}
