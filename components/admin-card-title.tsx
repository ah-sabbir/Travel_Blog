import { FC } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  iconSize: number;
  cardIconClasses: string;
  cardTitle: string;
}

const AdminCardTitle: FC<Props> = ({
  icon,
  iconSize,
  cardIconClasses,
  cardTitle,
}): JSX.Element => {
  return (
    <div className="ml-4 flex">
      <div
        className={`text-white px-5 py-4 mr-4 -mt-5 rounded-md grid place-items-center admin-item-shadow ${cardIconClasses}`}
      >
        {icon({ size: iconSize })}
      </div>
      <span className="mt-4 font-bold text-xl">{cardTitle}</span>
    </div>
  );
};

export default AdminCardTitle;
