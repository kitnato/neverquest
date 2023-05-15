import { useRecoilValue } from "recoil";

import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/constants";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { isShowingGearLevel } from "@neverquest/state/settings";

export function GearLevelDetail({ level }: { level: number }) {
  const isShowingGearLevelValue = useRecoilValue(isShowingGearLevel);

  if (!isShowingGearLevelValue) {
    return null;
  }

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>Gear level:</td>

      <td>
        <IconGearLevel className="inlay" />
        &nbsp;{level}
      </td>
    </tr>
  );
}
