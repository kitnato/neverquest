import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBlock from "@neverquest/icons/block.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { blockChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Block() {
  const blockChanceValue = useRecoilValue(blockChance);
  const isShowingBlockChance = useRecoilValue(isShowing("blockChance"));
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const { burden } = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);

  const isEmpty =
    !isShowingBlockChance ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && !isTraitAcquiredColossus && weaponValue.grip === "two-handed");

  useDeltaText({
    delta: "blockChance",
    format: "percentage",
    state: blockChance,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBlock}
        tooltip="Total block chance"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
                          <span>On block:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                          <span>-{formatNumber({ value: burden })}</span>
                        </IconDisplay>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ format: "percentage", value: blockChanceValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="blockChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
