"use client";

import { FC, useEffect, useState } from "react";
import Logo from "../logo";
import { BiSolidChevronDown } from "react-icons/bi";
import DestinationsDropdown from "./destinations-dropdown";
import CategoriesDropdown from "./categories-dropdown";
import ServicesDropdown from "./services-dropdown";
import AboutUsDropdown from "./about-us-dropdown";
import SearchBar from "./search-bar";
import SocialItems from "../social-items";
import { usePathname } from "next/navigation";
import HamburgerIcon from "@/public/assets/images/icons/hamburger";
import MenuModal from "./menu-modal";

interface Props {}
const liClasses =
  "group relative font-black flex justify-center items-center gap-1 hover:bg-[#f0f0f040] rounded-2xl pl-[10px] pr-1 py-1 transition cursor-pointer after:absolute after:top-full after:left-0 after:block after:bg-transparent after:w-full after:h-8";

const Header: FC<Props> = (props): JSX.Element => {
  const [changeBg, setChangeBg] = useState(false);
  const pathName = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    const scrollHandler: any = () => {
      const position =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (position > 80) {
        setChangeBg(true);
      } else {
        setChangeBg(false);
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <header
        className={`z-10 fixed top-0 right-0 left-0 py-3 ${
          changeBg && "bg-black_text !text-white"
        } ${pathName === "/" ? "text-white" : "text-black_text"} transition`}
      >
        <div className="container flex items-center justify-between max-[1250px]:justify-center">
          <div className="flex items-center gap-8">
            <Logo wrapperClasses="w-[150px] h-[30px]" />

            <ul className="flex items-center gap-2 max-[1250px]:hidden">
              <div className={liClasses}>
                Điểm đến <BiSolidChevronDown size={18} />
                <DestinationsDropdown wrapperClasses="-left-1/3" />
              </div>

              <li className={liClasses}>
                Danh mục <BiSolidChevronDown size={18} />
                <CategoriesDropdown />
              </li>

              <div className={liClasses}>
                Dịch vụ
                <BiSolidChevronDown size={18} />
                <ServicesDropdown />
              </div>

              <div className={liClasses}>
                Tìm đọc theo
                <BiSolidChevronDown size={18} />
                <AboutUsDropdown />
              </div>
            </ul>
          </div>

          <div className="flex items-center gap-2 max-[1250px]:hidden">
            <SearchBar />
            <SocialItems />
          </div>

          <button
            onClick={() => setOpenMobileMenu(true)}
            className="absolute w-10 h-10 top-2 right-4 bg-white circle-radius hidden max-[1250px]:grid place-items-center"
          >
            <HamburgerIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <MenuModal
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      />
    </>
  );
};

export default Header;
