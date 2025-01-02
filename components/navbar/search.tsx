"use client";

import React, { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import qs from "query-string";

const Search = () => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: value,
        },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-r-none focus-visible:ring-0 pr-8 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-2.5 right-12 size-5 cursor-pointer"
          onClick={() => setValue("")}
        />
      )}
      <Button size="sm" variant="secondary" className="rounded-l-none">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
