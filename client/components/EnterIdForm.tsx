import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  name: string;
};

type IDetailInfo = {
  name: string;
};

export default function EnterIdForm() {
  const [charArr, setCharArr] = useState<IDetailInfo[]>([]);
  let arr: IDetailInfo[] = [];
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    arr.push(data);
    console.log(arr);
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
              {...register("name")}
            />
            <input
              className="w-16 ml-6 mr-6 bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded-lg"
              value="&rarr;"
              type="submit"
            />
          </form>
        </div>
        <div className="h-64 w-64 border-solid border-2 border-color-4 rounded-lg">
          {charArr.length === 0 ? (
            <p>캐릭터를 추가해주세요</p>
          ) : (
            charArr.map((v, i) => <p key={i}>{v.name}</p>)
          )}
        </div>
      </div>
    </>
  );
}
