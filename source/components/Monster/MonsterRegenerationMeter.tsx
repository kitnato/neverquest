import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { MONSTER_REGENERATION } from "@neverquest/data/monster";
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react";
import { isMonsterAiling, monsterRegenerationDuration } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterRegenerationMeter({ amount }: { amount: number }) {
  const isMonsterBurning = useRecoilValue(isMonsterAiling("burning"));
  const monsterRegenerationDurationValue = useRecoilValue(monsterRegenerationDuration);

  const { duration, ticks } = MONSTER_REGENERATION;
  const regenerationRate = Math.round(duration / ticks);
  const regenerationProgress =
    monsterRegenerationDurationValue === 0
      ? 0
      : regenerationRate - monsterRegenerationDurationValue;

  return (
    <LabelledProgressBar
      attachment="above"
      disableTransitions
      isSmall
      value={(regenerationProgress / regenerationRate) * PERCENTAGE_POINTS}
      variant="secondary"
    >
      {(() => {
        if (isMonsterBurning) {
          return <span>Burning ...</span>;
        }

        if (regenerationProgress === 0) {
          return (
            <Stack>
              <span>Monster regeneration</span>

              <IconDisplay Icon={IconMonsterHealth} iconProps={{ className: "small" }}>
                <span>
                  {amount}&nbsp;per&nbsp;
                  {formatNumber({
                    format: "time",
                    value: regenerationRate,
                  })}
                </span>
              </IconDisplay>
            </Stack>
          );
        }

        return (
          <Stack>
            <span>Regenerating</span>

            <IconDisplay Icon={IconMonsterHealth} iconProps={{ className: "small" }}>
              <span>
                {amount}&nbsp;in&nbsp;
                {formatNumber({
                  format: "time",
                  value: regenerationRate - regenerationProgress,
                })}
              </span>
            </IconDisplay>
          </Stack>
        );
      })()}
    </LabelledProgressBar>
  );
}
