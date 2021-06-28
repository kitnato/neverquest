import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  activeMonster,
  armor,
  attackSpeedReduction,
  attacking,
  damage,
  damageDealt,
  damageTaken,
  dodge,
  gameOver,
  health,
  healthRegen,
  level,
  location,
  mode,
  name,
  progress,
  seed,
  shield,
  stamina,
  staminaRegen,
  weapon,
} from "state/atoms";

export default function Reset({ title, message, show, setShow }) {
  const resetActiveMonster = useResetRecoilState(activeMonster);
  const resetArmor = useResetRecoilState(armor);
  const resetAttackSpeedReduction = useResetRecoilState(attackSpeedReduction);
  const resetDamage = useResetRecoilState(damage);
  const resetDamageDealt = useResetRecoilState(damageDealt);
  const resetDamageTaken = useResetRecoilState(damageTaken);
  const resetDodge = useResetRecoilState(dodge);
  const resetEngaged = useResetRecoilState(attacking);
  const resetGameOver = useResetRecoilState(gameOver);
  const resetHealth = useResetRecoilState(health);
  const resetHealthRegen = useResetRecoilState(healthRegen);
  const resetLevel = useResetRecoilState(level);
  const resetLocation = useResetRecoilState(location);
  const resetMode = useResetRecoilState(mode);
  const resetName = useResetRecoilState(name);
  const resetProgress = useResetRecoilState(progress);
  const resetShield = useResetRecoilState(shield);
  const resetStamina = useResetRecoilState(stamina);
  const resetStaminaRegen = useResetRecoilState(staminaRegen);
  const resetWeapon = useResetRecoilState(weapon);
  const setSeed = useSetRecoilState(seed);

  const resetAtoms = () => {
    resetActiveMonster();
    resetArmor();
    resetAttackSpeedReduction();
    resetDamage();
    resetDamageDealt();
    resetDamageTaken();
    resetDodge();
    resetEngaged();
    resetGameOver();
    resetHealth();
    resetHealthRegen();
    resetLevel();
    resetLocation();
    resetMode();
    resetName();
    resetProgress();
    resetShield();
    resetStamina();
    resetStaminaRegen();
    resetWeapon();
    setSeed(uuidv4());
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
