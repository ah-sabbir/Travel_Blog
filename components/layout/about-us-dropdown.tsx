import { path } from "@/constant";
import Link from "next/link";
import { FC } from "react";

interface Props {}
import { FiExternalLink } from "react-icons/fi";

const AboutUsDropdown: FC<Props> = (props): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[130%] -left-[10%] text-black_text w-[200px]">
      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href={path.allRegions} className="flex gap-2">
          Tất cả tỉnh / thành <FiExternalLink size={14} className="-mt-1" />
        </Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href={path.allDestinations} className="flex gap-2">
          Tất cả địa danh <FiExternalLink size={14} className="-mt-1" />
        </Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href={path.allInterests} className="flex gap-2">
          Tất cả sở thích <FiExternalLink size={14} className="-mt-1" />
        </Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href={path.allTickets} className="flex gap-2">
          Tất cả vé / tour <FiExternalLink size={14} className="-mt-1" />
        </Link>
      </li>
    </div>
  );
};

export default AboutUsDropdown;
