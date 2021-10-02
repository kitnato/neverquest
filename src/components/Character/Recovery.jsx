import ImageIcon from "components/ImageIcon";
import RecoveryMeter from "components/Character/RecoveryMeter";
import icon from "icons/knockout.svg";

export default function Recovery() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />
    </div>
  );
}
