import AttackButton from "components/Character/AttackButton";
import Attributes from "components/Character/Attributes";
import AttributesButton from "components/Character/AttributesButton";
import Status from "components/Character/Status";
import Inventory from "components/Inventory";
import InventoryButton from "components/Inventory/InventoryButton";

export default function Character() {
  return (
    <div className="spaced-vertical">
      <Status />

      <AttackButton />

      <Inventory />

      <InventoryButton />

      <Attributes />

      <AttributesButton />
    </div>
  );
}
