import type { NextPage } from "next";
import Seo from "../components/Seo";
import EnterIdForm from "../components/EnterIdForm";
import axios from 'axios';

const Home: NextPage = () => {

   const searchApi = () => {
        const url = "http://localhost:8080/callApi";
        axios.get(url)
        .then(function(response) {
            console.log(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    }

  return (
    <>
      <Seo title="Home" />
      <p>조회하고 싶은 캐릭터명을 기입 해주세요.</p>

      <EnterIdForm />
      <button onClick={searchApi} className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full">
        검색
      </button>
    </>
  );
};

export default Home;
