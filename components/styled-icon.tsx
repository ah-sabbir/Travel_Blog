import { iconsFile } from "@/constant";
import { FC } from "react";

interface Props {
  position: string;
  iconClasses?: string;
  wrapperClasses: string;
}

const StyledIcon: FC<Props> = ({
  wrapperClasses,
  iconClasses,
  position,
}): JSX.Element => {
  return (
    <div className={`relative bg-light_pink circle-radius ${wrapperClasses}`}>
      <span
        className={`absolute w-full h-full ${iconClasses}`}
        style={{
          background: `url(${iconsFile})`,
          backgroundPosition: position,
          backgroundSize: "100%",
        }}
      ></span>
    </div>
  );
};

export default StyledIcon;
