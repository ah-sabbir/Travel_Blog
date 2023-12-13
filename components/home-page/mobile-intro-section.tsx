"use client";

import { FC, useState } from "react";
import { intro } from "@/constant";
import parse from "html-react-parser";
import { FaAngleDown } from "react-icons/fa";
import MenuModal from "../layout/menu-modal";

interface Props {}

const MobileIntroSection: FC<Props> = (props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className="w-[80%] mx-auto italic text-lg max-[770px]:text-[15px] max-[480px]:text-[14px] leading-9 text-white text-center">
          {parse(intro)}

          <div
            onClick={() => setOpen(true)}
            className="relative group w-fit mx-auto border border-white py-1 px-4 mt-4 rounded-full flex items-center gap-1"
          >
            Chọn một điểm đến <FaAngleDown size={16} />
          </div>
        </div>
      </div>

      <MenuModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MobileIntroSection;
