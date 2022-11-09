import Link from "next/link";
import type { NextPage } from "next";
import Seo from "../components/Seo";

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Home" />
      <p className="text-color-4">
        안녕하세요. 검색하고 싶은 캐릭터를 검색하세요
      </p>
      <Link href={"/infoChar"}>
        <button className="mt-10 bg-color-4 hover:bg-color-3 text-color-2 font-bold py-2 px-4 rounded-full">
          검색
        </button>
      </Link>
    </>
  );
};

export default Home;
