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
import { getAllCountries } from "@/lib/fetch-country-data";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên tỉnh / vùng miền"),
  description: Yup.string().required(
    "Vui lòng nhập đoạn mô tả ngắn về tỉnh / vùng miền"
  ),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho tỉnh / vùng miền"),
});

interface FormValues {
  name: string;
  description: string;
  slug: string;
}

interface Props {}

const CreateRegionForm: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState("");
  const [banner, setBanner] = useState("");
  const [content, setContent] = useState("");
  const [countries, setCountries] = useState<ISelectOption[]>();
  const [selectedCountry, setSelectedCountry] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

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

  const uploadBannerHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setBanner(base64.toString());
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.post(
        "/api/admin/region",
        {
          ...formData,
          content,
          thumbnail,
          banner,
          countryId: selectedCountry.value,
        }
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo tỉnh / vùng miền ${formData.name} thành công`);
        return router.back();
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  const fetchCountries = async () => {
    const fetchedCountries = await getAllCountries("name");
    const formattedCountries = fetchedCountries?.map((country) => ({
      label: country.name,
      value: country._id.toString(),
    }));
    setCountries(formattedCountries as ISelectOption[]);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

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

        <label
          htmlFor="banner"
          className=" relative w-full aspect-[2.4] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
        >
          {banner ? (
            <NextImage
              src={banner}
              alt="Banner cho tỉnh / vùng miền"
              className="rounded-md overflow-hidden w-full h-full"
            />
          ) : (
            <>
              <MdFileUpload size={50} className="text-admin_primary" />
              <span className="text-admin_primary font-semibold">
                Chọn banner cho tỉnh / vùng miền
              </span>
              <span className="mt-1 text-slate-700">( Tỷ lệ ảnh: 2.41 )</span>
            </>
          )}
          <input
            type="file"
            name="banner"
            id="banner"
            hidden
            onChange={uploadBannerHandler}
          />
        </label>

        <div className="flex items-center gap-6 mt-4">
          <label
            htmlFor="thumbnail"
            className=" relative w-[63%] aspect-[1.78] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
          >
            {thumbnail ? (
              <NextImage
                src={thumbnail}
                alt="Thumbnail cho tỉnh / vùng miền"
                className="rounded-md overflow-hidden w-full h-full"
              />
            ) : (
              <>
                <MdFileUpload size={50} className="text-admin_primary" />
                <span className="text-admin_primary font-semibold">
                  Chọn ảnh đại diện cho tỉnh / vùng miền
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
              label="Tên tỉnh / vùng miền"
              register={register("name")}
              errorMsg={errors.name?.message}
              placeholder="Nhập tên tỉnh / vùng miền"
            />

            <FormInput
              id="slug"
              label="Đường dẫn (URL)"
              register={register("slug")}
              errorMsg={errors.slug?.message}
              placeholder="Nhập đường dẫn đến trang tỉnh / vùng miền"
            />

            <FormOptimizedSelect
              id="country"
              label="Thuộc quốc gia"
              onChange={
                setSelectedCountry as Dispatch<SetStateAction<ISelectOption>>
              }
              options={countries as ISelectOption[]}
              value={selectedCountry}
            />

            <FormInput
              textarea
              id="description"
              rows={2}
              label="Mô tả"
              register={register("description")}
              errorMsg={errors.description?.message}
              placeholder="Nhập mô tả ngắn gọn về tỉnh / vùng miền"
            />

            <BtnWithLoading
              content="Tạo tỉnh / vùng miền"
              isLoading={isLoading}
              type="submit"
              customClasses="!absolute bottom-7 right-5"
            />
          </form>
        </div>

        <label className="form-input-label !mb-1 block">
          Đôi nét về tỉnh / vùng miền
        </label>
        <TextEditor content={content} setContent={setContent} />
      </div>
    </>
  );
};

export default CreateRegionForm;
