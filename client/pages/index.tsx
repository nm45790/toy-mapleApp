import type { NextPage } from "next";
import Seo from "../components/Seo";
import EnterIdForm from "../components/EnterIdForm";

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Home" />
      <p className="text-color-4">조회하고 싶은 캐릭터명을 기입 해주세요.</p>

      <EnterIdForm />
      <button className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full">
        검색
      </button>
    </>
  );
};

export default Home;
