import { generateLocation } from "@kitnato/locran";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Stack,
} from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DEATH_STAGE_PENALTY } from "@neverquest/data/encounter";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import IconCorpse from "@neverquest/icons/corpse.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconFlatlined from "@neverquest/icons/flatlined.svg?react";
import { canResurrect, hasFlatlined } from "@neverquest/state/character";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { getAffixStructure } from "@neverquest/utilities/getters";

export function Flatline() {
  const canResurrectValue = useRecoilValue(canResurrect);
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const stageValue = useRecoilValue(stage);
  const setWildernesses = useSetRecoilState(wildernesses);

  const progressQuest = useProgressQuest();
  const resetCharacter = useResetCharacter();
  const resetWilderness = useResetWilderness();

  return (
    <Modal backdrop="static" show={!canResurrectValue && hasFlatlinedValue}>
      <ModalHeader>
        <ModalTitle>
          <IconDisplay Icon={IconFlatlined}>
            <span>Flatline</span>
          </IconDisplay>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Stack gap={1}>
          <div>
            <span>Unspent&nbsp;</span>

            <IconImage className="small" Icon={IconEssence} />

            <span>&nbsp;essence is lost, but memories and possessions are retained.</span>
          </div>

          <div>
            <span>A&nbsp;</span>

            <IconImage className="small" Icon={IconCorpse} />

            <span>&nbsp;corpse decorates the battlefield, ripe for scavenging.</span>
          </div>

          <span>The wilderness is shifting ...</span>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            if (stageValue > DEATH_STAGE_PENALTY) {
              setWildernesses((currentWildernesses) =>
                currentWildernesses.slice(0, stageValue - DEATH_STAGE_PENALTY),
              );
            } else {
              setWildernesses([generateLocation({ affixStructure: getAffixStructure() })]);
            }

            progressQuest({ amount: -DEATH_STAGE_PENALTY, quest: "stages" });
            progressQuest({ amount: -DEATH_STAGE_PENALTY, quest: "stagesEnd" });

            resetCharacter();
            resetWilderness();
          }}
          variant="outline-dark"
        >
          <span>Rebirth</span>
        </Button>
      </ModalFooter>
    </Modal>
  );
}
