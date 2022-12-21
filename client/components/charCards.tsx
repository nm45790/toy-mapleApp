import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { UserInfoType } from "../types/charCardsType";
import { loadingState } from "../state/loadingState";
import { indexState, mordalState } from "../state/mordalState";
import { UpdateUserType } from "../types/updateUserType";
import { motion } from "framer-motion";

interface Props {
  updateUserInfo: (updateUser: UpdateUserType) => Promise<void>;
  userData: UserInfoType[];
  onRemoveData: (charId: string) => void;
}

export default function CharCards({
  updateUserInfo,
  userData,
  onRemoveData,
}: Props) {
  const [chars, setChars] = useRecoilState(inputCharState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [isMordal, setMordal] = useRecoilState(mordalState);
  const [isIndex, setIndex] = useRecoilState(indexState);

  const updatedChars = [...chars];

  return (
    <>
      <div className="mt-6 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {chars &&
          isLoading == false &&
          chars.map((v, i) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              key={"charcards" + i}
              className="bg-ivory p-4"
            >
              <div className="rounded overflow-hidden shadow-lg bg-white p-4">
                <div className="grid grid-cols-2">
                  <div className=" w-[100%]">
                    <div className="w-full flex justify-center items-center rounded-md">
                      <div className="w-[100px] h-[150px] bg-ivory flex justify-center items-center rounded-full">
                        {userData[i] && (
                          <Image
                            width="78px"
                            height="128px"
                            // src={userData[i].characterInfo.img}
                            src={Manikin}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-bold">
                    <div className="bg-ivory rounded-lg flex justify-center items-center">
                      <p>캐릭터명</p>
                    </div>
                    <div className=" flex justify-start items-start">
                      <p>
                        {userData[i] && userData[i].characterInfo.name} (
                        {userData[i] && userData[i].characterBasicInfo.world})
                      </p>
                    </div>
                    <div className="bg-ivory rounded-lg flex justify-center items-center">
                      <p>Lv.</p>
                    </div>
                    <div className=" flex justify-start items-start">
                      <p>
                        {userData[i] &&
                          userData[i].characterInfo.level.replace("Lv.", "")}
                        ({userData[i] && userData[i].characterBasicInfo.job})
                      </p>
                    </div>
                    <div className="bg-ivory rounded-lg flex justify-center items-center">
                      <p>인기도</p>
                    </div>
                    <div className=" flex justify-start items-start">
                      <p >
                        {userData[i] && userData[i].characterBasicInfo.famous}
                      </p>
                    </div>
                    <div className="bg-ivory rounded-lg flex justify-center items-center">
                      <p>길드</p>
                    </div>
                    <div className=" flex justify-start items-start">
                      <p>
                        {userData[i] && userData[i].characterBasicInfo.guild}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-[90px] flex justify-between items-center px-4">
                  <p className="font-bold text-2xl">A++</p>
                  <button
                    className="bg-sky-500 hover:opacity-50 font-bold px-6 py-3 rounded-lg"
                    onClick={() => {
                      setMordal(true);
                      setIndex(i);
                    }}
                  >
                    <p className="w-8">정보</p>
                  </button>
                  <button
                    className="box-border bg-sky-500 hover:opacity-50 font-bold px-6 py-3 rounded-lg"
                    onClick={async () => {
                      await updateUserInfo({ charId: v.name, index: i });
                    }}
                  >
                    <p className="w-8">갱신</p>
                  </button>
                  <button className="bg-sky-500 hover:opacity-50 font-bold px-6 py-3 rounded-lg">
                    <p className="w-8">다운</p>
                  </button>
                  <button
                    onClick={() => {
                      updatedChars.splice(updatedChars.indexOf(v), 1);
                      setChars(updatedChars);
                      onRemoveData(v.name);
                    }}
                    className="box-border bg-red-500 hover:opacity-50 font-bold px-6 py-3 rounded-lg"
                  >
                    <p className="w-8">삭제</p>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </>
  );
}
