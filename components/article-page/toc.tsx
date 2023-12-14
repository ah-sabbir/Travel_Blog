"use client";

import { FC, useEffect, useRef, useState } from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { MdOutlineFormatListNumbered } from "react-icons/md";

interface Props {
  selector: string;
}

const TOC: FC<Props> = ({ selector }): JSX.Element => {
  const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);
  const [currentHeadingID, setCurrentHeadingID] = useState<
    string | undefined
  >();

  const [expand, setExpand] = useState(false);

  const listWrapperRef = useRef<HTMLUListElement>(null);

  // Seting data-id cho heading và cập nhật state headings
  useEffect(() => {
    // Select tất cả h2, h3, h4, h5, h6 nằm trong class selector = content
    const headingList = document
      .querySelector(selector)!
      .querySelectorAll("h2,h3,h4") as NodeListOf<HTMLHeadElement>;

    // Gắn data-id vào cho các thẻ heading
    const headingArray = Array.from(headingList);
    headingArray.forEach((heading) => {
      heading.dataset.id = Math.round(Math.random() * 100000).toString();
    });

    setHeadings(headingArray);
  }, []);

  // Tìm currentHeading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
          }
        });
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 1 }
    );

    // Chọn phần tử muốn quan sát là các element heading nằm trong state headings
    if (headings.length) {
      headings.forEach((heading) => {
        observer.observe(heading);
      });
    }
  }, [headings.length]);

  // List tự động scroll dựa theo currentHeadingID
  useEffect(() => {
    const currentListItem = listWrapperRef.current?.querySelector(
      `li[data-id='${currentHeadingID}']`
    );

    if (currentListItem && currentHeadingID) {
      listWrapperRef.current?.scrollTo({
        top: (currentListItem as HTMLElement).offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentHeadingID]);

  return (
    <aside className="sticky block top-24">
      <nav
        className={`${
          expand ? "max-h-fit" : "max-h-[350px]"
        } border-l border-[#3c3c431f] no-scrollbar transition-max_height duration-500 overflow-y-scroll`}
      >
        <ul ref={listWrapperRef}>
          <div className="flex items-center gap-2 pl-10 tracking-widest text-lg text-gray-700 uppercase mb-4 font-extrabold">
            <MdOutlineFormatListNumbered className="w-5 h-w-5" /> Mục Lục
          </div>
          {headings.map((heading) => {
            // Match trả về số đầu tiên nằm trong tagName của các heading
            const tagLevel = heading.tagName.match(/(\d+)/)?.[0] || "1";
            return (
              <li
                key={heading.dataset.id}
                data-id={heading.dataset.id}
                style={{
                  fontStyle: tagLevel === "4" ? "italic" : "normal",
                  paddingLeft:
                    tagLevel === "4"
                      ? "72px"
                      : tagLevel === "3"
                      ? "56px"
                      : "40px",
                  fontSize:
                    tagLevel === "4"
                      ? "13px"
                      : tagLevel === "3"
                      ? "14px"
                      : "15px",
                }}
                className={`my-4 cursor-pointer line-clamp-1 ${
                  currentHeadingID === heading.dataset.id
                    ? "font-bold text-admin_primary border-l-2 border-admin_primary"
                    : "text-black_text"
                }`}
                onClick={() => {
                  window.scrollTo({
                    top:
                      heading.getBoundingClientRect().top +
                      window.scrollY -
                      100,
                    behavior: "smooth",
                  });
                }}
              >
                {heading.innerHTML}
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={() => setExpand(!expand)}
        className="ml-10 text-xs mt-8 block border rounded-md px-2 py-1 text-gray-500"
      >
        {expand ? (
          <span className="flex items-center gap-1">
            Thu gọn
            <IoChevronUpOutline />
          </span>
        ) : (
          <span className="flex items-center gap-1">
            Mở rộng
            <IoChevronDownOutline />
          </span>
        )}
      </button>
    </aside>
  );
};

export default TOC;
