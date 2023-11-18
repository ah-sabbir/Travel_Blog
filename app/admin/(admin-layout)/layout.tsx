"use client";

import AdminHeader from "@/components/layout/admin-header";
import AdminSidebar from "@/components/layout/admin-sidebar";
import { FC, ReactNode } from "react";
import { GlobalStateProvider } from "@/providers/redux-provider";
import AdminChilren from "@/components/layout/admin-children";

interface Props {
  children: ReactNode;
}

const AdminPageLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <GlobalStateProvider>
      <div className="bg-[#eee] min-h-screen text-[#3c4858]">
        <AdminSidebar />
        <AdminHeader />
        <AdminChilren>{children}</AdminChilren>
      </div>
    </GlobalStateProvider>
  );
};

export default AdminPageLayout;
