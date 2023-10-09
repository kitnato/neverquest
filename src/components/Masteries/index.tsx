import { Accordion, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryDisplay } from "@neverquest/components/Masteries/MasteryDisplay";
import { ReactComponent as IconMasteries } from "@neverquest/icons/masteries.svg";
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
          <IconDisplay contents="Masteries" Icon={IconMasteries} tooltip="Masteries" />
        </Accordion.Header>

        <Accordion.Body>
          <Stack gap={3}>
            {Object.entries(unlockedMasteriesValue)
              .sort(([a], [b]) => a.localeCompare(b))
              .sort(([, a], [, b]) => Number(b) - Number(a))
              .map(([current]) => (
                <MasteryDisplay key={current} mastery={current as Mastery} />
              ))}
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
