import type { NextPage } from "next";
import Seo from "../components/Seo";
import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import InputIdForm from "../components/inputIdForm";
import charca from "../components/charCards";
import CharCards from "../components/charCards";

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Home" />
      <div className="flex justify-center items-center">
      <InputIdForm />
      </div>
      <CharCards/>
    </>
  );
};
export default Home;
