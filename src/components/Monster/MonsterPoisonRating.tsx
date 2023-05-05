import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, POISON } from "@neverquest/data/constants";
import { ReactComponent as IconPoisonRating } from "@neverquest/icons/poison-rating.svg";
import { monsterDamage, monsterPoisonChance } from "@neverquest/state/monster";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export function MonsterPoisonRating() {
  const monsterPoisonChanceValue = useRecoilValue(monsterPoisonChance);
  const monsterDamageValue = useRecoilValue(monsterDamage);

  const { damage, duration, ticks } = POISON;
  const poisonPerTick = getDamagePerTick({
    damage: monsterDamageValue,
    duration,
    proportion: damage,
    ticks,
  });

  if (!monsterPoisonChanceValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header>Poison rating details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Poison chance:</td>

                    <td>{formatPercentage(monsterPoisonChanceValue)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Poison damage:</td>

                    <td>{`${Math.ceil(damage * monsterDamageValue)} (${formatPercentage(
                      damage
                    )} of damage & ${poisonPerTick} per tick)`}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                    <td>{formatMilliseconds(duration)}</td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{Math.round(poisonPerTick * monsterPoisonChanceValue * 100)}</span>
        </OverlayTrigger>
      }
      Icon={IconPoisonRating}
      isAnimated
      tooltip="Poison rating"
    />
  );
}
