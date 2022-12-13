import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import ItemIcon from "../../resource/ItemIcon.png";
import React from "react";
import { UserInfoType } from "../types/charCardsType";

interface Props {
  userData: UserInfoType[];
}

export default function CharCards({ userData }: Props) {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];
  const testArr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
  ];

  return (
    <>
      <div className="mt-6 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {chars &&
          chars.map((v, i) => (
            <div key={"charcards" + i} className="bg-slate-800 p-4">
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
                {/* <button
                  onClick={() => {
                    userData[i].equipInfo.map(v=>console.log(v))
                  }}
                  className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                >
                  테스트
                </button> */}
              </div>
              <div className="rounded overflow-hidden shadow-lg bg-color-2 grid grid-cols-2">
                <div className=" w-[100%] ">
                  <div className="flex justify-center items-center">
                    <div className="w-[150px] h-[180px] bg-color-1 rounded-full flex justify-center items-center">
                      <Image width="78px" height="128px" src={Manikin} />
                    </div>
                  </div>
                  <div className="  ">
                    {/* 기본 정보 컨테이너 */}
                    <div className="grid grid-cols-2">
                      <p>스탯공격력 : </p>
                      <p>
                        {userData[i] && userData[i].characterBasicInfo.stat}{" "}
                      </p>
                      <p>
                        크뎀 :{" "}
                        {userData[i] &&
                          userData[i].characterBasicInfo.criticalDamage}
                      </p>
                      <p>
                        보공 :{" "}
                        {userData[i] &&
                          userData[i].characterBasicInfo.bossAttack}
                      </p>
                      <p>
                        방무 :{" "}
                        {userData[i] &&
                          userData[i].characterBasicInfo.defenseIgnore}{" "}
                      </p>
                      <p>
                        내성 :{" "}
                        {userData[i] &&
                          userData[i].characterBasicInfo.stateResistance}
                      </p>
                      <p>
                        스타포스 :{" "}
                        {userData[i] &&
                          userData[i].characterBasicInfo.starForce}{" "}
                      </p>
                      <p>
                        아케인포스 :{" "}
                        {userData[i] &&
                          userData[i].characterBasicInfo.arcaneForce}{" "}
                      </p>
                      <p>어센틱포스 : </p>
                      <p>
                        STR :{" "}
                        {userData[i] && userData[i].characterBasicInfo.str}
                      </p>
                      <p>
                        DEX :{" "}
                        {userData[i] && userData[i].characterBasicInfo.dex}
                      </p>
                      <p>
                        INT :{" "}
                        {userData[i] && userData[i].characterBasicInfo.int}
                      </p>
                      <p>
                        LUK :{" "}
                        {userData[i] && userData[i].characterBasicInfo.luk}
                      </p>
                      <p>
                        HP : {userData[i] && userData[i].characterBasicInfo.hp}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="  ">
                  <div className="flex justify-center items-center bg-color-1">
                    <div>
                      <p>
                        이름 : {userData[i] && userData[i].characterInfo.name}
                      </p>
                      <p>
                        서버 :{" "}
                        {userData[i] && userData[i].characterBasicInfo.world}{" "}
                      </p>
                      <p>
                        인기도 :{" "}
                        {userData[i] && userData[i].characterBasicInfo.famous}
                      </p>
                      <p>
                        레벨 : {userData[i] && userData[i].characterInfo.level}{" "}
                      </p>
                      <p>
                        직업 :{" "}
                        {userData[i] && userData[i].characterBasicInfo.job}{" "}
                      </p>
                      <p>
                        길드 :{" "}
                        {userData[i] && userData[i].characterBasicInfo.guild}{" "}
                      </p>
                      <p>
                        보유메소 :
                        {userData[i] && userData[i].characterBasicInfo.money}
                      </p>
                    </div>
                  </div>
                  <h1>착용중인 아이템</h1>
                  <div className="grid grid-cols-4">
                    {userData[i]&&userData[i].equipInfo.map((v, i) => (
                      <div>
                        <div key={i}>
                          <Image
                            width="48px"
                            height="48px"
                            src={ItemIcon}
                          ></Image>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
