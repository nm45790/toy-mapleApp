import type { NextPage } from "next";
import Seo from "../components/Seo";
import InputIdForm from "../components/inputIdForm";
import CharCards from "../components/charCards";
import { useCallback, useState } from "react";
import { UserInfoType } from "../types/charCardsType";
import { getUserInfo } from "../components/fetchData";
import Loading from "../components/Loading";
import { loadingState } from "../state/loadingState";
import { useRecoilState } from "recoil";
import StatMordal from "../components/statMordal";

const Home: NextPage = () => {
  const [userData, setUserData] = useState<UserInfoType[]>([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const fetchUserInfo = useCallback(async (charId: string): Promise<void> => {
    try {
      const response = await getUserInfo({ charId });
      if (response.status === 200) {
        console.log(response.data);
        setUserData((v) => [...v, response.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateUserInfo = useCallback(async (charId: string): Promise<void> => {
    try {
      const response = await getUserInfo({ charId });
      if (response.status === 200) {
        console.log(response.data);
        setUserData((v) => [...v, response.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Seo title="Home" />
      <Loading />
      <div className="flex justify-center items-center">
        <InputIdForm fetchUserInfo={fetchUserInfo} setUserData={setUserData} />
      </div>
      <CharCards userData={userData} updateUserInfo={updateUserInfo}  />
      <StatMordal userData={userData}  />
    </>
  );
};
export default Home;
