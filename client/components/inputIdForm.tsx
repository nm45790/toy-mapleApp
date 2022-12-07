import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { inputCharState } from "../state/inputCharState";
import { loadingState } from "../state/loadingState";
import { DefaultUserInfoType } from "../types/charCardsType";

type Inputs = {
  name: string;
};

interface Props {
  fetchUserInfo: (charId: string) => Promise<void>;
  setUserData: Dispatch<SetStateAction<DefaultUserInfoType[]>>;
}

export default function InputIdForm({ fetchUserInfo, setUserData }: Props) {
  const [chars, setChars] = useRecoilState(inputCharState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    setValue("name", "");
    setChars((v) => [...v, data]);
    setIsLoading(true);
    setTimeout(async () => {
      await fetchUserInfo(data.name);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="border-2 border-color-1 md:w-[768px] w-full p-4">
        <p>조회하고 싶은 캐릭터명을 기입 해주세요.</p>
        <div className="gird items-center sm:flex">
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
            <input
              className="w-full border-solid border-2 border-color-4 rounded-lg"
              placeholder="Enter your ID"
              {...register("name", {
                required: true,
                minLength: {
                  value: 2,
                  message: "너무 짧습니다!",
                },
              })}
            />
            {/* {errors.name?.type === "required" && (
              <span>캐릭터 명을 입력 해주세요</span>
            )}
            {errors.name?.type === "minLength" && (
              <span>{errors.name.message}</span>
            )} */}
            <input
              className="w-32 bg-slate-500 hover:bg-color-4 text-color-2 font-bold py-2 px-8 rounded-lg"
              value="추가"
              type="submit"
            />
          </form>
          <button
            onClick={() => {
              setUserData([]);
              setChars([]);
            }}
            className="w-32 bg-slate-500 hover:bg-color-4 text-color-2 font-bold py-2 px-8 rounded-lg"
          >
            초기화
          </button>
        </div>
        {/* <div className="mt-4 p-2 h-32 w-full border-solid border-2 border-color-4 rounded-lg">
          {chars.length === 0 ? (
            <p>캐릭터를 추가해주세요</p>
          ) : (
            chars.map((v, i) => <p key={"text" + i}>{v.name}</p>)
          )}
        </div> */}
      </div>
    </>
  );
}
