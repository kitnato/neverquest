import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CompleteQuest } from "@neverquest/components/Journal/CompleteQuest";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { CONQUESTS } from "@neverquest/data/journal";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import { conquestProgress } from "@neverquest/state/journal";
import type { Conquest } from "@neverquest/types/unions";

export function ConquestDisplay({ conquest }: { conquest: Conquest }) {
  const conquestProgressValue = useRecoilValue(conquestProgress(conquest));

  const { description, progression, title } = CONQUESTS[conquest];

  return (
    <Stack direction="horizontal" gap={3}>
      <IconDisplay
        description={
          <Stack direction="horizontal">
            <LabelledProgressBar
              value={(conquestProgressValue / progression[0]) * 100}
              variant="dark"
            >
              <Stack direction="horizontal">
                {`${conquestProgressValue}/${progression[0]}`}

                <FloatingTextQueue delta="conquests" />
              </Stack>
            </LabelledProgressBar>

            <FloatingTextQueue delta={conquest} />
          </Stack>
        }
        Icon={IconConquest}
        tooltip="Conquest"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverBody>{description}</PopoverBody>
            </Popover>
          }
          placement="right"
        >
          <span style={{ width: "max-content" }}>{title}</span>
        </OverlayTrigger>
      </IconDisplay>

      <CompleteQuest quest={conquest} />
    </Stack>
  );
}
