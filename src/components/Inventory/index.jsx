import Card from "react-bootstrap/Card";

import Equipment from "components/Inventory/Equipment";
import Resources from "components/Inventory/Resources";

export default function Inventory() {
  return (
    <Card>
      <Card.Body className="spaced">
        <Resources />

        <Equipment />
      </Card.Body>
    </Card>
  );
}
