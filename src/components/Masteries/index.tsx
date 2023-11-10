import { Accordion, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryDisplay } from "@neverquest/components/Masteries/MasteryDisplay";
import IconMasteries from "@neverquest/icons/masteries.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { unlockedMasteries } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";

export function Masteries() {
  const isShowingMasteries = useRecoilValue(isShowing("masteries"));
  const unlockedMasteriesValue = useRecoilValue(unlockedMasteries);

  if (!isShowingMasteries) {
    return null;
  }

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <IconDisplay Icon={IconMasteries} tooltip="Masteries">
            Masteries
          </IconDisplay>
        </Accordion.Header>

        <Accordion.Body>
          <Stack gap={3}>
            {Object.entries(unlockedMasteriesValue)
              .toSorted(([current1], [current2]) => current1.localeCompare(current2))
              .toSorted(([, current1], [, current2]) => Number(current2) - Number(current1))
              .map(([current]) => (
                <MasteryDisplay key={current} mastery={current as Mastery} />
              ))}
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
