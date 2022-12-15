import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { indexState, mordalState } from "../state/mordalState";
import { UserInfoType } from "../types/charCardsType";

type Props = {
  userData: UserInfoType[];
};

export default function StatMordal({ userData }: Props) {
  const [isMordal, setMordal] = useRecoilState(mordalState);
  const [isIndex, setIndex] = useRecoilState(indexState);

  return (
    <>
      {isMordal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">정보창</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setMordal(false)}
                  >
                    <span className="bg-transparent text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="grid sm:flex relative p-6 flex-auto ">
                  <div>
                    <p>
                      스탯공격력 :{" "}
                      {userData[isIndex] &&
                        userData[isIndex].characterBasicInfo.stat}
                    </p>
                    <div className="grid md:grid-cols-4 grid-cols-2">
                      <p>보스공격력</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.bossAttack}
                      </p>
                      <p>방어무시</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.defenseIgnore}
                      </p>
                      <p>크리티컬데미지</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.criticalDamage}
                      </p>
                      <p>스타포스</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.starForce}
                      </p>
                      <p>STR</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.str}
                      </p>
                      <p>DEX</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.dex}
                      </p>
                      <p>INT</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.int}
                      </p>
                      <p>LUK</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.luk}
                      </p>
                      <p>HP</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.hp}
                      </p>
                      <p>아케인포스</p>
                      <p>
                        {userData[isIndex] &&
                          userData[isIndex].characterBasicInfo.arcaneForce}
                      </p>
                    </div>
                  </div>
                  <div className="relative p-6 flex-auto grid grid-cols-5">
                    {userData[isIndex] &&
                      userData[isIndex].equipInfo.map((v, i) => (
                        <div
                          key={i}
                          className={"block bg-black w-[48px] h-[48px] m-1"}
                        >
                            <Image width="48px" height="48px" src={v.equipImg}/>
                        </div>
                      ))}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setMordal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
