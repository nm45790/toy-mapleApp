import type { NextPage } from "next";
import Seo from "../components/Seo";
import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import InputIdForm from "../components/inputIdForm";
import CharCards from "../components/charCards";

const Home: NextPage = () => {
  const [chars, setChars] = useRecoilState(inputCharState);
  return (
    <>
      <Seo title="Home" />
      <p>조회하고 싶은 캐릭터명을 기입 해주세요.</p>
      <InputIdForm />
      <button
        onClick={() => setChars([])}
        className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
      >
        초기화
      </button>
    </>
  );
};
export default Home;
