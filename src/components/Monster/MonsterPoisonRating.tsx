import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { POISON } from "@neverquest/data/statistics";
import { ReactComponent as IconPoisonRating } from "@neverquest/icons/poison-rating.svg";
import { monsterDamage, monsterPoison } from "@neverquest/state/monster";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export function MonsterPoisonRating() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterPoisonValue = useRecoilValue(monsterPoison);

  const { damage, duration, ticks } = POISON;
  const poisonPerTick = getDamagePerTick({
    damage: monsterDamageValue,
    duration,
    proportion: damage,
    ticks,
  });

  if (!monsterPoisonValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">Poison rating details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Poison chance:</td>

                    <td>{formatPercentage(monsterPoisonValue)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Poison damage:</td>

                    <td>{`${Math.round(damage * monsterDamageValue)} (${formatPercentage(
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
        >
          <span>{Math.round(poisonPerTick * monsterPoisonValue * 100)}</span>
        </OverlayTrigger>
      }
      Icon={IconPoisonRating}
      isAnimated
      tooltip="Poison rating"
    />
  );
}
