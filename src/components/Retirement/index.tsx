import type { Dispatch, SetStateAction } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited";
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection";
import { useRetire } from "@neverquest/hooks/actions/useRetire";
import { ReactComponent as IconProgress } from "@neverquest/icons/progress.svg";
import { ReactComponent as IconRetire } from "@neverquest/icons/retire.svg";
import { stage } from "@neverquest/state/encounter";
import { formatValue } from "@neverquest/utilities/formatters";
import { getProgressReduction } from "@neverquest/utilities/getters";

export function Retirement({
  showing: [isShowing, setIsShowing],
}: {
  showing: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const stageValue = useRecoilValue(stage);

  const retire = useRetire();

  const onHide = () => setIsShowing(false);

  return (
    <Modal onHide={onHide} show={isShowing} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <IconImage Icon={IconRetire} />
            Retirement
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack gap={5}>
          <Stack gap={3}>
            Retiring resets all accumulated progress, essence, attributes, skills, masteries and
            gear, starting a new quest with quicker progress alongside a powerful trait.
            <IconDisplay
              contents={`-${formatValue({
                format: "percentage",
                value: getProgressReduction(stageValue),
              })}`}
              Icon={IconProgress}
              tooltip="Progress discount"
            />
          </Stack>

          <ItemsInherited />

          <TraitSelection />
        </Stack>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            onHide();
            retire();
          }}
          variant="outline-dark"
        >
          Retire
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
