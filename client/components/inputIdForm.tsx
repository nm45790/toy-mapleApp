import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { inputCharState } from "../state/inputCharState";

type Inputs = {
  name: string;
};

type IDetailInfo = {
  name: string;
};

export default function InputIdForm() {
  const [chars, setChars] = useRecoilState(inputCharState);
  let arr: IDetailInfo[] = [];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    arr.push(data);
    // console.log(arr);
    setValue("name", "");
    setChars((chars) => [...chars, ...arr]);
  };
  //   console.log(watch("name"));
  return (
    <>
      <div className="flex">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="h-12 w-64 border-solid border-2 border-color-4 rounded-lg"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
                minLength: {
                  value: 2,
                  message: "너무 짧습니다!",
                },
                // maxLength: {
                //   value: 6,
                //   message: "너무 깁니다",
                // },
              })}
            />
            {errors.name?.type === "required" && <span>캐릭터 명을 입력 해주세요</span>}
            {errors.name?.type === "minLength" && <span>{errors.name.message}</span>}
            {/* {errors.name?.type === "maxLength" && <span>{errors.name.message}</span>} */}
            <input
              className="w-16 ml-6 mr-6 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-lg"
              value="&rarr;"
              type="submit"
            />
          </form>
        </div>
        <div className="h-64 w-64 border-solid border-2 border-color-4 rounded-lg">
          {chars.length === 0 ? (
            <p>캐릭터를 추가해주세요</p>
          ) : (
            chars.map((v, i) => <p key={"text"+i}>{v.name}</p>)
          )}
        </div>
      </div>
    </>
  );
}
