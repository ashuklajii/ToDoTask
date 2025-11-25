"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

export default function SearchBar({ onSearch, onAddCategory }: any) {
  const [searchText, setSearchText] = useState("");
  

  return (
    <div
      className="
        flex flex-row md:gap-0 sm:gap-2
        sm:flex-row sm:items-center sm:justify-between 
        pb-3 pt-3
          sm:w-[380px]  sm:mx-20 sm:h-[75px] w-[325px] gap-1 xxs:w-[210px] xs:w-[310px] xsmd:w-[360px]
      sm:ml-3 ml-2"
    >
      {/* SEARCH FIELD */}
      <div
        className="
          flex items-center gap-3
          w-full h-[48px]
          rounded-full px-3
          bg-dark
          border border-white/10
          shadow-[0_4px_20px_rgba(0,0,0,0.35)]
          backdrop-blur-md
        "
      >
        <Search size={18} className="text-textcolor" />

        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search list"
          className="
            bg-transparent outline-none
            text-sm flex-1
            text-basetext14 
          "
        />
      </div>

      {/* PLUS BUTTON */}
      <button
        onClick={onAddCategory}
        className="
          w-[44px] h-[44px] px-3
          rounded-full
         bg-dark
          flex items-center justify-center
          border border-white/10
          shadow-[0_4px_20px_rgba(0,0,0,0.35)]
          hover:bg-[#2e2e2e] transition

          mx-auto
          sm:mx-0 sm:ml-2
        "
      >
        <Plus size={18} className="text-textcolor" />
      </button>
      
    </div>
  );
}
