import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import axios from "axios";
import React from "react";
import Mordal from "./mordal";

interface Chars {
  data : [];
  lv : number;
  job : string;
}

export default function CharCards() {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];

  const [datas, setDatas] = React.useState([]);
  const [imgData, setImgData] = React.useState([]);
  const [cashData, setCashData] = React.useState([]);
  const [lvData, setLvData] = React.useState([]);
  const [guildData, setGuildData] = React.useState([]);
  const [mesoData, setMesoData] = React.useState([]);
  const [jobData, setJobData] = React.useState<Chars[]>([]);

  const searchApi = () => {
    axios
      .all(chars.map((v) => axios.get(`${v.name}.json`)))
      .then(response => {
        setJobData(response.map((v)=>v.data.job))
        //타입스크립트 never 타입 오류 'any' 형식은 'never' 형식에 할당할 수 없습니다.
        console.log(jobData);
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
      {/* {cashData&&Object.keys(cashData)} */}
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
                  <p>레벨 : {lvData} </p>
                  <p>직업 : {jobData[i]} </p>
                  <p>길드 : {guildData} </p>
                  <p>보유메소 : {mesoData}</p>
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
              {/* <div className="w-full h-64 mt-2 border-solid border-2 border-color-4 rounded-lg p-8">
                <p>{v.name}</p>
                <Image src={Manikin} placeholder="blur"/>
                <p>레벨 : 257(불,독)</p>
                <p>길드 : Free</p>
                <p>보유메소 : $991,567,123,161</p>
                <p>보유젬스톤 : 5,369개</p>
              </div> */}
            </div>
          ))}
      </div>
    </>
  );
}
