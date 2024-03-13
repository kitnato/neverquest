import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimer } from "@neverquest/hooks/useTimer";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { hasFlatlined, isRecovering } from "@neverquest/state/character";
import {
  isHealthAtMaximum,
  isStaminaAtMaximum,
  regenerationAmount,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Reserve } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function Regeneration({ reserve }: { reserve: Reserve }) {
  const {
    baseRegenerationRate,
    Icon,
    IconRegeneration,
    regeneration,
    regenerationAttribute,
    regenerationRateDelta,
  } = RESERVES[reserve];

  const attributePowerBonusRegenerationRate = useRecoilValue(
    attributePowerBonus(regenerationAttribute),
  );
  const attributeStatisticRegenerationRate = useRecoilValue(
    attributeStatistic(regenerationAttribute),
  );
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isReserveAtMaximum = useRecoilValue(
    reserve === "health" ? isHealthAtMaximum : isStaminaAtMaximum,
  );
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isSkillAcquiredCalisthenics = useRecoilValue(isSkillAcquired("calisthenics"));
  const regenerationAmountValue = useRecoilValue(regenerationAmount(reserve));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve));

  const changeReserve = {
    health: useChangeHealth,
    stamina: useChangeStamina,
  }[reserve]();

  useDeltaText({
    delta: regenerationRateDelta,
    format: "time",
    state: regenerationRate(reserve),
  });

  useTimer({
    onElapsed: () => {
      changeReserve({ value: regenerationAmountValue });
    },
    setDuration: setRegenerationDuration,
    stop: hasFlatlinedValue || isRecoveringValue || isReserveAtMaximum,
  });

  return (
    <Stack direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverBody>
              <DetailsTable>
                <tr>
                  <td>
                    <span>Base rate:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconRegeneration} iconProps={{ className: "small" }}>
                      <span>{formatNumber({ format: "time", value: baseRegenerationRate })}</span>
                    </IconDisplay>
                  </td>
                </tr>

                <tr>
                  <td>
                    <IconDisplay Icon={IconRegeneration} iconProps={{ className: "small" }}>
                      <span>{capitalizeAll(regenerationAttribute)}:</span>
                    </IconDisplay>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>
                        {formatNumber({
                          format: "percentage",
                          value: attributeStatisticRegenerationRate,
                        })}
                      </span>

                      {attributePowerBonusRegenerationRate > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconEldritchCodex} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusRegenerationRate,
                              })}
                            </span>
                          </IconDisplay>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span>Regeneration:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
                      <span>
                        +{formatNumber({ decimals: 0, format: "percentage", value: regeneration })}
                        &nbsp;({formatNumber({ value: regenerationAmountValue })})
                      </span>
                    </IconDisplay>
                  </td>
                </tr>
              </DetailsTable>
            </PopoverBody>
          </Popover>
        }
        placement="right"
        trigger={isSkillAcquiredCalisthenics ? POPOVER_TRIGGER : []}
      >
        <div className="w-100">
          <RegenerationMeter reserve={reserve} />
        </div>
      </OverlayTrigger>

      <DeltasDisplay delta={regenerationRateDelta} />
    </Stack>
  );
}
