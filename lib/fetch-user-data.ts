import { MeOutput } from "@/dtos/user/me.dto";
import axiosInstance from "./axios";
import { UserEntity } from "@/entities/user.entity";

export const getUserProfileById = async (userId: string) => {
  try {
    const { data }: { data: MeOutput } = await axiosInstance(
      `/api/admin/me?userId=${userId}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfileBySlug = async (slug: string) => {
  try {
    const { data }: { data: MeOutput } = await axiosInstance(
      `/api/public/user?slug=${slug}`
    );

    return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const { data }: { data: { users: UserEntity[]; ok: boolean } } =
      await axiosInstance("/api/public/users");

    return data.users;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
