import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import React, { Dispatch, SetStateAction } from "react";
import Loading from "./Loading";
import { loadingState } from "../state/loadingState";
import { DefaultUserInfoType } from "../types/charCardsType";

interface Props {
  userData: DefaultUserInfoType[];
}

export default function CharCards({ userData }: Props) {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];

  return (
    <>
      <div className="mt-6 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {chars &&
          chars.map((v, i) => (
            <div key={"charcards" + i} className="bg-slate-800 p-4">
              <div>
                <button
                  onClick={() => {
                    updatedChars.splice(updatedChars.indexOf(v), 1);
                    setChars(updatedChars);
                  }}
                  className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                >
                  삭제
                </button>
              </div>
              <div className="rounded overflow-hidden shadow-lg bg-color-3 mt-2 ">
                  <div className="px-6 py-4">
                    <div className="border-2">
                      <p className="font-bold text-xl mb-2">{v.name}</p>
                      <p className="text-gray-700 text-base"> </p>
                      <Image src={Manikin} />
                      {/* 이미지 데이터 바꿔야함 */}
                      <p>서버 : </p>
                      <p>인기도 : {userData[i] ? userData[i].chk : null}</p>
                      <p>레벨 : {userData[i] ? userData[i].lv : null} </p>
                      <p>직업 : {userData[i] ? userData[i].job : null} </p>
                      <p>길드 : {userData[i] ? userData[i].guild : null} </p>
                      <p>
                        보유메소 :
                        {userData[i] ? userData[i].mapleMoney : null}
                      </p>
                      <p>스탯공격력 : </p>
                      <p>크뎀 : </p>
                      <p>보공 : </p>
                      <p>방무 : </p>
                      <p>내성 : </p>
                      <p>스타포스 : </p>
                      <p>아케인포스 : </p>
                      <p>어센틱포스 : </p>
                      <p>힘 : </p>
                      <p>민 : </p>
                      <p>지 : </p>
                      <p>럭 : </p>
                      <p>HP : </p>
                    </div>
                    <div className="border-2">
                      <p>착용중인 아이템들(임시) : </p>
                      <p>착용중인 캐시아이템들(임시) : </p>
                      <p>착용중인 펫(임시) : </p>
                      <p>착용중인 펫장비(임시) : </p>
                    </div>
                  </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
