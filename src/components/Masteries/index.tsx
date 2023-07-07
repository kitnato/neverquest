import { Accordion, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryDisplay } from "@neverquest/components/Masteries/MasteryDisplay";
import { MASTERIES_ORDER } from "@neverquest/data/masteries";
import { ReactComponent as IconMasteries } from "@neverquest/icons/masteries.svg";
import { isShowing } from "@neverquest/state/isShowing";

export function Masteries() {
  const isShowingMasteries = useRecoilValue(isShowing("masteries"));

  if (!isShowingMasteries) {
    return null;
  }

  return (
    <Accordion className="overlay-highlighted" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <IconDisplay contents="Masteries" Icon={IconMasteries} tooltip="Masteries" />
        </Accordion.Header>

        <Accordion.Body>
          <Stack gap={4}>
            {MASTERIES_ORDER.map((type) => (
              <MasteryDisplay key={type} type={type} />
            ))}
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
