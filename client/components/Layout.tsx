// import SideBar from "./SideBar";
import NavBar from "./NavBar";
import React from "react";

type ChildernProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildernProps) {
  return (
    <>
      {/* <SideBar /> */}
      <NavBar />
      <div>{children}</div>
    </>
  );
}
