"use client";

import AdminHeader from "@/components/layout/admin-header";
import AdminSidebar from "@/components/layout/admin-sidebar";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: ReactNode;
}

const AdminPageLayout: FC<Props> = ({ children }): JSX.Element => {
  const isExpand = useSelector((state: RootState) => state.adminSidebar.expand);
  return (
    <>
      <div className="bg-[#eee] text-[#3c4858]">
        <AdminSidebar isExpand={isExpand} />
        <div className={`${isExpand ? "ml-[260px]" : "ml-[80px]"}`}>
          <AdminHeader isExpand={isExpand} />
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminPageLayout;
