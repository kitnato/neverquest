import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/general";
import { SHIELD_NONE } from "@neverquest/data/inventory";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconProtection from "@neverquest/icons/protection.svg?react";
import IconTank from "@neverquest/icons/tank.svg?react";
import { armor, shield } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { protection } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Protection() {
  const armorValue = useRecoilValue(armor);
  const isShowingProtection = useRecoilValue(isShowing("protection"));
  const isTraitAcquiredTank = useRecoilValue(isTraitAcquired("tank"));
  const protectionValue = useRecoilValue(protection);
  const shieldValue = useRecoilValue(shield);
  const resetQuestProgressProtection = useResetRecoilState(questProgress("protection"));

  const progressQuest = useProgressQuest();

  const showDetails = isTraitAcquiredTank && shieldValue.name !== SHIELD_NONE.name;

  useDeltaText({
    delta: "protection",
    state: protection,
  });

  useEffect(() => {
    resetQuestProgressProtection();
    progressQuest({ amount: protectionValue, quest: "protection" });
  }, [progressQuest, protectionValue, resetQuestProgressProtection]);

  if (isShowingProtection) {
    return (
      <IconDisplay Icon={IconProtection} isAnimated tooltip="Total protection">
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Protection details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Armor:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconArmor} isSmall />

                          {formatNumber({ value: armorValue.protection })}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconTank} isSmall />
                          Tank:
                        </Stack>
                      </td>

                      <td>x2</td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={showDetails ? ["hover", "focus"] : []}
          >
            <span>{formatNumber({ value: protectionValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="protection" />
        </Stack>
      </IconDisplay>
    );
  }
}
