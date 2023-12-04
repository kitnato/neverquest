import { Accordion, AccordionHeader, AccordionItem, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryDisplay } from "@neverquest/components/Masteries/MasteryDisplay";
import IconMasteries from "@neverquest/icons/masteries.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { unlockedMasteries } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";

const ACCORDION_EVENT_KEY = "0";

export function Masteries() {
  const isShowingMasteries = useRecoilValue(isShowing("masteries"));
  const unlockedMasteriesValue = useRecoilValue(unlockedMasteries);

  if (isShowingMasteries) {
    return (
      <Accordion defaultActiveKey={ACCORDION_EVENT_KEY}>
        <AccordionItem eventKey={ACCORDION_EVENT_KEY}>
          <AccordionHeader>
            <IconDisplay Icon={IconMasteries} tooltip="Masteries">
              Masteries
            </IconDisplay>
          </AccordionHeader>

          <Accordion.Body>
            <Stack gap={3}>
              {Object.entries(unlockedMasteriesValue)
                .toSorted(([mastery1], [mastery2]) => mastery1.localeCompare(mastery2))
                .toSorted(([, mastery1], [, mastery2]) => Number(mastery2) - Number(mastery1))
                .map(([mastery]) => (
                  <MasteryDisplay key={mastery} mastery={mastery as Mastery} />
                ))}
            </Stack>
          </Accordion.Body>
        </AccordionItem>
      </Accordion>
    );
  }
}
