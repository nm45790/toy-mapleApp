// import SideBar from "./SideBar";
import React from "react";
import Topbar from "./TopBar";

type ChildernProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildernProps) {
  return (
    <>
      {/* <SideBar /> */}
      <Topbar />
      <div>{children}</div>
    </>
  );
}
