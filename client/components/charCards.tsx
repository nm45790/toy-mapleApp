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
  const [isLoading, setIsLoading] = React.useState(true);

  const [defaultData, setDefaultData] = React.useState<any[]>([]);
  let defaultDataArr: any[] = [];
  const [detailData, setDetailData] = React.useState<any[]>([]);
  let detailDataArr: any[] = [];

  //비동기 순서보장 코드
  // const fetch = async (id: string) => {
  //   const response = await axios
  //     .get("http://localhost:8080/api/addQueue",{params:{id}})
  //     return response.data
  // }

  // const searchApi = async (id: string) => {
  //   const promiseArr = []
  //   for (let i = 0; i < 10; i++) {
  //     const data = new Promise(async (resolve, reject) => {
  //       const res = await fetch(id + i)
  //       if (res) {
  //         resolve(res)
  //       } else {
  //         reject('')
  //       }
  //     })
  //     promiseArr.push(data)
  //   }
  //   console.log((await Promise.all([...promiseArr])).toString())
  //   return Promise.all([...promiseArr])
  // };

  
  // 기존 api 호출
  const searchDefaultApi = (id: string) => {
    setIsLoading(true) 
     axios
      // .get("http://localhost:8080/api/searchInfo",{params:{id}})
      .get(`default${id}.json`)
      .then((response) => {
          console.log("성공");
          console.log(response);
          defaultDataArr.push(response.data);
        setDefaultData((v) => [...v, ...defaultDataArr]);
      })
      .catch((error) => {
        console.log(error);
        console.log("실패");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const searchDetailApi = (id: string) => {
    setIsLoading(true) 
     axios
      // .get("http://localhost:8080/api/searchDetailInfo",{params:{id}})
      .get(`detail${id}.json`)
      .then((response) => {
          console.log("성공");
          console.log(response);
        detailDataArr.push(response.data);
        setDetailData((v) => [...v, ...detailDataArr]);
      })
      .catch((error) => {
        console.log(error);
        console.log("실패");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <button
        onClick={() => console.log(defaultData)}
        className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
      >
        조회
      </button>
      <div className="mt-2 p-4 border-2 border-color-4">
        <div className="p-2 border-2 border-color-4 sm:grid sm:grid-cols-2 lg:grid-cols-3  grid grid-cols-1 ">
          <div>
            <p>총 캐릭터 개수 : {chars.length}</p>
            <p>
              모든 캐릭터 메소 합(창고제외) :
              {defaultData
                .map((v) => +v.mapleMoney.replaceAll(",", ""))
                .reduce((arr: number, crr: number) => {
                  return arr + crr;
                }, 0)}
              메소
            </p>
            <p>창고 메소 : {defaultData.map((v) => v.storageMoney)}</p>
          </div>
          <div>
            <p>보유한 어쩌고 수 : </p>
            <p>보유한 어쩌고 수 : </p>
            <p>보유한 어쩌고 수 : </p>
            <p>보유한 어쩌고 수 : </p>
          </div>
          <div className="border-2 border-color-4">
            <p>인벤토리 검색 영역</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {chars &&
            chars.map((v, i) => (
              <div key={"charcards" + i} className="bg-slate-400 p-4">
                <div>
                  <button
                    onClick={() => {
                      searchDefaultApi(v.name);
                    }}
                    className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                  >
                    기본검색
                  </button>
                  <button
                    onClick={() => {
                      searchDetailApi(v.name);
                    }}
                    className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
                  >
                    상세검색
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
                                  {Object.keys(detailData[i]).includes('equip')&&Object.keys(detailData[i].equip).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-50"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(detailData[i]).includes('use')&&Object.keys(detailData[i].use).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-100"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(detailData[i]).includes('etc')&&Object.keys(detailData[i].etc).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-200"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(detailData[i]).includes('setup')&& Object.keys(detailData[i].setup).map((v) => (
                                    <div
                                      key={v}
                                      className="shadow-lg p-6 bg-red-300"
                                    >
                                      <p className="text-xs">{v}</p>
                                    </div>
                                  ))}
                                  {Object.keys(detailData[i]).includes('cash')&&Object.keys(detailData[i].cash).map((v) => (
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
                    <p>레벨 : {defaultData[i] ? defaultData[i].lv : null} </p>
                    <p>직업 : {defaultData[i] ? defaultData[i].job : null} </p>
                    <p>길드 : {defaultData[i] ? defaultData[i].guild : null} </p>
                    <p>보유메소 : {defaultData[i] ? defaultData[i].mapleMoney : null}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
