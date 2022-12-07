import type { NextPage } from "next";
import Seo from "../components/Seo";
import InputIdForm from "../components/inputIdForm";
import CharCards from "../components/charCards";
import { useCallback, useState } from "react";
import { DefaultUserInfoType } from "../types/charCardsType";
import { getUserInfo } from "../components/fetchData";

const Home: NextPage = () => {
  const [inputData, setInputData] = useState<DefaultUserInfoType[]>([]);

  const fetchUserInfo = useCallback(async (charId: string): Promise<void> => {
    try {
      const response = await getUserInfo({ charId });
      if (response.status === 200) {
        console.log(response.data);
        setInputData((v) => [...v, response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Seo title="Home" />
      <div className="flex justify-center items-center">
        <InputIdForm fetchUserInfo={fetchUserInfo} />
      </div>
      <CharCards
        inputData={inputData}
        setInputData={setInputData}
        fetchUserInfo={fetchUserInfo}
      />
    </>
  );
};
export default Home;
