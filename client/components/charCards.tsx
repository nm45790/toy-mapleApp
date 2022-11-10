import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";

export default function CharCards() {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {chars &&
          chars.map((v, i) => (
            <div key={"charcards" + i}>
              <button
                onClick={() => {
                  updatedChars.splice(updatedChars.indexOf(v), 1);
                  setChars(updatedChars);
                }}
                className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
              >
                삭제
              </button>
              <div className="w-full h-64 mt-2 border-solid border-2 border-color-4 rounded-lg">
                <p>{v.name}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
