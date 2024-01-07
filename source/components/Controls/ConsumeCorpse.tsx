import { Button, OverlayTrigger, Popover, PopoverBody, PopoverHeader } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconCorpse from "@neverquest/icons/corpse.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { corpse, location, stage } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ConsumeCorpse() {
  const corpseValue = useRecoilValue(corpse);
  const locationValue = useRecoilValue(location);
  const stageValue = useRecoilValue(stage);
  const resetCorpse = useResetRecoilState(corpse);

  const transactEssence = useTransactEssence();

  if (corpseValue !== undefined) {
    const { essence, stage } = corpseValue;

    if (locationValue === "wilderness" && stage === stageValue) {
      return (
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">
                <span>Consume corpse</span>
              </PopoverHeader>

              <PopoverBody>
                <IconDisplay
                  className="justify-content-center"
                  Icon={IconEssence}
                  iconProps={{ className: "small" }}
                >
                  <span>{formatNumber({ value: essence })}</span>
                </IconDisplay>
              </PopoverBody>
            </Popover>
          }
        >
          <div className={getAnimationClass({ animation: "bounceIn" })}>
            <Button
              className={getAnimationClass({ animation: "pulse", isInfinite: true })}
              onClick={() => {
                transactEssence(essence);
                resetCorpse();
              }}
              variant="outline-dark"
            >
              <IconImage Icon={IconCorpse} />
            </Button>
          </div>
        </OverlayTrigger>
      );
    }
  }
}
