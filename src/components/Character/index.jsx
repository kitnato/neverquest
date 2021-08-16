import Inventory from "components/Inventory";
import Status from "components/Character/Status";
import Stats from "components/Character/Stats";

export default function Character() {
  return (
    <div className="spaced">
      <Status />

      <Inventory />

      <Stats />
    </div>
  );
}
