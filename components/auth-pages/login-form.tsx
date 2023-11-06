"use client";

import { FC, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "@/components/form-input";
import AuthSwitchBtns from "@/components/auth-pages/auth-switch-btns";
import { signIn } from "next-auth/react";
import { path } from "@/constant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu cần ít nhất 6 kí tự"),
});

interface Props {}

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: FC<Props> = (props): JSX.Element | null => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, getValues } = form;

  const { errors } = formState;

  const onSubmit = async () => {
    const { email, password } = getValues();
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setIsLoading(false);
        return toast.error("Kiểm tra lại email hoặc password");
      }

      setIsLoading(false);
      router.replace(path.dashboard);
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <div className="grid place-items-center admin-login-background">
      <div className="w-[400px] mx-auto min-h-[300px]">
        <AuthSwitchBtns isActive="login" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-10 shadow-md px-4 pt-6 py-8 rounded-md bg-black/50"
        >
          <h1 className="font-extrabold text-2xl text-center mb-4 text-white">
            Đăng nhập
          </h1>
          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            errorMsg={errors.email?.message}
            placeholder="Enter your email"
            labelCustomClasses="!text-white"
          />

          <div className="relative">
            <FormInput
              id="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              register={register("password")}
              errorMsg={errors.password?.message}
              placeholder="Enter your password"
              labelCustomClasses="!text-white"
            />
            <div
              className="absolute right-3 top-[34px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <span className="text-sm font-extrabold">Ẩn</span>
              ) : (
                <span className="text-sm font-extrabold">Hiện</span>
              )}
            </div>
          </div>

          <BtnWithLoading
            content="Đăng nhập"
            isLoading={isLoading}
            customClasses="mt-2 w-full uppercase"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
