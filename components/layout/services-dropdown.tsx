import { FC } from "react";
import DropdownHeading from "./dropdown-heading";
import { headerServiceItems } from "@/data/menu";
import SmallArticleCard from "../small-article-card";
import SubArticleCard from "../sub-article-card";

interface Props {}

const ServicesDropdown: FC<Props> = (props): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[150%] -left-[200%] text-black_text w-[780px]">
      <div className="pb-2 pt-6 px-6">
        <DropdownHeading link="" title="Dịch vụ cho chuyến đi" />
      </div>

      <div className="py-3 pb-8 px-6 flex gap-2">
        <ul className="w-[43%]">
          {headerServiceItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-2 pt-[6px] pb-2 hover:bg-gray_hover rounded-md transition"
              >
                <span
                  style={{
                    background: "url(/assets/images/icons/icons.png)",
                    backgroundPosition: item.position,
                    backgroundSize: "100%",
                  }}
                  className={`block w-10 h-10 relative after:absolute ${
                    index === 0
                      ? "after:top-2 after:left-0"
                      : "after:top-1 after:left-1"
                  } after:block after:opacity-30 after:bg-[#D8C4C3] after:circle-radius after:w-[80%] after:h-[80%] after:rounded-[67%_59%_64%_52%_/_50%_63%_61%_69%]`}
                ></span>
                <div>
                  <p>{item.title}</p>
                  <p className="font-normal text-sm">{item.via}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex-1 space-y-1">
          <SmallArticleCard
            image="/assets/images/header/hoi-dap-travel-blogger.webp"
            title="Bày tỏ với tôi về thắc mắc của bạn về travel blogger"
            slug=""
          />

          <SmallArticleCard
            image="/assets/images/header/cach-de-len-ke-hoach-cho-1-chuyen-di.jpg"
            title="Cách để lên kế hoạch cho 1 chuyến đi: 7 tips cho hành trình tiếp theo của bạn"
            slug=""
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
    </div>
  );
};

export default ServicesDropdown;
