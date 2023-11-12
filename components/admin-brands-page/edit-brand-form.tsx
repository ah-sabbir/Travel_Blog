"use client";

import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import FormOptimizedSelect, { ISelectOption } from "../form-optimized-select";
import { CreateBrandInput } from "@/dtos/brand/create-brand.dto";
import { getAllBrandTypes } from "@/lib/fetch-brand-type-data";
import { BrandEntity } from "@/entities/brand.entity";
import { EditBrandInput } from "@/dtos/brand/edit-brand.dto";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên thương hiệu"),
  description: Yup.string().required(
    "Vui lòng nhập đoạn mô tả ngắn về thương hiệu"
  ),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho thương hiệu"),
  link: Yup.string().required(
    "Vui lòng nhập website chính thức của thương hiệu"
  ),
});

interface FormValues {
  name: string;
  description: string;
  slug: string;
  link: string;
  affLink: string;
}

interface Props {
  brand: BrandEntity | undefined;
}

const EditBrandForm: FC<Props> = ({ brand }): JSX.Element => {
  const router = useRouter();
  const [logo, setLogo] = useState(brand?.logo.url || "");
  const [content, setContent] = useState(brand?.content || "");

  const [brandTypes, setBrandTypes] = useState<ISelectOption[]>();
  const [selectedBrandType, setSelectedBrandType] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      link: "",
      affLink: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const uploadlogoHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setLogo(base64.toString());
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      const requestBody: EditBrandInput = {
        ...formData,
        content,
        logo,
        brandTypeId: selectedBrandType.value,
        brandId: brand?._id.toString() as string,
      };
      const { data }: { data: CoreOutput } = await axiosInstance.put(
        "/api/admin/brand",
        requestBody
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật thương hiệu ${formData.name} thành công`);
        return router.back();
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  const fetchBrandTypes = async () => {
    const brandTypes = await getAllBrandTypes("name");
    const formattedBrandTypes = brandTypes?.map((brandType) => ({
      label: brandType.name,
      value: brandType._id.toString(),
    }));
    setBrandTypes(formattedBrandTypes as ISelectOption[]);
  };

  useEffect(() => {
    fetchBrandTypes();
  }, []);

  useEffect(() => {
    setValue("affLink", brand?.affLink || "");
    setValue("description", brand?.description || "");
    setValue("link", brand?.link || "");
    setValue("name", brand?.name || "");
    setValue("slug", brand?.slug || "");
  }, []);

  useEffect(() => {
    const selectedBrandTypeName = brandTypes?.find(
      (item) => item.value === brand?.brandType?.toString()
    )?.label;

    if (selectedBrandTypeName && brandTypes?.length > 0) {
      setSelectedBrandType({
        value: brand?.brandType.toString() || "",
        label: selectedBrandTypeName || "",
      });
    }
  }, [brandTypes?.length]);

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <label
              htmlFor="logo"
              className="relative aspect-[1.78] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
            >
              {logo ? (
                <NextImage
                  src={logo}
                  alt="Logo cho thương hiệu"
                  className="rounded-md overflow-hidden w-full h-full"
                />
              ) : (
                <>
                  <MdFileUpload size={50} className="text-admin_primary" />
                  <span className="text-admin_primary font-semibold">
                    Chọn ảnh đại diện cho thương hiệu
                  </span>
                  <span className="mt-1 text-slate-700">
                    ( Tỷ lệ ảnh: 16/9 )
                  </span>
                </>
              )}

              <input
                type="file"
                name="logo"
                id="logo"
                hidden
                onChange={uploadlogoHandler}
              />
            </label>

            <div>
              <FormInput
                id="name"
                label="Tên thương hiệu"
                register={register("name")}
                errorMsg={errors.name?.message}
                placeholder="Nhập tên thương hiệu"
              />

              <FormInput
                id="slug"
                label="Đường dẫn (URL)"
                register={register("slug")}
                errorMsg={errors.slug?.message}
                placeholder="Nhập đường dẫn đến trang thương hiệu"
              />

              <FormOptimizedSelect
                id="region"
                label="Chọn danh mục"
                onChange={
                  setSelectedBrandType as Dispatch<
                    SetStateAction<ISelectOption>
                  >
                }
                options={brandTypes as ISelectOption[]}
                value={selectedBrandType}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <FormInput
              id="link"
              label="Official link"
              register={register("link")}
              errorMsg={errors.link?.message}
              placeholder="Nhập địa chỉ website của thương hiệu"
            />

            <FormInput
              id="link"
              label="Affliate link"
              register={register("affLink")}
              placeholder="Nhập link Affiliate của thương hiệu"
            />
          </div>

          <FormInput
            textarea
            id="description"
            rows={4}
            label="Mô tả"
            register={register("description")}
            errorMsg={errors.description?.message}
            placeholder="Nhập mô tả ngắn gọn về thương hiệu"
          />

          <label className="form-input-label !mb-1 block">
            Đôi nét về thương hiệu
          </label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Cập nhật thương hiệu"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default EditBrandForm;
