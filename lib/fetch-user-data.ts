import { MeOutput } from "@/dtos/user/me.dto";
import axiosInstance from "./axios";

export const getUserProfileById = async (userId: string) => {
  const { data }: { data: MeOutput } = await axiosInstance(
    `/api/admin/me?userId=${userId}`
  );

  return data;
};
