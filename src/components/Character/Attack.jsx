import ImageIcon from "components/ImageIcon";
import AttackMeter from "components/Character/AttackMeter";
import attackIcon from "icons/tron-arrow.svg";

export default function Attack() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={attackIcon} tooltip="Attack rate" />

      <AttackMeter />
    </div>
  );
}
