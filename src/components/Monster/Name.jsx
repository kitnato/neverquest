import WithIcon from "components/WithIcon";
import monsterIcon from "icons/carnivore-mouth.svg";

export default function MonsterName() {
  // TODO - SLIM
  const name = "???";

  return (
    <WithIcon icon={monsterIcon} alt="Monster name">
      {name}
    </WithIcon>
  );
}
