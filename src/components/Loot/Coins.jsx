import ImageIcon from "components/ImageIcon";
import coinsIcon from "icons/two-coins.svg";

export default function Coins({ value }) {
  if (!value) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={coinsIcon} tooltip="Coins" />

      <span>{value}</span>
    </div>
  );
}
