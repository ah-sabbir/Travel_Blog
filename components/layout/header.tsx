import { FC } from "react";
import Logo from "../logo";
import { BiSolidChevronDown } from "react-icons/bi";

interface Props {}
const liClasses =
  "font-black flex justify-center items-center gap-1 hover:bg-[#f0f0f040] rounded-2xl pl-[10px] pr-1 py-1 transition cursor-pointer";

const Header: FC<Props> = (props): JSX.Element => {
  return (
    <header className="z-10 mx-4 fixed top-0 right-0 left-0 py-2 flex items-center justify-between text-white">
      <div className="flex items-center gap-8">
        <Logo wrapperClasses="w-[150px] h-[30px]" />

        <ul>
          <li className={liClasses}>
            Điểm đến <BiSolidChevronDown size={18} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
