import axios, { AxiosResponse } from "axios";
import { UserInfoType } from "../types/charCardsType";

/**
 * @desc 유저에 대한 정보를 Fetching한다
 * @params {number} charId
 * @return
 */
export async function getUserInfo({
  charId,
}: {
  charId: string;
}): Promise<AxiosResponse<UserInfoType>> {
  // const url = 'http://172.30.1.47:8080/api/getMapleBasicInfo';
  // const url = 'http://121.138.203.222:8080/api/getMapleBasicInfo';
  // return await axios.get(url, {params : {id:charId}})
  return await axios.get(`${charId}.json`);
}
