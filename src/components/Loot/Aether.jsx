import ImageIcon from "components/ImageIcon";
import aetherIcon from "icons/incense.svg";

export default function Aether({ value }) {
  if (!value) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={aetherIcon} tooltip="Aether" />

      <span>{value}</span>
    </div>
  );
}
