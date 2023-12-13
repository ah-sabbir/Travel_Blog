import Link from "next/link";
import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  link: string;
  title: string;
}

const DropdownHeading: FC<Props> = ({ link, title }): JSX.Element => {
  return (
    <Link
      className="w-full flex items-center justify-between border-b border-light_gray pb-2 font-bold"
      href={link}
    >
      {title}
      <div className="rounded-full bg-light_gray p-[6px] hover:bg-bold_gray transition">
        <FaChevronRight size={12} />
      </div>
    </Link>
  );
};

export default DropdownHeading;
