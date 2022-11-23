import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import axios from "axios";
import React from "react";
import Mordal from "./mordal";

interface CharsInterface {
  lv : number;
  job : string;
}

type JonType =  {
  job : string;
}

export default function CharCards() {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];

  const [datas, setDatas] = React.useState([]);
  const [guildData, setGuildData] = React.useState<string[]>([]);
  const [mesoData, setMesoData] = React.useState<number[]>([]);
  const [lvData, setLvData] = React.useState<number[]>([]);
  const [jobData, setJobData] = React.useState<string[]>([]);

  const searchApi = () => {
    axios
      .all(chars.map((v) => axios.get(`${v.name}.json`)))
      //서버에 요청할때 : axios.get(`localhost8080/api/blabla/${v.name}`)
      .then(response => {
        console.log("성공");
        setMesoData(response.map(v=>v.data.mapleMoney))
        setGuildData(response.map(v=>v.data.guild))
        setJobData(response.map(v=>v.data.job))
        setLvData(response.map(v=>v.data.lv))
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
        className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
      >
        조회
      </button>
      <Mordal />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {chars &&
          chars.map((v, i) => (
            <div key={"charcards" + i}>
              <button
                onClick={() => {
                  updatedChars.splice(updatedChars.indexOf(v), 1);
                  setChars(updatedChars);
                }}
                className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
              >
                삭제
              </button>
              {/* <button
                onClick={() => {
                  console.log(cashData);
                }}
                className="mt-10 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-full"
              >
                조회
              </button> */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-color-3 mt-2 ">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{v.name}</div>
                  <p className="text-gray-700 text-base"> </p>
                  <Image src={Manikin} />
                  {/* 이미지 데이터 바꿔야함 */}
                  <p>레벨 : {lvData[i]} </p>
                  <p>직업 : {jobData[i]} </p>
                  <p>길드 : {guildData[i]} </p>
                  <p>보유메소 : {mesoData[i]}</p>
                </div>
                {/* <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #모험가
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #본캐급
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #무릉1짱
                  </span>
                </div> */}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
