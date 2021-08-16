import ImageIcon from "components/ImageIcon";
import icon from "icons/wolverine-claws.svg";

export default function MonsterDamage({ damagePerHit }) {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Monster damage" />

      <span>
        {damagePerHit.min}-{damagePerHit.max}
      </span>
    </div>
  );
}
