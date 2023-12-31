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
import { getAllCountries } from "@/lib/fetch-country-data";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { CreateTicketInput } from "@/dtos/ticket/create-ticket.dto";
import { getAllBrands } from "@/lib/fetch-brand-data";
import { getAllTicketTypes } from "@/lib/fetch-ticket-type-data";
import { TicketEntity } from "@/entities/ticket.entity";
import { EditTicketInput } from "@/dtos/ticket/edit-ticket.dto";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên vé"),
  link: Yup.string().required("Vui lòng nhập link mua vé"),
  price: Yup.string().required("Vui lòng nhập giá vé"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho vé"),
});

interface FormValues {
  name: string;
  slug: string;
  link: string;
  price: string;
  images: { link: string }[];
}

interface Props {
  ticket: TicketEntity | undefined;
}

const EditTicketForm: FC<Props> = ({ ticket }): JSX.Element => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(ticket?.thumbnail.url || "");
  const [content, setContent] = useState(ticket?.content || "");
  const [description, setDescription] = useState(ticket?.description || "");
  const [brands, setBrands] = useState<ISelectOption[]>();
  const [countries, setCountries] = useState<ISelectOption[]>();
  const [regions, setRegions] = useState<ISelectOption[]>();
  const [ticketTypes, setTicketTypes] = useState<ISelectOption[]>();

  const [selectedBrand, setSelectedBrand] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [selectedTicketType, setSelectedTicketType] = useState<ISelectOption>({
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
      slug: "",
      link: "",
      price: "",
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
      const bodyRequest: EditTicketInput = {
        ...formData,
        content,
        thumbnail,
        description,
        brandId: selectedBrand.value,
        ticketTypeId: selectedTicketType.value,
        regionId: selectedRegion.value,
        countryId: selectedCountry.value,
        ticketId: ticket?._id.toString() as string,
      };

      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.put(
        "/api/admin/ticket",
        bodyRequest
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật vé ${formData.name} thành công`);
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
      getAllBrands("name"),
      getAllTicketTypes("name"),
      getAllCountries("name"),
    ]).then((data) => {
      const formattedRegions = data[0]?.map((region) => ({
        label: region.name,
        value: region._id.toString(),
      }));
      setRegions(formattedRegions as ISelectOption[]);

      const formattedBrands = data[1]?.map((brand) => ({
        label: brand.name,
        value: brand._id.toString(),
      }));
      setBrands(formattedBrands as ISelectOption[]);

      const formattedTicketTypes = data[2]?.map((ticketType) => ({
        label: ticketType.name,
        value: ticketType._id.toString(),
      }));
      setTicketTypes(formattedTicketTypes as ISelectOption[]);

      const formattedCountries = data[3]?.map((country) => ({
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
    if (ticket?.images && ticket?.images.length > 0) {
      newImages = ticket.images.map((image) => ({ link: image }));
    }

    setValue("name", ticket?.name || "");
    setValue("slug", ticket?.slug || "");
    setValue("price", ticket?.price || "");
    setValue("link", ticket?.link || "");
    setValue("images", newImages);
  }, []);

  useEffect(() => {
    const selectedCountryName = countries?.find(
      (item) => item.value === ticket?.country?.toString()
    )?.label;

    if (selectedCountryName && countries?.length > 0) {
      setSelectedCountry({
        value: ticket?.country.toString() || "",
        label: selectedCountryName || "",
      });
    }
  }, [countries?.length]);

  useEffect(() => {
    const selectedRegionName = regions?.find(
      (item) => item.value === ticket?.region?.toString()
    )?.label;

    if (selectedRegionName && regions?.length > 0) {
      setSelectedRegion({
        value: ticket?.region.toString() || "",
        label: selectedRegionName || "",
      });
    }
  }, [regions?.length]);

  useEffect(() => {
    const selectedBrandName = brands?.find(
      (item) => item.value === ticket?.brand?.toString()
    )?.label;

    if (selectedBrandName && brands?.length > 0) {
      setSelectedBrand({
        value: ticket?.brand.toString() || "",
        label: selectedBrandName || "",
      });
    }
  }, [brands?.length]);

  useEffect(() => {
    const selectedTicketTypeName = ticketTypes?.find(
      (item) => item.value === ticket?.ticketType?.toString()
    )?.label;

    if (selectedTicketTypeName && ticketTypes?.length > 0) {
      setSelectedTicketType({
        value: ticket?.ticketType.toString() || "",
        label: selectedTicketTypeName || "",
      });
    }
  }, [ticketTypes?.length]);

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
                alt="Thumbnail cho vé"
                className="rounded-md overflow-hidden w-full h-full"
              />
            ) : (
              <>
                <MdFileUpload size={50} className="text-admin_primary" />
                <span className="text-admin_primary font-semibold">
                  Chọn ảnh đại diện cho vé
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
              wrapperCustomClasses="-mt-2"
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
              id="brand"
              label="Chọn hãng vé"
              onChange={
                setSelectedBrand as Dispatch<SetStateAction<ISelectOption>>
              }
              options={brands as ISelectOption[]}
              value={selectedBrand}
            />

            <FormOptimizedSelect
              id="brandType"
              label="Chọn loại vé"
              onChange={
                setSelectedTicketType as Dispatch<SetStateAction<ISelectOption>>
              }
              options={ticketTypes as ISelectOption[]}
              value={selectedTicketType}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              id="name"
              label="Tên vé"
              register={register("name")}
              errorMsg={errors.name?.message}
              placeholder="Nhập tên vé"
            />

            <FormInput
              id="slug"
              label="Đường dẫn (URL)"
              register={register("slug")}
              errorMsg={errors.slug?.message}
              placeholder="Nhập đường dẫn đến trang thông tin vé"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput
              id="link"
              label="Link mua vé"
              register={register("link")}
              errorMsg={errors.link?.message}
              placeholder="Nhập link tham khảo và mua vé"
            />

            <FormInput
              id="price"
              label="Giá vé"
              type="number"
              register={register("price")}
              errorMsg={errors.price?.message}
              placeholder="Nhập giá vé - Eg: 1500000"
            />
          </div>

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

          <div className="small-text-editor mb-6">
            <label className="form-input-label !mb-1 block">Mô tả</label>
            <TextEditor content={description} setContent={setDescription} />
          </div>

          <label className="form-input-label !mb-1 block">Nội dung</label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Cập nhật vé"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default EditTicketForm;
