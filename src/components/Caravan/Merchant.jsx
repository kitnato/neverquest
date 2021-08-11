import Button from "react-bootstrap/Button";

import WithIcon from "components/WithIcon";

import crewIcon from "icons/hood.svg";

export default function Merchant() {
  return (
    <WithIcon icon={crewIcon} alt="Merchant">
      <Button variant="outline-dark">Purchase</Button>
    </WithIcon>
  );
}
