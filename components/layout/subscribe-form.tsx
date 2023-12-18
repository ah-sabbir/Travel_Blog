"use client";

import { FC, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "../btn-with-loading";
import { subcribeHandler } from "@/lib/subcribe";
import toast from "react-hot-toast";

interface Props {}

interface FormValues {
  email: string;
}

const schema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

const SubscribeForm: FC<Props> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await subcribeHandler(data.email);

      if (res?.ok) {
        toast.success("Đăng ký bản tin thành công!");
      }

      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-center gap-5 max-[390px]:block">
        <input
          type="email"
          {...register("email")}
          className="flex-1 h-[48px] rounded-[40px] outline-none px-4 text-black_text max-[390px]:w-full"
          placeholder="Nhập địa chỉ email của bạn"
        />
        <BtnWithLoading
          type="submit"
          content="Đăng ký"
          isLoading={isLoading}
          disabled={isLoading}
          customClasses="w-fit max-[390px]:!w-full max-[390px]:!mt-3 !rounded-[40px] before:!rounded-[40px]"
        />
      </div>
    </form>
  );
};

export default SubscribeForm;
