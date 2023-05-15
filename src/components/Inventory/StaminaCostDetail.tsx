import { useRecoilValue } from "recoil";

import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconStaminaCost } from "@neverquest/icons/stamina-cost.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function StaminaCostDetail({ cost }: { cost: number }) {
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));

  return (
    <tr>
      {isShowingStamina ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost:</td>

          <td>
            <IconStaminaCost className="inlay" />
            &nbsp;{cost}
          </td>
        </>
      ) : (
        <td className="text-end">{LABEL_UNKNOWN}</td>
      )}
    </tr>
  );
}
