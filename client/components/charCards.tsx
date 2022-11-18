import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Manikin from "../../resource/마네킹.png";
import axios from "axios";
import React from "react";
import Mordal from "./mordal";

export default function CharCards() {
  const [chars, setChars] = useRecoilState(inputCharState);
  const updatedChars = [...chars];

  const [showModal, setShowModal] = React.useState(false);

  let charsStr = "";
  chars.map((v) => (charsStr += v.name + ","));
  const searchApi = () => {
    const url = "http://localhost:8080/api/searchInfo";
    const id = charsStr;
    console.log(url);
    console.log("id:", id);
    axios
      .get(url, { params: { id: id } })
      .then(function (response) {
        console.log(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
        console.log("실패");
      });
  };
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Mordal/>
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
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-color-3 mt-2 ">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{v.name}</div>
                  <p className="text-gray-700 text-base">
                    <Image src={Manikin} placeholder="blur" />
                    <p>레벨 : 257(불,독)</p>
                    <p>길드 : Free</p>
                    <p>보유메소 : $991,567,123,161</p>
                    <p>보유젬스톤 : 5,369개</p>
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #모험가
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #본캐급
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #무릉1짱
                  </span>
                </div>
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
