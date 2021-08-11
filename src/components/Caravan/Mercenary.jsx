import Button from "react-bootstrap/Button";

import WithIcon from "components/WithIcon";

import crewIcon from "icons/hood.svg";

export default function Mercenary() {
  return (
    <WithIcon icon={crewIcon} alt="Mercenary">
      <Button variant="outline-dark">Train</Button>
    </WithIcon>
  );
}
