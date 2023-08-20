import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { ELEMENTALS } from "@neverquest/data/inventory";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconStrength } from "@neverquest/icons/strength.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon, weaponDamageElemental } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { damage, damageTotal, powerBonus } from "@neverquest/state/statistics";
import type { ShardItem } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function Damage() {
  const damageValue = useRecoilValue(damage);
  const damageTotalValue = useRecoilValue(damageTotal);
  const isShowingDamageDetails = useRecoilValue(isShowing("damageDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("strength"));
  const strengthValue = useRecoilValue(rawAttributeStatistic("strength"));
  const { damage: weaponDamage, shards } = useRecoilValue(weapon);
  const weaponDamageElementalValue = useRecoilValue(weaponDamageElemental);

  const appliedShards = shards.length;

  useDeltaText({
    atomDelta: deltas("damage"),
    atomValue: damageTotal,
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
                        <IconImage Icon={IconWeaponDamage} size="tiny" />
                        &nbsp;{weaponDamage}
                      </td>
                    </tr>

                    {appliedShards > 0 && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Shards:</td>

                        <td>
                          {stackItems(shards.sort((a, b) => a.type.localeCompare(b.type))).map(
                            ({ item }) => {
                              const { id, type } = item as ShardItem;

                              return (
                                <div key={id}>
                                  <IconImage Icon={ELEMENTALS[type].Icon} size="tiny" />
                                  <span
                                    className={ELEMENTALS[type].color}
                                  >{` +${weaponDamageElementalValue[type]}`}</span>
                                </div>
                              );
                            },
                          )}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconStrength} size="tiny" />
                        &nbsp;Strength:
                      </td>

                      <td>{`+${strengthValue}`}</td>
                    </tr>

                    {powerBonusValue > 0 && (
                      <>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatPercentage(powerBonusValue, 0)}`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Total:</td>

                          <td>{`+${damageValue}`}</td>
                        </tr>
                      </>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingDamageDetails ? ["hover", "focus"] : []}
          >
            <span>{damageTotalValue}</span>
          </OverlayTrigger>

          <FloatingText deltaType="damage" />
        </Stack>
      }
      description={<DamagePerSecond />}
      Icon={IconDamage}
      tooltip="Total damage"
    />
  );
}
