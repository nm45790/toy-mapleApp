import Image from "next/image";
import { useRecoilState } from "recoil";
import Spinner from "../../resource/loadingSpinner.gif";
import { loadingState } from "../state/loadingState";

export default function Loading() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  return (
    <>
    {isLoading ? 
     <div>
      <p>검색중 입니다 . . .</p>
      <Image src={Spinner} alt="로딩중" />
      <style jsx>{`
        div {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background: #ffffffb7;
          opacity:0.8;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      `}</style>
    </div> : null}
      </>
  );
}
