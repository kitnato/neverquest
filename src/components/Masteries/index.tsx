import { Accordion } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MasteryDisplay } from "@neverquest/components/Masteries/MasteryDisplay";
import { MASTERIES_ORDER } from "@neverquest/data/masteries";
import { ReactComponent as IconMasteries } from "@neverquest/icons/masteries.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Masteries() {
  const isShowingMasteries = useRecoilValue(isShowing("masteries"));

  if (!isShowingMasteries) {
    return null;
  }

  return (
    <Accordion
      className={`overlay-highlighted ${getAnimationClass({ type: "flipInX" })}`}
      defaultActiveKey="0"
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <IconDisplay contents="Masteries" Icon={IconMasteries} tooltip="Masteries" />
        </Accordion.Header>

        <Accordion.Body>
          {MASTERIES_ORDER.map((type) => (
            <MasteryDisplay key={type} type={type} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
