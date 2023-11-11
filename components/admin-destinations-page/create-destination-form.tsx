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
import FormOptimzedSelect, { ISelectOption } from "../form-optimized-select";
import { getAllRegions } from "@/lib/fetch-region-data";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { getAllCountries } from "@/lib/fetch-country-data";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên địa danh"),
  description: Yup.string().required(
    "Vui lòng nhập đoạn mô tả ngắn về địa danh"
  ),
  address: Yup.string().required("Vui lòng địa chỉ của địa danh"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho địa danh"),
});

interface FormValues {
  name: string;
  description: string;
  slug: string;
  address: string;
  instruction: string;
}

interface Props {}

const CreateDestinationForm: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [interests, setInterests] = useState<ISelectOption[]>();
  const [countries, setCountries] = useState<ISelectOption[]>();
  const [regions, setRegions] = useState<ISelectOption[]>();

  const [selectedInterest, setSelectedInterest] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [selectedRegion, setSelectedRegion] = useState<ISelectOption>({
    value: "",
    label: "",
  });

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

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.post(
        "/api/admin/destination",
        {
          ...formData,
          content,
          thumbnail,
          interestId: selectedInterest.value,
          regionId: selectedRegion.value,
          countryId: selectedCountry.value,
        }
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo địa danh ${formData.name} thành công`);
        return router.back();
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  const fetchData = async () => {
    Promise.all([
      getAllRegions("name"),
      getAllInterests("name"),
      getAllCountries("name"),
    ]).then((data) => {
      const formattedRegions = data[0]?.map((region) => ({
        label: region.name,
        value: region._id.toString(),
      }));
      setRegions(formattedRegions as ISelectOption[]);

      const formattedInterests = data[1]?.map((interest) => ({
        label: interest.name,
        value: interest._id.toString(),
      }));
      setInterests(formattedInterests as ISelectOption[]);

      const formattedCountries = data[2]?.map((country) => ({
        label: country.name,
        value: country._id.toString(),
      }));
      setCountries(formattedCountries as ISelectOption[]);
    });
  };

  useEffect(() => {
    fetchData();
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

        <div className="grid grid-cols-2 gap-6">
          <label
            htmlFor="thumbnail"
            className=" relative w-full aspect-[1.78] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
          >
            {thumbnail ? (
              <NextImage
                src={thumbnail}
                alt="Thumbnail cho địa danh"
                className="rounded-md overflow-hidden w-full h-full"
              />
            ) : (
              <>
                <MdFileUpload size={50} className="text-admin_primary" />
                <span className="text-admin_primary font-semibold">
                  Chọn ảnh đại diện cho địa danh
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

          <div className="flex-1">
            <FormOptimzedSelect
              id="country"
              label="Chọn quốc gia"
              onChange={
                setSelectedCountry as Dispatch<SetStateAction<ISelectOption>>
              }
              options={countries as ISelectOption[]}
              value={selectedCountry}
            />

            <FormOptimzedSelect
              id="region"
              label="Chọn tỉnh / vùng miền"
              onChange={
                setSelectedRegion as Dispatch<SetStateAction<ISelectOption>>
              }
              options={regions as ISelectOption[]}
              value={selectedRegion}
            />

            <FormOptimzedSelect
              id="interest"
              label="Chọn sở thích"
              onChange={
                setSelectedInterest as Dispatch<SetStateAction<ISelectOption>>
              }
              options={interests as ISelectOption[]}
              value={selectedInterest}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              id="name"
              label="Tên địa danh"
              register={register("name")}
              errorMsg={errors.name?.message}
              placeholder="Nhập tên địa danh"
            />

            <FormInput
              id="slug"
              label="Đường dẫn (URL)"
              register={register("slug")}
              errorMsg={errors.slug?.message}
              placeholder="Nhập đường dẫn đến trang địa danh"
            />
          </div>

          <FormInput
            textarea
            id="description"
            rows={4}
            label="Mô tả"
            register={register("description")}
            errorMsg={errors.description?.message}
            placeholder="Nhập mô tả ngắn gọn về địa danh"
          />

          <label className="form-input-label !mb-1 block">
            Đôi nét về địa danh
          </label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Tạo địa danh"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default CreateDestinationForm;
