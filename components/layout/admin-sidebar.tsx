"use client";

import { FC } from "react";
import Logo from "../logo";
import ProfileAccordion from "./profile-accordion";
import { adminSidebarItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {}

const AdminSidebar: FC<Props> = (props): JSX.Element => {
  const pathName = usePathname();
  return (
    <aside className="bg-[#191919] h-full max-h-full fixed top-0 bottom-0 left-0 z-[2] w-[260px] admin-sidebar-shadow text-white overflow-y-scroll">
      <div className="fixed top-0 bottom-0 left-0 w-[254px] admin-sidebar-background z-[1]"></div>
      <div className="fixed top-0 bottom-0 left-0 w-[254px] bg-black opacity-80 z-[3]"></div>
      <div className="relative z-[4]">
        <Logo wrapperClasses="w-[200px] h-10 mx-auto my-6" />
        <ProfileAccordion />

        <div className="">
          {adminSidebarItems.map((item, index) => (
            <Link
              href={item.link}
              key={item.title}
              className={`admin-sidebar-item gap-4 mx-4 my-2 ${
                pathName === item.link && "bg-[#c8c8c833] text-white"
              }`}
            >
              {item.icon({ size: 23 })} {item.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
