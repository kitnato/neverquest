import Button from "react-bootstrap/Button";

import ImageIcon from "components/ImageIcon";
import icon from "icons/cowled.svg";

export default function Member({ label, name, setActive }) {
  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip={name} />

      <Button onClick={setActive} variant="outline-dark">
        {label}
      </Button>
    </div>
  );
}
