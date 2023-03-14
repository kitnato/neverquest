import { Accordion } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Mastery } from "@neverquest/components/Masteries/Mastery";
import { MASTERIES_ORDER } from "@neverquest/data/masteries";
import { ReactComponent as IconMasteries } from "@neverquest/icons/master-of-arms.svg";
import { isShowingMastery } from "@neverquest/state/isShowing";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Masteries() {
  const isShowingMasteryValue = useRecoilValue(isShowingMastery(null));

  if (!isShowingMasteryValue) {
    return null;
  }

  return (
    <Accordion className={getAnimationClass({ type: AnimationType.FlipInX })} defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <IconDisplay contents="Masteries" Icon={IconMasteries} tooltip="Masteries" />
        </Accordion.Header>

        <Accordion.Body>
          {MASTERIES_ORDER.map((type) => (
            <Mastery key={type} type={type} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
