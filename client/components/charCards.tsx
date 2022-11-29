import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import axios from "axios";
import React from "react";

export default function CharCards() {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];
  const [showModal, setShowModal] = React.useState(false);

  const [getGuildData, setGuildData] = React.useState<string[]>([]);
  const [getMesoData, setMesoData] = React.useState<string[]>([]);
  const [getLvData, setLvData] = React.useState<number[]>([]);
  const [getJobData, setJobData] = React.useState<string[]>([]);
  const [getEquipData, setEquipData] = React.useState<string[]>([]);
  const [getUseData, setUseData] = React.useState<string[]>([]);
  const [getEtcData, setEtcData] = React.useState<string[]>([]);
  const [getSetupData, setSetupData] = React.useState<string[]>([]);
  const [getCashData, setCashData] = React.useState<string[]>([]);
  const [getStorageMesoData, setStorageMesoData] = React.useState<string[]>([]);

  const searchApi = () => {
    axios.all(chars.map((v) => axios.get(`${v.name}.json`)))
    // axios.all(chars.map((v) => axios.get(`localhost8080/api/searchInfo/${v.name}`)))
      .then((response) => {
        console.log("성공");
        console.log("보낸아이디:" + chars.map((v) => v.name));
        console.log(response);
        setGuildData(response.map((v) => v.data.guild));
        setJobData(response.map((v) => v.data.job));
        setLvData(response.map((v) => v.data.lv));
      })
      .catch((error) => {
        console.log(error);
        console.log("실패");
      });
    axios.all(chars.map((v) => axios.get(`${v.name}.json`)))
    // axios.all(chars.map((v)=>axios.get(`localhost8080/api/searchDetailInfo/${v.name}`)))
      .then((response) => {
        console.log("성공");
        console.log("보낸아이디:" + chars.map((v) => v.name));
        console.log(response);
        setMesoData(response.map((v) => v.data.mapleMoney));
        setEquipData(response.map((v) => v.data.equip));
        setUseData(response.map((v) => v.data.use));
        setEtcData(response.map((v) => v.data.etc));
        setSetupData(response.map((v) => v.data.setup));
        setCashData(response.map((v) => v.data.cash));
        setStorageMesoData(response.map((v) => v.data.storageMoney));
      })
      .catch((error) => {
        console.log(error);
        console.log("실패");
      });
  };
  return (
    <>
      <button
        onClick={searchApi}
        className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
      >
        조회
      </button>
      <div className="mt-2 p-4 border-2 border-color-4">
        <div className="p-2 border-2 border-color-4 sm:grid sm:grid-cols-2 grid grid-cols-1 ">
          <div>
            <p>총 캐릭터 개수 : {chars.length}</p>
            <p>
              모든 캐릭터 메소 합(창고제외) :
              {getMesoData
                .map((v) => +v.replaceAll(",", ""))
                .reduce((arr: number, crr: number) => {
                  return arr + crr;
                }, 0)}
              메소
            </p>
            <p>창고 메소 : {getStorageMesoData}</p>
          </div>
          <div>
            <p>보유한 어쩌고 수 : </p>
            <p>보유한 어쩌고 수 : </p>
            <p>보유한 어쩌고 수 : </p>
            <p>보유한 어쩌고 수 : </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {chars &&
            chars.map((v, i) => (
              <div key={"charcards" + i} className="bg-slate-400 p-4">
                <div>
                  <button
                    onClick={() => {}}
                    className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                  >
                    검색
                  </button>
                  <button
                    onClick={() => {
                      updatedChars.splice(updatedChars.indexOf(v), 1);
                      setChars(updatedChars);
                    }}
                    className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => {}}
                    className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                  >
                    카드
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                  >
                    인벤
                  </button>
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-color-3 mt-2 ">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 flex justify-between">
                      <p>{v.name}</p>
                      {/* <button onClick={() => setShowModal(true)}>
                      <MdInventory className="hover:fill-slate-500" />
                    </button> */}
                      {showModal ? (
                        <>
                          <div
                            key={v.name}
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    인벤토리
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0  text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                  >
                                    <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                  </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 gap-4 overflow-auto max-h-[80vh]">
                                  {Object.keys(getEquipData[i]).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-50"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(getUseData[i]).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-100"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(getEtcData[i]).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-200"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(getSetupData[i]).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-300"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(getCashData[i]).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-400"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
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
                    </div>
                    <p className="text-gray-700 text-base"> </p>
                    <Image src={Manikin} />
                    {/* 이미지 데이터 바꿔야함 */}
                    <p>레벨 : {getLvData[i]} </p>
                    <p>직업 : {getJobData[i]} </p>
                    <p>길드 : {getGuildData[i]} </p>
                    <p>보유메소 : {getMesoData[i]}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
