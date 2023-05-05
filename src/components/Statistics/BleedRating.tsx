import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { BLEED, CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/constants";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import {
  bleedChance,
  bleedDamage,
  bleedRating,
  bleedTick,
  damage,
} from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const bleedTickValue = useRecoilValue(bleedTick);
  const damageValue = useRecoilValue(damage);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));

  const deltaBleed = deltas(DeltaType.BleedRating);

  const { duration } = BLEED;
  const { name } = MASTERIES[MasteryType.BleedDamage];

  useDeltaText({
    atomDelta: deltaBleed,
    atomValue: bleedRating,
  });

  if (!bleedSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header>Bleed rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>{`${formatPercentage(bleedChanceValue)} chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatPercentage(bleedDamageValue)} of damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{`${Math.ceil(
                        damageValue * bleedDamageValue
                      )} (${bleedTickValue} per tick)`}</td>
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
            <span>{bleedRatingValue}</span>
          </OverlayTrigger>

          <FloatingText type={DeltaType.BleedRating} />
        </>
      }
      Icon={IconBleedRating}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}
