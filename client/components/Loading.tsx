import Image from "next/image";
import Spinner from "../../resource/loadingSpinner.gif";

export default function Loading(prop:any) {
  return (
    <div>
      <p>{prop.name}를 검색하고 있습니다.</p>
      <Image src={Spinner} alt="로딩중" />
      <style jsx>{`
        div {
          position: absolute;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background: #ffffffb7;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
