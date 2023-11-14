import { FC } from "react";
import DropdownHeading from "./dropdown-heading";

interface Props {}

const ServicesDropdown: FC<Props> = (props): JSX.Element => {
  return (
    <div className="header-dropdown-card top-[150%] -left-1/3 text-black_text w-[780px]">
      <div className="pb-2 pt-6 px-6">
        <DropdownHeading link="" title="Dịch vụ cho chuyến đi" />
      </div>
    </div>
  );
};

export default ServicesDropdown;
