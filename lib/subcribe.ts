import axiosInstance from "./axios";

export const subcribeHandler = async (email: string) => {
  const { data }: { data: { ok: true; error?: string } } =
    await axiosInstance.post("/api/public/subcriber", { email });

  return data;
};
