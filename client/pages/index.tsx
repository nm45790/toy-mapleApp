import type { NextPage } from "next";
import Seo from "../components/Seo";
import { inputCharState } from "../state/inputCharState";
import { useRecoilState } from "recoil";
import InputIdForm from "../components/inputIdForm";
import CharCards from "../components/charCards";
import axios from 'axios';

const Home: NextPage = () => {
  const [chars, setChars] = useRecoilState(inputCharState);
  let charsStr="";
  chars.map(v=>charsStr+=v.name+",")

  // const searchApi = () => {
  //       const url = "http://localhost:8080/api/searchInfo";
  //       const id = charsStr
  //       console.log(url);
  //       console.log("id:" , id);
  //       axios.get(url, {params:{ "id": id }})
  //       .then(function(response) {
  //           console.log(response.data);
  //           console.log("성공");
  //       })
  //       .catch(function(error) {
  //           console.log(error);
  //           console.log("실패");
  //       })
  // }

  return (
    <>
      <Seo title="Home" />
      <InputIdForm />
      <CharCards/>
    </>
  );
};
export default Home;
