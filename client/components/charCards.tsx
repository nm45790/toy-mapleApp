import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import ItemIcon from "../../resource/ItemIcon.png";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { UserInfoType } from "../types/charCardsType";
import { loadingState } from "../state/loadingState";
import StatMordal from "./statMordal";
import { indexState, mordalState } from "../state/mordalState";

interface Props {
  updateUserInfo: (charId: string) => Promise<void>;
  userData: UserInfoType[];
}

export default function CharCards({ updateUserInfo, userData }: Props) {
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
            <div key={"charcards" + i} className="bg-slate-800 p-2">
              <div>
                {/* <button
                  onClick={() => {
                    updatedChars.splice(updatedChars.indexOf(v), 1);
                    setChars(updatedChars);
                  }}
                  className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                >
                  삭제
                </button> */}
              </div>
              <div className="rounded overflow-hidden shadow-lg bg-color-1 grid grid-cols-2 p-4">
                <div className=" w-[100%]">
                  <div className="w-full h-[180px] bg-color-4 flex justify-center items-center rounded-md">
                    <div className="w-[100px] h-[150px] bg-color-2 flex justify-center items-center rounded-full">
                      {userData[i] && (
                        // <Image width="78px" height="128px" src={Manikin} />
                        <Image
                          width="78px"
                          height="128px"
                          src={userData[i].characterInfo.img}
                        />
                      )}
                    </div>
                  </div>
                  <div className="h-[180px] flex justify-center items-center">
                    <p className="font-mapleBold text-2xl">A++</p>
                  </div>
                </div>
                <div>
                  <div className="h-[180px]  flex justify-center items-center bg-color-1">
                    <div className="underline font-mapleLight text-2xl mt-4">
                      <p className="mb-4">
                        {userData[i] && userData[i].characterInfo.name} (
                        {userData[i] && userData[i].characterBasicInfo.world})
                      </p>
                      <p className="mb-4">
                        {userData[i] && userData[i].characterInfo.level}(
                        {userData[i] && userData[i].characterBasicInfo.job}){" "}
                      </p>
                      <p className="mb-4">
                        인기도 :{" "}
                        {userData[i] && userData[i].characterBasicInfo.famous}
                      </p>
                      <p className="mb-4">
                        길드 :{" "}
                        {userData[i] && userData[i].characterBasicInfo.guild}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-10 px-10 h-[180px] ">
                    <button
                      className="bg-color-4 hover:bg-color-3 text-color-2 font-mapleBold py-4 px-8 rounded-lg"
                      onClick={() => {
                        setMordal(true);
                        setIndex(i);
                      }}
                    >
                      <p className="w-8">정보</p>
                    </button>
                    <button
                      className="box-border bg-color-4 hover:bg-color-3 text-color-2 font-mapleBold py-4 px-8 rounded-lg"
                      // onClick={async()=>{await fetchUserInfo(v.name).then((response)=>{

                      // });}}>
                      onClick={() => {
                        console.log(userData[i], v.name);
                      }}
                    >
                      <p className="w-8">갱신</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
