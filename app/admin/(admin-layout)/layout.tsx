import AdminSidebar from "@/components/layout/admin-sidebar";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminPageLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <div className="flex bg-[#eee] text-[#3c4858]">
        <AdminSidebar />
        <div className="flex-1 h-screen">{children}</div>
      </div>
    </>
  );
};

export default AdminPageLayout;
