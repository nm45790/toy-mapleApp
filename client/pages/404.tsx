import Image from "next/image";
import ErrorImage from "../../resource/404image.jpeg";

export default function NotFound(){
    return (
        <div>
            <p>이 페이지는 없는 페이지 입니다. 대신 귀여운 단추 사진을 드리겠습니다.</p>
            <Image src={ErrorImage}/>
        </div>
    )
}