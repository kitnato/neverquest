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
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import IconCorpse from "@neverquest/icons/corpse.svg?react";
import IconDead from "@neverquest/icons/dead.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconGear from "@neverquest/icons/gear.svg?react";
import { hasFlatlined } from "@neverquest/state/character";
import { wildernesses } from "@neverquest/state/encounter";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { getAffixStructure } from "@neverquest/utilities/getters";

export function Flatline() {
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
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
          <span>Memories are retained.</span>

          <div>
            <span>Unspent&nbsp;</span>

            <IconImage className="small" Icon={IconEssence} />

            <span>&nbsp;essence and&nbsp;</span>

            <IconImage className="small" Icon={IconGear} />

            <span>&nbsp;gear are lost.</span>
          </div>

          <div>
            <span>A&nbsp;</span>

            <IconImage className="small" Icon={IconCorpse} />

            <span>&nbsp;corpse decorates the battlefield, ripe for scavenging.</span>
          </div>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            setInventory((currentInventory) =>
              currentInventory.filter(({ ID }) => !equippedGearIDs.has(ID)),
            );
            setWildernesses([generateLocation({ affixStructure: getAffixStructure() })]);

            resetCharacter();
            resetWilderness();
          }}
          variant="outline-dark"
        >
          Retry
        </Button>
      </ModalFooter>
    </Modal>
  );
}
