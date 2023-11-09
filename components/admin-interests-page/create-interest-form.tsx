"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useState } from "react";
import BtnWithIcon from "../btn-with-icon";
import { TiArrowBack } from "react-icons/ti";
import NextImage from "../next-image";
import { MdFileUpload } from "react-icons/md";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blobToBase64 } from "@/lib/blobToBase64";
import FormInput from "../form-input";
import TextEditor from "../text-editor";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CoreOutput } from "@/dtos/common.dto";
import BtnWithLoading from "../btn-with-loading";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sở thích"),
  description: Yup.string().required(
    "Vui lòng nhập đoạn mô tả ngắn về sở thích"
  ),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho sở thích"),
});

interface FormValues {
  name: string;
  description: string;
  slug: string;
}

interface Props {}

const CreateInterestForm: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, getValues, setValue } = form;

  const { errors } = formState;

  const uploadThumbnailHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setThumbnail(base64.toString());
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.post(
        "/api/admin/interest",
        {
          ...formData,
          thumbnail,
        }
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo sở thích ${formData.name} thành công`);
        return router.back();
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };
  return (
    <>
      <div className="admin-card-body relative !pb-24">
        <div className="text-right mb-6">
          <BtnWithIcon
            content="Trở về trang trước"
            icon={TiArrowBack}
            iconSize={22}
            onClick={() => router.back()}
          />
        </div>

        <div className="flex items-center gap-6">
          <label
            htmlFor="thumbnail"
            className=" relative w-[55%] aspect-[1.78] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
          >
            {thumbnail ? (
              <NextImage
                src={thumbnail}
                alt="Thumbnail cho sở thích"
                className="rounded-md overflow-hidden w-full h-full"
              />
            ) : (
              <>
                <MdFileUpload size={50} className="text-admin_primary" />
                <span className="text-admin_primary font-semibold">
                  Chọn ảnh đại diện cho sở thích
                </span>
                <span className="mt-1 text-slate-700">( Tỷ lệ ảnh: 16/9 )</span>
              </>
            )}

            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              hidden
              onChange={uploadThumbnailHandler}
            />
          </label>

          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <FormInput
              id="name"
              label="Tên sở thích"
              register={register("name")}
              errorMsg={errors.name?.message}
              placeholder="Nhập tên sở thích"
            />

            <FormInput
              id="slug"
              label="Đường dẫn (URL)"
              register={register("slug")}
              errorMsg={errors.slug?.message}
              placeholder="Nhập đường dẫn đến trang sở thích"
            />

            <FormInput
              textarea
              id="description"
              rows={4}
              label="Mô tả"
              register={register("description")}
              errorMsg={errors.description?.message}
              placeholder="Nhập mô tả ngắn gọn về sở thích"
            />

            <BtnWithLoading
              content="Tạo sở thích"
              isLoading={isLoading}
              type="submit"
              customClasses="!absolute bottom-12 right-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateInterestForm;
