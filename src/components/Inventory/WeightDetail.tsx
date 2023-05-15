import { useRecoilValue } from "recoil";

import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { hasKnapsack } from "@neverquest/state/inventory";

export function WeightDetail({ weight }: { weight: number }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);

  return (
    <tr>
      {hasKnapsackValue ? (
        <>
          <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

          <td>
            <IconEncumbrance className="inlay" />
            &nbsp;{weight}
          </td>
        </>
      ) : (
        <td className="text-end">{LABEL_UNKNOWN}</td>
      )}
    </tr>
  );
}
