import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";

export default function CharCards() {
  const [chars, setChars] = useRecoilState(inputCharState);
  return(
    <>
      {chars && chars.map(((v,i)=>
      <div key={i}><p>{v.name}</p></div>
      )) }
    </>
  );
}
