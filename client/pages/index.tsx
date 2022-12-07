import type { NextPage } from "next";
import Seo from "../components/Seo";
import InputIdForm from "../components/inputIdForm";
import CharCards from "../components/charCards";
import { useCallback, useState } from "react";
import { DefaultUserInfoType } from "../types/charCardsType";
import { getUserInfo } from "../components/fetchData";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  const [userData, setUserData] = useState<DefaultUserInfoType[]>([]);

  const fetchUserInfo = useCallback(async (charId: string): Promise<void> => {
    try {
      const response = await getUserInfo({ charId });
      if (response.status === 200) {
        console.log(response.data);
        setUserData((v) => [...v, response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Seo title="Home" />
      <Loading/>
      <div className="flex justify-center items-center">
        <InputIdForm fetchUserInfo={fetchUserInfo} setUserData={setUserData} />
      </div>
      <CharCards userData={userData} />
    </>
  );
};
export default Home;
