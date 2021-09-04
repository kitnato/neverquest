import Button from "react-bootstrap/Button";

import ImageIcon from "components/ImageIcon";
import crewIcon from "icons/cowled.svg";

export default function Mercenary() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={crewIcon} tooltip="Mercenary" />

      <Button variant="outline-dark">Train</Button>
    </div>
  );
}
