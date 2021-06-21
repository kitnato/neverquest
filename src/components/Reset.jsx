import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  activeMonster,
  engaged,
  gameOver,
  level,
  location,
  mode,
  progress,
  seed,
} from "state/atoms";
import {
  attackSpeedReduction,
  damage,
  damageDealt,
  damageTaken,
  health,
  healthRegen,
  name,
  stamina,
  staminaRegen,
  weapon,
} from "state/character/atoms";

export default function Reset({ title, message, show, setShow }) {
  const resetActiveMonster = useResetRecoilState(activeMonster);
  const resetEngaged = useResetRecoilState(engaged);
  const resetGameOver = useResetRecoilState(gameOver);
  const resetLevel = useResetRecoilState(level);
  const resetLocation = useResetRecoilState(location);
  const resetMode = useResetRecoilState(mode);
  const resetProgress = useResetRecoilState(progress);
  const setSeed = useSetRecoilState(seed);

  const resetAttackSpeedReduction = useResetRecoilState(attackSpeedReduction);
  const resetDamage = useResetRecoilState(damage);
  const resetDamageDealt = useResetRecoilState(damageDealt);
  const resetDamageTaken = useResetRecoilState(damageTaken);
  const resetHealth = useResetRecoilState(health);
  const resetHealthRegen = useResetRecoilState(healthRegen);
  const resetName = useResetRecoilState(name);
  const resetStamina = useResetRecoilState(stamina);
  const resetStaminaRegen = useResetRecoilState(staminaRegen);
  const resetWeapon = useResetRecoilState(weapon);

  const resetAtoms = () => {
    resetActiveMonster();
    resetEngaged();
    resetGameOver();
    resetLevel();
    resetLocation();
    resetMode();
    resetProgress();
    setSeed(uuidv4());

    resetAttackSpeedReduction();
    resetDamage();
    resetDamageDealt();
    resetDamageTaken();
    resetHealth();
    resetHealthRegen();
    resetName();
    resetStamina();
    resetStaminaRegen();
    resetWeapon();
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            resetAtoms();
            setShow(false);
          }}
        >
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
