"use client";
import BtnWithIcon from "@/components/btn-with-icon";
import SearchTabs from "@/components/search-page/search-tabs";
import { path } from "@/constant";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Props {}

import { FC } from "react";

interface Props {}

const SearchResults: FC<Props> = (props): JSX.Element => {
  const searchParams = useSearchParams();
  const query = searchParams.get("tu-khoa");
  const [newQuery, setNewQuery] = useState("");
  const router = useRouter();
  const [totalResults, setTotalResults] = useState(0);

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!newQuery || !newQuery.trim()) {
      return;
    }

    router.push(`${path.search}?tu-khoa=${newQuery}`);
  };

  useEffect(() => {
    if (query) {
      setNewQuery(query);
    }
  }, [query]);

  return (
    <>
      <div className="sub-page-cover relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <p className="text-lg font-bold mb-1">Bạn đang tìm kiếm điều gì?</p>
          <form
            onSubmit={searchHandler}
            className="flex items-center w-[760px] py-[2px] pl-8 pr-[2px] bg-white rounded-[22px]"
          >
            <input
              type="text"
              className="flex-1 py-2 h-full outline-none text-2xl"
              onChange={(e) => setNewQuery(e.target.value)}
              value={newQuery || ""}
            />

            <BtnWithIcon
              content="Tìm kiếm"
              type="submit"
              customClasses="!text-xl !w-[120px] !h-[80px] before:!rounded-r-[22px] !rounded-r-[22px]"
            />
          </form>
          <p className="mt-2 text-sm">
            <span className="font-bold">{totalResults} kết quả</span> được tìm
            thấy cho từ khóa &quot;{query}
            &quot;
          </p>
        </div>
      </div>

      <SearchTabs query={query} setTotalResults={setTotalResults} />
    </>
  );
};

export default SearchResults;
