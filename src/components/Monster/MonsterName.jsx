import ImageIcon from "components/ImageIcon";
import icon from "icons/carnivore-mouth.svg";

export default function MonsterName() {
  // TODO - SLIM
  const name = "???";

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Monster" />

      <span>{name}</span>
    </div>
  );
}
