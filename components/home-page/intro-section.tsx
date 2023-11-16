"use client";

import { FC } from "react";
import StyledIcon from "../styled-icon";
import { iconPosition, intro } from "@/constant";
import parse from "html-react-parser";
import { FaAngleDown } from "react-icons/fa";
import DestinationsDropdown from "../layout/destinations-dropdown";

interface Props {}

const IntroSection: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <StyledIcon
        position={iconPosition.hand}
        wrapperClasses={`w-[70px] h-[70px] mx-auto`}
      />
      <div className="w-[95%] italic font-arima text-2xl space-y-4 leading-10 text-[#424242] mt-5">
        {parse(intro)}

        <div className="flex items-center">
          <span>Lựa chọn điểm đến đầu tiên của bạn&nbsp;</span>
          <strong className="font-extrabold flex gap-1 cursor-pointer relative group underline">
            tại đây <FaAngleDown size={16} className="mt-[6px]" />
            <DestinationsDropdown wrapperClasses="right-0" />
          </strong>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
