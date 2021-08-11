import WithIcon from "components/WithIcon";
import damageIcon from "icons/wolverine-claws.svg";

export default function MonsterDamage({ damagePerHit }) {
  return (
    <WithIcon icon={damageIcon} alt="Monster damage">
      {damagePerHit.min}-{damagePerHit.max}
    </WithIcon>
  );
}
