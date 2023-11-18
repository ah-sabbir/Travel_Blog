import { RootState } from "@/redux/store";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const AdminChilren: FC<Props> = ({ children }): JSX.Element => {
  const isExpand = useSelector((state: RootState) => state.adminSidebar.expand);

  return (
    <div className={`${isExpand ? "ml-[260px]" : "ml-[80px]"}`}>{children}</div>
  );
};

export default AdminChilren;
