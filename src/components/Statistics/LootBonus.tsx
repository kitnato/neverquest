import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconLootBonus } from "@neverquest/icons/loot-bonus.svg";
import { ReactComponent as IconLuck } from "@neverquest/icons/luck.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { hasItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { lootBonus, powerBonus } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function LootBonus() {
  const hasAntiqueCoin = useRecoilValue(hasItem("antique coin"));
  const isShowingLootBonus = useRecoilValue(isShowing("lootBonus"));
  const isShowingLootBonusDetails = useRecoilValue(isShowing("lootBonusDetails"));
  const lootBonusValue = useRecoilValue(lootBonus);
  const powerBonusValue = useRecoilValue(powerBonus("luck"));
  const luckValue = useRecoilValue(rawAttributeStatistic("luck"));

  useDeltaText({
    atomDelta: deltas("lootBonus"),
    atomValue: lootBonus,
    type: "percentage",
  });

  if (!isShowingLootBonus) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Loot bonus details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Luck:</td>

                      <td>
                        <IconImage Icon={IconLuck} size="tiny" />
                        &nbsp;{`+${formatPercentage(luckValue, 0)}`}
                      </td>
                    </tr>

                    {powerBonusValue > 0 && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Empowered:</td>

                        <td>
                          <IconImage Icon={IconPower} size="tiny" />
                          &nbsp;{`+${formatPercentage(powerBonusValue, 0)}`}
                        </td>
                      </tr>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingLootBonusDetails ? ["hover", "focus"] : []}
          >
            <span>{hasAntiqueCoin ? `+${formatPercentage(lootBonusValue)}` : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="lootBonus" />
        </Stack>
      }
      Icon={IconLootBonus}
      isAnimated
      tooltip="Loot bonus"
    />
  );
}
