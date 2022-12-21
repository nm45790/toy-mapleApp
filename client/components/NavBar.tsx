import { GiHamburgerMenu } from "react-icons/Gi";

export default function NavBar() {
  return (
    <>
      <nav className="bg-ivory pt-5 pb-5 px-16 text-2xl font-bold  w-full shadow-md z-10 flex flex-row justify-center items-center space-x-5">
        <div className="">
          <p>MapleStory Card Maker</p>
        </div>
        <div className="space-x-10"></div>
      </nav>
    </>
  );
}
