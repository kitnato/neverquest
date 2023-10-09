import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconStrength } from "@neverquest/icons/strength.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { weapon } from "@neverquest/state/items";
import { attributePowerBonus, damageTotal } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Damage() {
  const strengthPowerBonus = useRecoilValue(attributePowerBonus("strength"));
  const strength = useRecoilValue(attributeStatistic("strength"));
  const damageTotalValue = useRecoilValue(damageTotal);
  const isShowingDamageDetails = useRecoilValue(isShowing("damageDetails"));
  const { damage: weaponDamage, gems } = useRecoilValue(weapon);

  const appliedGems = gems.length;

  useDeltaText({
    delta: deltas("damage"),
    value: damageTotal,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Total damage details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconWeaponDamage} size="small" />

                          {formatValue({ value: weaponDamage })}
                        </Stack>
                      </td>
                    </tr>

                    {appliedGems > 0 && <ElementalDetails slot="weapon" />}

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconStrength} size="small" />
                          Strength:
                        </Stack>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          {`+${formatValue({ value: strength })}`}

                          {strengthPowerBonus > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} size="small" />

                              {`+${formatValue({
                                format: "percentage",
                                value: strengthPowerBonus,
                              })}`}
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingDamageDetails ? ["hover", "focus"] : []}
          >
            <span>{damageTotalValue}</span>
          </OverlayTrigger>

          <FloatingText delta="damage" />
        </Stack>
      }
      description={<DamagePerSecond />}
      Icon={IconDamage}
      tooltip="Total damage"
    />
  );
}
