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
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import IconCorpse from "@neverquest/icons/corpse.svg?react";
import IconDead from "@neverquest/icons/dead.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { hasFlatlined } from "@neverquest/state/character";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { getAffixStructure } from "@neverquest/utilities/getters";

export function Flatline() {
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const stageValue = useRecoilValue(stage);
  const setInventory = useSetRecoilState(inventory);
  const setWildernesses = useSetRecoilState(wildernesses);

  const equippedGearIDs = new Set([
    useRecoilValue(armor).ID,
    useRecoilValue(shield).ID,
    useRecoilValue(weapon).ID,
  ]);

  const resetCharacter = useResetCharacter();
  const resetWilderness = useResetWilderness();

  return (
    <Modal backdrop="static" show={hasFlatlinedValue}>
      <ModalHeader>
        <ModalTitle>
          <IconDisplay Icon={IconDead}>
            <span>Flatline</span>
          </IconDisplay>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Stack gap={1}>
          <Stack direction="horizontal" gap={1}>
            <span>Unspent</span>

            <IconImage className="small" Icon={IconEssence} />

            <span>essence is lost.</span>
          </Stack>

          <span>Memories and possessions are retained.</span>

          <Stack direction="horizontal" gap={1}>
            <span>A</span>

            <IconImage className="small" Icon={IconCorpse} />

            <span>corpse decorates the battlefield, ripe for scavenging.</span>
          </Stack>

          <span>The wilderness is shifting ...</span>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            setInventory((currentInventory) =>
              currentInventory.filter(({ ID }) => !equippedGearIDs.has(ID)),
            );

            if (stageValue > DEATH_STAGE_PENALTY) {
              setWildernesses((currentWildernesses) =>
                currentWildernesses.slice(0, stageValue - DEATH_STAGE_PENALTY),
              );
            } else {
              setWildernesses([generateLocation({ affixStructure: getAffixStructure() })]);
            }

            resetCharacter();
            resetWilderness();
          }}
          variant="outline-dark"
        >
          Rebirth
        </Button>
      </ModalFooter>
    </Modal>
  );
}
