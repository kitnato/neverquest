import Button from "react-bootstrap/Button";

import ImageIcon from "components/ImageIcon";
import icon from "icons/hood.svg";

export default function Merchant() {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Merchant" />

      <Button variant="outline-dark">Purchase</Button>
    </div>
  );
}
