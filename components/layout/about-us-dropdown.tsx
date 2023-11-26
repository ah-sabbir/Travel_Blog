import Link from "next/link";
import { FC } from "react";

interface Props {}
import { FiExternalLink } from "react-icons/fi";

const AboutUsDropdown: FC<Props> = (props): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[130%] -left-[10%] text-black_text w-[165px]">
      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href="">Câu chuyện</Link>
      </li>
      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href=""
          className="flex gap-1"
        >
          Instagram <FiExternalLink />
        </a>
      </li>
      <li className="py-4 px-5 hover:bg-light_gray transition rounded-b-md">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href=""
          className="flex gap-1"
        >
          Youtube <FiExternalLink />
        </a>
      </li>
    </div>
  );
};

export default AboutUsDropdown;
