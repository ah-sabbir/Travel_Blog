"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import NextImage from "../next-image";
import AdminCardTitle from "../admin-card-title";
import { FaRegUser } from "react-icons/fa";
import { ImCamera } from "react-icons/im";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import axiosInstance from "@/lib/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IUserSession } from "@/dtos/next-auth";
import { blobToBase64 } from "@/lib/blobToBase64";
import {
  EditProfileInput,
  EditProfileOutput,
} from "@/dtos/user/edit-profile.dto";
import toast from "react-hot-toast";
import BtnWithLoading from "../btn-with-loading";
import { getUserProfileById } from "@/lib/fetch-user-data";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

interface FormValues {
  name: string;
  email: string;
  description: string;
  facebook: string;
  twitter: string;
  youtube: string;
  linkedin: string;
}

interface Props {
  user: Partial<IUserSession>;
}

const UserProfileCard: FC<Props> = ({ user }): JSX.Element => {
  const [avatar, setAvatar] = useState(
    user?.image || "/assets/images/admin/default-user-avt.png"
  );

  const [isFetchUserLoading, setIsFetchUserLoading] = useState(false);
  const [isEditUserLoading, setIsEditUserLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      description: "",
      facebook: "",
      twitter: "",
      youtube: "",
      linkedin: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, getValues, setValue } = form;

  const { errors } = formState;

  const uploadAvatarHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setAvatar(base64.toString());
  };

  const onSubmit = async (formData: FormValues) => {
    setIsEditUserLoading(true);
    const bodyRequest: EditProfileInput = {
      ...formData,
      id: user._id as string,
      avatar,
    };
    const { data }: { data: EditProfileOutput } = await axiosInstance.put(
      "/api/admin/edit-profile",
      bodyRequest
    );

    if (data.error) {
      toast.error(data.error);
      setIsEditUserLoading(false);
      fetchUserById();
    }

    if (data.ok) {
      toast.success("Update thông tin cá nhân thành công");
      setIsEditUserLoading(false);
    }
  };

  const fetchUserById = async () => {
    setIsFetchUserLoading(true);
    const data = await getUserProfileById(user._id as string);

    const userInfo = data?.user;
    setValue("name", userInfo?.name || "");
    setValue("description", userInfo?.description || "");
    setValue("email", userInfo?.email || "");
    setValue("facebook", userInfo?.facebook || "");
    setValue("youtube", userInfo?.youtube || "");
    setValue("twitter", userInfo?.twitter || "");
    setValue("linkedin", userInfo?.linkedin || "");

    if (userInfo?.avatar?.url) {
      setAvatar(userInfo?.avatar.url);
    }

    setIsFetchUserLoading(false);
  };

  useEffect(() => {
    if (user._id) {
      fetchUserById();
    }
  }, []);

  return (
    <div className="admin-card">
      <AdminCardTitle
        cardTitle="Sửa thông tin cá nhân"
        cardIconClasses="admin-main-gradient"
        icon={FaRegUser}
        iconSize={18}
      />

      <form className="admin-card-body !mt-8" onSubmit={handleSubmit(onSubmit)}>
        <>
          {isFetchUserLoading ? (
            <>
              {[...Array(9).keys()].map((item) => (
                <Skeleton className="w-full h-[70px] mb-4" key={item} />
              ))}
            </>
          ) : (
            <>
              <div className="w-[120px] h-[120px] relative mx-auto mb-6">
                <NextImage
                  src={avatar}
                  alt={user?.name || ""}
                  className="rounded-full"
                />
                <label
                  htmlFor="avatar"
                  className="w-8 h-8 rounded-full absolute right-1 bottom-1 grid place-items-center bg-slate-700 text-white border border-white cursor-pointer"
                >
                  <ImCamera size={12} />
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  hidden
                  onChange={uploadAvatarHandler}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  id="name"
                  label="Tên đầy đủ"
                  register={register("name")}
                  errorMsg={errors.name?.message}
                  placeholder="Nhập tên đầy đủ"
                />

                <FormInput
                  id="email"
                  label="Email"
                  register={register("email")}
                  errorMsg={errors.email?.message}
                  placeholder="Nhập email"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  id="facebook"
                  label="Link Facebook"
                  register={register("facebook")}
                  placeholder="Nhập link facebook"
                />

                <FormInput
                  id="twitter"
                  label="Link Twitter"
                  register={register("twitter")}
                  placeholder="Nhập link twitter"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  id="youtube"
                  label="Link Youtube"
                  register={register("youtube")}
                  placeholder="Nhập link youtube"
                />

                <FormInput
                  id="linkedin"
                  label="Link Linkedin"
                  register={register("linkedin")}
                  placeholder="Nhập link linkedin"
                />
              </div>

              <FormInput
                textarea
                rows={4}
                id="description"
                label="Giới thiệu vắn tắt"
                register={register("description")}
                placeholder="Viết giới thiệu vắn tắt về bản thân"
              />
            </>
          )}
        </>

        <div className="text-right">
          <BtnWithLoading
            isLoading={isEditUserLoading}
            content="Xác nhận"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfileCard;
