import ls from "localstorage-slim"
import { useContext, useState } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconReset from "@neverquest/icons/reset.svg?react"
import IconWarning from "@neverquest/icons/warning.svg?react"
import { SeedContext } from "@neverquest/state/seed"

export function Reset() {
  const context = useContext(SeedContext)
  const [isShowingModal, setIsShowingModal] = useState(false)

  const onHide = () => {
    setIsShowingModal(false)
  }

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Reset</span>
          </Tooltip>
        }
        placement="bottom"
      >
        <Button
          onClick={() => {
            setIsShowingModal(true)
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconReset} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconWarning}>
              <span>Reset game?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>This will reset everything and restart from scratch.</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              onHide()

              ls.clear()
              context()
            }}
            variant="outline-dark"
          >
            <span>Reset</span>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
