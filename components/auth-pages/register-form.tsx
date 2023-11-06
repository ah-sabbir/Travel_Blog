"use client";

import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import AuthSwitchBtns from "@/components/auth-pages/auth-switch-btns";
import BtnWithLoading from "@/components/btn-with-loading";
import axios from "@/lib/axios";
import { CreateAccountOutput } from "@/dtos/create-account.dto";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { path } from "@/constant";

interface Props {}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên"),
  email: Yup.string()
    .email("Email của bạn không hợp lệ")
    .required("Vui lòng nhập vào email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập vào mật khẩu"),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: FC<Props> = (props): JSX.Element => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { register, handleSubmit, formState, getValues, reset } = form;
  const { errors } = formState;

  const onSubmit = async () => {
    const { email, password, name } = getValues();
    setIsLoading(true);
    const { data } = await axios.post("/api/register", {
      email,
      password,
      name,
    });

    const res: CreateAccountOutput = data;

    if (res.ok) {
      reset();
      toast.success("Tạo tài khoản thành công");
      router.replace(path.login);
    } else {
      toast.error(res.error as string);
    }

    setIsLoading(false);
  };

  return (
    <div className="grid place-items-center admin-login-background">
      <div className="w-[400px] mx-auto min-h-[300px]">
        <AuthSwitchBtns isActive="signup" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-10 shadow-md px-4 pt-6 py-8 rounded-md bg-black/50"
        >
          <h1 className="font-extrabold text-2xl text-center mb-4 text-white">
            Tạo tài khoản
          </h1>
          <FormInput
            id="name"
            label="Tên đầy đủ"
            register={register("name")}
            errorMsg={errors.name?.message}
            placeholder="John Doe"
            labelCustomClasses="!text-white"
          />

          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            errorMsg={errors.email?.message}
            placeholder="Example@gmail.com"
            labelCustomClasses="!text-white"
          />

          <div className="relative">
            <FormInput
              id="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              register={register("password")}
              errorMsg={errors.password?.message}
              placeholder="Ít nhất 6 ký tự"
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
            content="ĐĂNG KÝ"
            isLoading={isLoading}
            customClasses="w-full"
            type="submit"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
