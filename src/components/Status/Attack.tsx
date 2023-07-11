import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { WEAPON_NONE } from "@neverquest/data/inventory";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { ReactComponent as IconWeaponSpeed } from "@neverquest/icons/speed.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { attackRate, attackRateTotal, powerBonus } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Attack() {
  const attackRateValue = useRecoilValue(attackRate);
  const isShowingAttackRate = useRecoilValue(isShowing("attackRate"));
  const isShowingAttackRateDetails = useRecoilValue(isShowing("attackRateDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("speed"));
  const speedValue = useRecoilValue(rawAttributeStatistic("speed"));
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    atomDelta: deltas("attackRate"),
    atomValue: attackRateTotal,
    type: "time",
  });

  if (!isShowingAttackRate) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Attack rate details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${
                        weaponValue === WEAPON_NONE ? "Base" : "Weapon"
                      }:`}</td>

                      <td>
                        <IconImage Icon={IconWeaponAttackRate} size="tiny" />
                        &nbsp;{formatMilliseconds(weaponValue.rate)}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconWeaponSpeed} size="tiny" />
                        &nbsp;Speed:
                      </td>

                      <td>{`-${formatPercentage(speedValue, 0)}`}</td>
                    </tr>

                    {powerBonusValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatPercentage(powerBonusValue)}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total:</td>

                          <td>{`-${formatPercentage(attackRateValue)}`}</td>
                        </tr>
                      </>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingAttackRateDetails ? ["hover", "focus"] : []}
          >
            <div className="w-100">
              <AttackMeter />
            </div>
          </OverlayTrigger>

          <FloatingText deltaType="attackRate" />
        </Stack>
      }
      Icon={IconAttackRate}
      isAnimated
      tooltip="Attack rate"
    />
  );
}
