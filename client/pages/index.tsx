import type { NextPage } from "next";
import Seo from "../components/Seo";
import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import InputIdForm from "../components/inputIdForm";
import CharCards from "../components/charCards";
import axios from 'axios';

const Home: NextPage = () => {
  const [chars, setChars] = useRecoilState(inputCharState);

  const searchApi = () => {
        const url = "http://localhost:8080/api/searchInfo";
        const id = '명회'
        console.log(url);
        console.log("id:" , id);
        axios.get(url, {params:{ "id": id }})
        .then(function(response) {
            console.log(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log(error);
            console.log("실패");
        })
  }

  return (
    <>
      <Seo title="Home" />
      <p>조회하고 싶은 캐릭터명을 기입 해주세요.</p>
      <InputIdForm />
      <button
            onClick={() => setChars([])}
            className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full">
            초기화
      </button>

      <button
            onClick={searchApi}
            className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full">
            조회
      </button>


      <CharCards/>
    </>
  );
};
export default Home;
