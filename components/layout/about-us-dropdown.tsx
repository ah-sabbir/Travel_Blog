import { path } from "@/constant";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const AboutUsDropdown: FC<Props> = (props): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[130%] -left-[10%] text-black_text w-[160px]">
      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href={path.allGalleries}>Thư viện ảnh</Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-t-md">
        <Link href={path.allRegions}>Tỉnh / thành</Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition">
        <Link href={path.allDestinations}>Địa danh</Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition">
        <Link href={path.allInterests}>Sở thích</Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-b-md">
        <Link href={path.allTickets}>Vé / tour</Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-b-md">
        <Link href={path.introduce}>Về tôi</Link>
      </li>
    </div>
  );
};

export default AboutUsDropdown;
