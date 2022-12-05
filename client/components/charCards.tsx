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

  const [data, setData] = React.useState<any[]>([]);
  let dataArr: any[] = [];

  // 기존 api 호출
  const searchApi = (id: string) => {
    setIsLoading(true);
    axios
      // .get("http://localhost:8080/api/searchInfo",{params:{id}})
      .get(`default${id}.json`)
      .then((response) => {
        console.log("성공");
        console.log(response);
        dataArr.push(response.data);
        setData((v) => [...v, ...dataArr]);
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
      <div className="mt-6 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {chars &&
          chars.map((v, i) => (
            <div key={"charcards" + i} className="bg-slate-800 p-4">
              <div>
                <button
                  onClick={() => {
                    searchApi(v.name);
                  }}
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
              </div>
              <div className="rounded overflow-hidden shadow-lg bg-color-3 mt-2 ">
                <div className="px-6 py-4">
                  <div className="border-2">
                  <p className="font-bold text-xl mb-2">{v.name}</p>
                  <p className="text-gray-700 text-base"> </p>
                  <Image src={Manikin} />
                  {/* 이미지 데이터 바꿔야함 */}
                  <p>서버 : </p>
                  <p>인기도 : {data[i] ? data[i].fame : null}</p>
                  <p>레벨 : {data[i] ? data[i].lv : null} </p>
                  <p>직업 : {data[i] ? data[i].job : null} </p>
                  <p>길드 : {data[i] ? data[i].guild : null} </p>
                  <p>보유메소 :{data[i] ? data[i].mapleMoney : null}</p>
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
                  <p>피 : </p>
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
