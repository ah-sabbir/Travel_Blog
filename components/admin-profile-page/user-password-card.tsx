"use client";

import { FC, useState } from "react";
import AdminCardTitle from "../admin-card-title";
import { GiPadlock } from "react-icons/gi";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import {
  ChangePasswordInput,
  ChangePasswordOutput,
} from "@/dtos/user/change-password.dto";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

interface Props {
  userId: string;
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

const schema: any = Yup.object({
  currentPassword: Yup.string().required("Vui lòng nhập hiện tại"),
  newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới"),
  confirmationPassword: Yup.string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([Yup.ref("newPassword")], "Vui lòng nhập lại chính xác mật khẩu"),
});

const UserPasswordCard: FC<Props> = ({ userId }): JSX.Element => {
  const form = useForm<FormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmationPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState, getValues, setValue } = form;

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);
      const { currentPassword, newPassword } = formData;
      const bodyRequest: ChangePasswordInput = {
        id: userId,
        currentPassword,
        newPassword,
      };
      const { data }: { data: ChangePasswordOutput } = await axiosInstance.put(
        "/api/admin/change-password",
        bodyRequest
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success("Thay đổi mật khẩu thành công");
        setIsLoading(false);
        signOut();
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="admin-card">
      <AdminCardTitle
        cardTitle="Cập nhật mật khẩu"
        cardIconClasses="admin-main-gradient"
        icon={GiPadlock}
        iconSize={22}
      />

      <form className="admin-card-body !mt-8" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="currentPassword"
          label="Mật khẩu hiện tại"
          register={register("currentPassword")}
          errorMsg={errors.currentPassword?.message}
          placeholder="Nhập mật khẩu hiện tại"
          type="password"
        />

        <FormInput
          id="newPassword"
          label="Mật khẩu mới"
          register={register("newPassword")}
          errorMsg={errors.newPassword?.message}
          placeholder="Nhập mật khẩu mới"
          type="password"
        />

        <FormInput
          id="confirmationPassword"
          label="Xác nhận mật khẩu"
          register={register("confirmationPassword")}
          errorMsg={errors.confirmationPassword?.message}
          placeholder="Nhập lại mật khẩu mới một lần nữa"
          type="password"
        />

        <div className="text-right">
          <BtnWithLoading
            isLoading={isLoading}
            content="Đổi mật khẩu"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserPasswordCard;
