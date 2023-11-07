"use client";

import { FC } from "react";
import Logo from "../logo";
import ProfileAccordion from "./profile-accordion";
import { adminSidebarItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isExpand: boolean;
}

const AdminSidebar: FC<Props> = ({ isExpand }): JSX.Element => {
  const pathName = usePathname();
  return (
    <aside
      className={`bg-[#191919] h-full max-h-full fixed top-0 bottom-0 left-0 z-[2] admin-sidebar-shadow text-white overflow-y-scroll transition-width ${
        isExpand ? "w-[260px]" : "w-[80px]"
      }`}
    >
      <div
        className={`fixed top-0 bottom-0 left-0 w-[254px] admin-sidebar-background z-[1] ${
          isExpand ? "w-[260px]" : "w-[80px]"
        }`}
      ></div>
      <div
        className={`fixed top-0 bottom-0 left-0 w-[254px] bg-black opacity-80 z-[3] ${
          isExpand ? "w-[260px]" : "w-[80px]"
        }`}
      ></div>
      <div className="relative z-[4]">
        <Logo
          wrapperClasses={`h-10 mx-auto my-6 ${
            isExpand ? "w-[200px]" : "w-[60px]"
          }`}
        />
        <ProfileAccordion isExpand={isExpand} />

        <div className="">
          {adminSidebarItems.map((item, index) => (
            <Link
              href={item.link}
              key={item.title}
              className={`admin-sidebar-item gap-4 my-2 ${
                pathName === item.link && "admin-main-gradient !text-white"
              } ${isExpand ? "mx-4 my-2" : "ml-2 mr-[10px]"}`}
            >
              {item.icon({ size: 23 })}{" "}
              <span className={`${!isExpand && "hidden"}`}>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
