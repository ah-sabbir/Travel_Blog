import { FC } from "react";
import DropdownHeading from "./dropdown-heading";
import { headerServiceItems } from "@/data/menu";
import SmallArticleCard from "../small-article-card";
import SubArticleCard from "../sub-article-card";
import StyledIcon from "../styled-icon";
import Link from "next/link";
import { path } from "@/constant";
import { FaChevronRight } from "react-icons/fa";

interface Props {}

const MobileServiceMenu: FC<Props> = (props): JSX.Element => {
  return (
    <div className="text-black_text">
      <div className="py-3 max-[1250px]:pt-0 pb-8 flex max-[766px]:block gap-2">
        <ul className="w-[38%] max-[766px]:w-full">
          {headerServiceItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-2 pt-[6px] pb-2 hover:bg-light_gray rounded-md transition"
              >
                <StyledIcon
                  position={item.position}
                  wrapperClasses={`w-10 h-10`}
                  iconClasses={index === 0 ? "left-[3px]" : ""}
                />
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="font-normal text-sm">{item.via}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex-1">
          <SmallArticleCard
            image="/assets/images/header/hoi-dap-travel-blogger.webp"
            title="Bày tỏ với tôi về thắc mắc của bạn về travel blogger"
            slug=""
          />

          <SmallArticleCard
            image="/assets/images/header/cach-de-len-ke-hoach-cho-1-chuyen-di.jpg"
            title="Cách để lên kế hoạch cho 1 chuyến đi: 7 tips cho hành trình tiếp theo của bạn"
            slug=""
            isLastItem
          />

          <div className="m-2">
            <SubArticleCard
              image="/assets/images/header/bao-hiem-du-lich-2023.webp"
              title="Những dịch vụ bảo hiểm du lịch tốt nhất 2023"
              slug=""
            />
          </div>
        </div>
      </div>

      <Link
        href={path.allBrands}
        className="flex items-center justify-center gap-2 py-3 bg-[#DFF0F0] hover:underline rounded-b-md"
      >
        Tất cả dịch vụ <FaChevronRight size={12} />
      </Link>
    </div>
  );
};

export default MobileServiceMenu;
