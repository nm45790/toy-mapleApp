import axios, { AxiosResponse } from "axios";
import { UserInfoType } from "../types/charCardsType";

/**
 * @desc 유저에 대한 정보를 Fetching한다
 * @params {number} charId
 * @return 
 */
export async function getUserInfo({ charId }: { charId: string }): Promise<AxiosResponse<UserInfoType>> {
  return await axios.get(`${charId}.json`)
} 
