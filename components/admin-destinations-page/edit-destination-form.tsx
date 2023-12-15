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
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blobToBase64 } from "@/lib/blobToBase64";
import FormInput from "../form-input";
import TextEditor from "../text-editor";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CoreOutput } from "@/dtos/common.dto";
import BtnWithLoading from "../btn-with-loading";
import FormOptimizedSelect, { ISelectOption } from "../form-optimized-select";
import { getAllRegions } from "@/lib/fetch-region-data";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { getAllCountries } from "@/lib/fetch-country-data";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { DestinationEntity } from "@/entities/destination.entity";
import { EditDestinationInput } from "@/dtos/destination/edit-destination.dto";

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
  images: { link: string }[];
}

interface Props {
  destination: DestinationEntity | undefined;
}

const EditDestinationForm: FC<Props> = ({ destination }): JSX.Element => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(destination?.thumbnail.url || "");
  const [content, setContent] = useState(destination?.content || "");
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
      address: "",
      instruction: "",
      images: [{ link: "" }],
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, control, setValue } = form;

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({ name: "images", control });

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
      const bodyRequest: EditDestinationInput = {
        ...formData,
        content,
        thumbnail,
        interestId: selectedInterest.value,
        regionId: selectedRegion.value,
        countryId: selectedCountry.value,
        destinationId: destination?._id.toString() as string,
      };

      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.put(
        "/api/admin/destination",
        bodyRequest
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật địa danh ${formData.name} thành công`);
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

  useEffect(() => {
    let newImages: { link: string }[] = [];
    if (destination?.images && destination?.images.length > 0) {
      newImages = destination.images.map((image) => ({ link: image }));
    }

    setValue("name", destination?.name || "");
    setValue("slug", destination?.slug || "");
    setValue("description", destination?.description || "");
    setValue("address", destination?.address || "");
    setValue("instruction", destination?.instruction || "");
    setValue("images", newImages);
  }, []);

  useEffect(() => {
    const selectedCountryName = countries?.find(
      (item) => item.value === destination?.country?.toString()
    )?.label;

    if (selectedCountryName && countries?.length > 0) {
      setSelectedCountry({
        value: destination?.country.toString() || "",
        label: selectedCountryName || "",
      });
    }
  }, [countries?.length]);

  useEffect(() => {
    const selectedInterestName = interests?.find(
      (item) => item.value === destination?.interest?.toString()
    )?.label;

    if (selectedInterestName && interests?.length > 0) {
      setSelectedInterest({
        value: destination?.interest.toString() || "",
        label: selectedInterestName || "",
      });
    }
  }, [interests?.length]);

  useEffect(() => {
    const selectedRegionName = regions?.find(
      (item) => item.value === destination?.region?.toString()
    )?.label;

    if (selectedRegionName && regions?.length > 0) {
      setSelectedRegion({
        value: destination?.region.toString() || "",
        label: selectedRegionName || "",
      });
    }
  }, [regions?.length]);

  return (
    <>
      <div className="admin-card-body relative !pb-24">
        <div className="text-right mb-6">
          <BtnWithIcon
            content="Trở về Trước"
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
            <FormOptimizedSelect
              id="country"
              label="Chọn quốc gia"
              onChange={
                setSelectedCountry as Dispatch<SetStateAction<ISelectOption>>
              }
              options={countries as ISelectOption[]}
              value={selectedCountry}
            />

            <FormOptimizedSelect
              id="region"
              label="Chọn tỉnh / vùng miền"
              onChange={
                setSelectedRegion as Dispatch<SetStateAction<ISelectOption>>
              }
              options={regions as ISelectOption[]}
              value={selectedRegion}
            />

            <FormOptimizedSelect
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
            id="address"
            label="Địa chỉ"
            register={register("address")}
            errorMsg={errors.address?.message}
            placeholder="Nhập đường địa chỉ của địa danh"
          />

          <div className="">
            {fields.map((field, index) => (
              <div key={field.id} className="relative">
                <FormInput
                  id=""
                  label={`Ảnh minh họa ${index + 1}`}
                  register={register(`images.${index}.link` as const)}
                  placeholder={`Nhập link ảnh minh họa ${index + 1}`}
                />

                {index > 0 && (
                  <button
                    type="button"
                    className="font-bold absolute right-0 top-4 flex items-center gap-1 mb-4 text-xs text-red-700 -mt-3"
                    onClick={() => remove(index)}
                  >
                    <BiMinusCircle />
                    Xóa ảnh minh họa {index + 1}
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="font-bold flex items-center gap-1 mb-4 text-xs text-emerald-700 -mt-3"
              onClick={() => append({ link: "" })}
            >
              <BiPlusCircle /> Thêm ảnh minh họa
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput
              textarea
              id="description"
              rows={4}
              label="Mô tả"
              register={register("description")}
              errorMsg={errors.description?.message}
              placeholder="Nhập mô tả ngắn gọn về địa danh"
            />

            <FormInput
              textarea
              id="instruction"
              rows={4}
              label="Làm sao đến đó"
              register={register("instruction")}
              errorMsg={errors.instruction?.message}
              placeholder="Mô tả ngắn gọn về cách để đi đến và tham quan địa danh"
            />
          </div>

          <label className="form-input-label !mb-1 block">
            Đôi nét về địa danh
          </label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Cập nhật địa danh"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default EditDestinationForm;
