import ImageIcon from "components/ImageIcon";
import icon from "icons/shattered-sword.svg";

export default function Scrap({ value }) {
  if (!value) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Scrap" />

      <span>{value}</span>
    </div>
  );
}
