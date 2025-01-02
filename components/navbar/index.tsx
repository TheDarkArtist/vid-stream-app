import React from "react";
import Logo from "./logo";
import Search from "./search";
import Actions from "./actions";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-16 bg-slate-900 border-b border-slate-800 px-2 lg:px-4 z-[49] flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </div>
  );
};

export default Navbar;
