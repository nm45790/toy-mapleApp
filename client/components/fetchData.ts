import axios from "axios";

function fetchInfo(charId: string) {
  //Suspense api 호출
  let info: any = null;
  const suspender = axios
    .get(`${charId}.json`)
    .then((response) => {
      console.log("성공");
      console.log(response);
      info = response;
    })
    .catch((error) => {
      console.log(error);
      console.log("실패");
    });
  return {
    read() {
      if (info === null) {
        throw suspender;
      } else {
        return info;
      }
    },
  };
}
function fetchData(charId: string) {
  return {
    infoUser: fetchInfo(charId),
  };
}
export default fetchData;
