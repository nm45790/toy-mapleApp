import axios, { AxiosResponse } from "axios";
import { DefaultUserInfoType } from "../types/charCardsType";

// function fetchInfo(charId: string) {
//   let info: any = null;
//   axios
//     .get(`default${charId}.json`)
//     .then((response) => {
//       console.log("성공");
//       console.log(response);
//       info = response;
//     })
//     .catch((error) => {
//       console.log(error);
//       console.log("실패");
//     });
// }
// function fetchData(charId: string) {
//   return {
//     infoUser: fetchInfo(charId),
//   };
// }

/**
 * @desc 유저에 대한 정보를 Fetching한다
 * @params {number} charId
 * @return 
 */
export async function getUserInfo({ charId }: { charId: string }): Promise<AxiosResponse<DefaultUserInfoType>> {
  return await axios.get(`default${charId}.json`)
} 
