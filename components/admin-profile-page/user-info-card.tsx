"use client";

import { FC, useEffect, useState } from "react";
import UserAvatar from "../user-avatar";
import { getUserProfileById } from "@/lib/fetch-user-data";
import { UserEntity } from "@/entities/user.entity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  userId: string;
}

const UserInfoCard: FC<Props> = ({ userId }): JSX.Element => {
  const [user, setUser] = useState<UserEntity>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    const data = await getUserProfileById(userId);
    if (data.user) {
      setUser(data.user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]" />
      ) : (
        <div className="admin-card relative text-center pb-6">
          <UserAvatar wrapperClasses="w-[120px] aspect-square absolute -top-10 left-1/2 -translate-x-1/2 admin-item-shadow" />
          <p className="text-sm mb-3">Tác giả / Quản trị viên</p>
          <h1 className="font-bold text-2xl mb-3">{user?.name}</h1>
          <p className="w-[90%] mx-auto text-sm leading-7">
            {user?.description}
          </p>
        </div>
      )}
    </>
  );
};

export default UserInfoCard;
