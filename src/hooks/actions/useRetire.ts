import { useRecoilCallback } from "recoil";

// TODO
export function useRetire() {
  return useRecoilCallback(
    () => () => {
      return null;
    },
    [],
  );
}
