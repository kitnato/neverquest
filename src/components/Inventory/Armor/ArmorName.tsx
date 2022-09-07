import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import { hasKnapsack } from "@neverquest/state/character";
import { skills } from "@neverquest/state/skills";
import { Armor } from "@neverquest/types";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function ({ armor }: { armor: Armor }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const armorsSkillValue = useRecoilValue(skills(SkillType.Armors));

  const { armorClass, name, protection, weight } = armor;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className="fst-italic text-end">Protection:</td>

                  <td>{protection}</td>
                </tr>

                <tr>
                  {armorsSkillValue == SkillStatus.Trained ? (
                    <>
                      <td className="fst-italic text-end">Class:</td>

                      <td>{armorClass}</td>
                    </>
                  ) : (
                    <td className="text-end">{UNKNOWN}</td>
                  )}
                </tr>

                <tr>
                  {hasKnapsackValue ? (
                    <>
                      <td className="fst-italic text-end">Weight:</td>

                      <td>{weight}</td>
                    </>
                  ) : (
                    <td className="text-end">{UNKNOWN}</td>
                  )}
                </tr>
              </tbody>
            </Table>
          </Popover.Body>
        </Popover>
      }
      placement="top"
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
