import { RecoilState, useRecoilValue } from "recoil";

export default function Lootable({
  atom,
  Component,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
}) {
  const resourceValue = useRecoilValue(atom);

  if (resourceValue === 0) {
    return null;
  }

  return (
    <Component className="animate__animated animate__flipInX" value={resourceValue} />
  );
}
