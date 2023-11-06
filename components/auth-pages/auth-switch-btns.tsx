import { path } from "@/constant";
import Link from "next/link";
import { FC } from "react";

interface Props {
  isActive: string;
}

const commonClasses =
  "px-3 py-[6px] rounded-full font-bold text-sm cursor-pointer";
const activeClasses = "admin-main-gradient text-white font-extrabold";

const AuthSwitchBtns: FC<Props> = ({ isActive }): JSX.Element => {
  return (
    <div className="flex rounded-full bg-[#e7e7e7] w-fit mx-auto">
      <Link
        href={path.login}
        className={`${commonClasses} ${isActive === "login" && activeClasses}`}
      >
        Đăng nhập
      </Link>
      <Link
        href={path.signup}
        className={`${commonClasses} ${isActive === "signup" && activeClasses}`}
      >
        Đăng kí
      </Link>
    </div>
  );
};

export default AuthSwitchBtns;
