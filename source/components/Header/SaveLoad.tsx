import ls from "localstorage-slim"
import { useRef, useState } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { version } from "@neverquest/configuration"
import { FILE_EXTENSION, KEY_SESSION, LABEL_UNKNOWN } from "@neverquest/data/general"
import IconLoad from "@neverquest/icons/load.svg?react"
import IconSaveLoad from "@neverquest/icons/save-load.svg?react"
import IconSave from "@neverquest/icons/save.svg?react"
import { name } from "@neverquest/state/character"
import { formatKebabCase } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

const DEFAULT_RESULT = {
  message: ``,
  status: false,
}
const VERSION_KEY = `version=`

export function SaveLoad() {
  const nameValue = useRecoilValue(name)

  const [isLoading, setIsLoading] = useState(false)
  const [isShowingModal, setIsShowingModal] = useState(false)
  const [{ message, status }, setResult] = useState(DEFAULT_RESULT)

  const fileInput = useRef<HTMLInputElement>(null)
  const [major, minor] = version.split(`.`) as [string, string, string]
  const compatibleVersion = `${major}${minor}`

  const onHide = () => {
    setIsShowingModal(false)
    setResult(DEFAULT_RESULT)
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Save & load</Tooltip>} placement="bottom">
        <Button
          onClick={() => {
            setIsShowingModal(true)
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconSaveLoad} />
        </Button>
      </OverlayTrigger>

      <Modal backdrop={isLoading ? `static` : undefined} onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton={!isLoading}>
          <ModalTitle>
            <IconDisplay
              Icon={IconSaveLoad}
              iconProps={{
                className: isLoading
                  ? getAnimationClass({ animation: `pulse`, isInfinite: true, speed: `fast` })
                  : undefined,
              }}
            >
              <span>Save & load game</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Stack gap={3}>
            <Button
              disabled={isLoading}
              onClick={() => {
                const session = ls.get<string>(KEY_SESSION)

                if (session === null) {
                  setResult({ message: `Invalid session data.`, status: false })

                  return
                }

                const downloadAnchorNode = document.createElement(`a`)

                downloadAnchorNode.setAttribute(
                  `href`,
                  `data:text/json;charset=utf-8,` +
                    encodeURIComponent(`${session}${VERSION_KEY}${version}`),
                )
                downloadAnchorNode.setAttribute(
                  `download`,
                  `neverquest-save${nameValue === LABEL_UNKNOWN ? `` : `-${formatKebabCase(nameValue)}`}.${FILE_EXTENSION}`,
                )

                document.body.append(downloadAnchorNode)

                downloadAnchorNode.click()
                downloadAnchorNode.remove()

                onHide()
              }}
              variant="outline-dark"
            >
              <IconImage className="small" Icon={IconSave} />

              <span>&nbsp;Save</span>
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => {
                fileInput.current?.click()
              }}
              variant="outline-dark"
            >
              <IconImage className="small" Icon={IconLoad} />

              <span>&nbsp;Load</span>
            </Button>

            <input
              accept=".nq"
              className="invisible position-absolute"
              disabled={isLoading}
              onChange={({ target: { files } }) => {
                if (files !== null && files.length === 1) {
                  const [file] = files

                  if (file === undefined) {
                    setResult({ message: `Empty file.`, status: false })
                  } else {
                    setIsLoading(true)

                    file
                      .text()
                      .then((contents) => {
                        const [session, contentsVersion] = contents.split(VERSION_KEY)

                        if (contentsVersion === undefined) {
                          setIsLoading(false)
                          setResult({ message: `Invalid version.`, status: false })

                          return
                        }

                        const [fileMajor, fileMinor] = contentsVersion.split(`.`)

                        if (`${fileMajor ?? ``}${fileMinor ?? ``}` !== compatibleVersion) {
                          setIsLoading(false)
                          setResult({ message: `Incompatible version.`, status: false })

                          return
                        }

                        if (session === undefined) {
                          setIsLoading(false)
                          setResult({ message: `Invalid file.`, status: false })
                        } else {
                          setResult({ message: `Reloading ...`, status: true })

                          ls.set(KEY_SESSION, session)
                          location.reload()
                        }
                      })
                      .catch(() => {
                        setIsLoading(false)
                        setResult({ message: `Invalid file contents.`, status: false })
                      })
                  }
                } else {
                  setResult({ message: `No file specified.`, status: false })
                }
              }}
              ref={fileInput}
              type="file"
            />

            {message !== `` && (
              <span
                className={status ? `text-success` : `text-danger`}
              >{`${status ? `Success!` : `Error:`} ${message}`}</span>
            )}
          </Stack>
        </ModalBody>
      </Modal>
    </>
  )
}
