"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import NextImage from "./next-image";

interface Props {
  wrapperClasses: string;
}

const UserAvatar: FC<Props> = ({ wrapperClasses }): JSX.Element => {
  const { data: session } = useSession();

  return (
    <div className={`${wrapperClasses} rounded-full overflow-hidden relative`}>
      <NextImage
        src={
          session?.user?.image || "/assets/images/admin/default-user-avt.png"
        }
        alt={session?.user?.name || ""}
      />
    </div>
  );
};

export default UserAvatar;
