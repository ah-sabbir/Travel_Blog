import { path } from "@/constant";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const MobileReadMoreMenu: FC<Props> = (props): JSX.Element => {
  return (
    <ul className="text-black_text">
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
        <Link href={path.allBrandTypes}>Phân loại thương hiệu</Link>
      </li>

      <li className="py-4 px-5 border-b border-light_gray hover:bg-light_gray transition rounded-b-md">
        <Link href={path.allTicketTypes}>Phân loại vé</Link>
      </li>
    </ul>
  );
};

export default MobileReadMoreMenu;
