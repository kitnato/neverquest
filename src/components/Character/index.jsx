import AttackButton from "components/Character/AttackButton";
import CharacterButton from "components/Character/CharacterButton";
import Inventory from "components/Inventory";
import InventoryButton from "components/Inventory/InventoryButton";
import Status from "components/Character/Status";
import Stats from "components/Character/Stats";

export default function Character() {
  return (
    <div className="spaced-vertical">
      <Status />

      <AttackButton />

      <Inventory />

      <InventoryButton />

      <Stats />

      <CharacterButton />
    </div>
  );
}
