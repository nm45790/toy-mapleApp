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
import { UpdateUserType } from "../types/updateUserType";

const Home: NextPage = () => {
  const [userData, setUserData] = useState<UserInfoType[]>([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  let newArr = [...userData];

  const fetchUserInfo = useCallback(async (charId: string) => {
    try {
      const response = await getUserInfo({ charId }, "조회");
      if (response.status === 200) {
        setUserData((v) => [...v, response.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateUserInfo = useCallback(
    async ({ charId, index }: UpdateUserType) => {
      try {
        const response = await getUserInfo({ charId }, "갱신");
        if (response.status === 200) {
          newArr[index] = response.data;
          setUserData(newArr);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [newArr]
  );

  const onRemoveData = useCallback(
    (charId: string) => {
      setUserData(
        userData.filter((user) => user.characterInfo.name !== charId)
      );
    },
    [userData]
  );

  return (
    <>
      <Seo title="Home" />
      <Loading />
      <div className="flex justify-center items-center">
        <InputIdForm fetchUserInfo={fetchUserInfo} setUserData={setUserData} />
      </div>
      <CharCards
        userData={userData}
        updateUserInfo={updateUserInfo}
        onRemoveData={onRemoveData}
      />
      <StatMordal userData={userData} />
    </>
  );
};
export default Home;
