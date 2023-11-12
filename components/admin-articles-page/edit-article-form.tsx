"use client";

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
import { useRouter } from "next/navigation";
import FormOptimizedSelect, { ISelectOption } from "../form-optimized-select";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blobToBase64 } from "@/lib/blobToBase64";
import toast from "react-hot-toast";
import { CoreOutput } from "@/dtos/common.dto";
import axiosInstance from "@/lib/axios";
import FormInput from "../form-input";
import { MdFileUpload } from "react-icons/md";
import NextImage from "../next-image";
import { getAllRegions } from "@/lib/fetch-region-data";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { getAllCategories } from "@/lib/fetch-category-data";
import TextEditor from "../text-editor";
import BtnWithLoading from "../btn-with-loading";
import { getAllCountries } from "@/lib/fetch-country-data";
import { ArticleEntity } from "@/entities/article.entity";
import { EditArticleInput } from "@/dtos/article/edit-article.dto";
import { getAllDestinations } from "@/lib/fetch-destination-data";

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

interface Props {
  authorId: string | undefined;
  article: ArticleEntity | undefined;
}

const EditArticleForm: FC<Props> = ({ authorId, article }): JSX.Element => {
  const router = useRouter();

  const [thumbnail, setThumbnail] = useState(article?.thumbnail?.url || "");
  const [content, setContent] = useState(article?.content || "");
  const [regions, setRegions] = useState<ISelectOption[]>();
  const [interests, setInterests] = useState<ISelectOption[]>();
  const [categories, setCategories] = useState<ISelectOption[]>();
  const [countries, setCountries] = useState<ISelectOption[]>();
  const [destinations, setDestinations] = useState<ISelectOption[]>();

  const [selectedInterest, setSelectedInterest] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [selectedRegion, setSelectedRegion] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [selectedCategory, setSelectedCategory] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [selectedDestination, setSelectedDestination] = useState<ISelectOption>(
    {
      value: "",
      label: "",
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

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

      const bodyRequest: EditArticleInput = {
        ...formData,
        articleId: article?._id.toString() as string,
        content,
        thumbnail,
        categoryId: selectedCategory.value,
        interestId: selectedInterest.value,
        regionId: selectedRegion.value,
        countryId: selectedCountry.value,
        destinationId: selectedDestination.value,
        authorId: authorId as string,
      };

      const { data }: { data: CoreOutput } = await axiosInstance.put(
        "/api/admin/article",
        bodyRequest
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật bài viết thành công`);
        router.back();
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
      getAllCategories("name"),
      getAllCountries("name"),
      getAllDestinations("name"),
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

      const formattedCategories = data[2]?.map((category) => ({
        label: category.name,
        value: category._id.toString(),
      }));
      setCategories(formattedCategories as ISelectOption[]);

      const formattedCountries = data[3]?.map((country) => ({
        label: country.name,
        value: country._id.toString(),
      }));
      setCountries(formattedCountries as ISelectOption[]);

      const formattedDestinations = data[4]?.map((destination) => ({
        label: destination.name,
        value: destination._id.toString(),
      }));
      setDestinations(formattedDestinations as ISelectOption[]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValue("name", article?.name || "");
    setValue("slug", article?.slug || "");
    setValue("description", article?.description || "");
  }, []);

  useEffect(() => {
    const selectedCountryName = countries?.find(
      (item) => item.value === article?.country?.toString()
    )?.label;

    if (selectedCountryName && countries?.length > 0) {
      setSelectedCountry({
        value: article?.country.toString() || "",
        label: selectedCountryName || "",
      });
    }
  }, [countries?.length]);

  useEffect(() => {
    const selectedInterestName = interests?.find(
      (item) => item.value === article?.interest?.toString()
    )?.label;

    if (selectedInterestName && interests?.length > 0) {
      setSelectedInterest({
        value: article?.interest.toString() || "",
        label: selectedInterestName || "",
      });
    }
  }, [interests?.length]);

  useEffect(() => {
    const selectedRegionName = regions?.find(
      (item) => item.value === article?.region?.toString()
    )?.label;

    if (selectedRegionName && regions?.length > 0) {
      setSelectedRegion({
        value: article?.region.toString() || "",
        label: selectedRegionName || "",
      });
    }
  }, [regions?.length]);

  useEffect(() => {
    const selectedCategoryName = categories?.find(
      (item) => item.value === article?.category?.toString()
    )?.label;

    if (selectedCategoryName && categories?.length > 0) {
      setSelectedCategory({
        value: article?.category.toString() || "",
        label: selectedCategoryName || "",
      });
    }
  }, [categories?.length]);

  useEffect(() => {
    const selectedDesinationName = destinations?.find(
      (item) => item.value === article?.destination?.toString()
    )?.label;

    if (selectedDesinationName && destinations?.length > 0) {
      setSelectedDestination({
        value: article?.destination.toString() || "",
        label: selectedDesinationName || "",
      });
    }
  }, [destinations?.length]);

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              id="name"
              label="Tiêu đề"
              register={register("name")}
              errorMsg={errors.name?.message}
              placeholder="Nhập tiêu đề bài viết"
            />

            <FormInput
              id="slug"
              label="Đường dẫn"
              register={register("slug")}
              errorMsg={errors.slug?.message}
              placeholder="Nhập đường dẫn bài viết"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <label
              htmlFor="thumbnail"
              className="mt-2 relative w-full aspect-[1.78] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
            >
              {thumbnail ? (
                <NextImage
                  src={thumbnail}
                  alt="Thumbnail cho bài viết"
                  className="rounded-md overflow-hidden w-full h-full"
                />
              ) : (
                <>
                  <MdFileUpload size={50} className="text-admin_primary" />
                  <span className="text-admin_primary font-semibold">
                    Chọn thumbnail cho bài viết
                  </span>
                  <span className="mt-1 text-slate-700">
                    ( Tỷ lệ ảnh: 16/9 )
                  </span>
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

            <div className="">
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
                wrapperCustomClasses="-mt-2"
                id="region"
                label="Chọn tỉnh / vùng miền"
                onChange={
                  setSelectedRegion as Dispatch<SetStateAction<ISelectOption>>
                }
                options={regions as ISelectOption[]}
                value={selectedRegion}
              />

              <FormOptimizedSelect
                wrapperCustomClasses="-mt-2"
                id="interest"
                label="Chọn sở thích"
                onChange={
                  setSelectedInterest as Dispatch<SetStateAction<ISelectOption>>
                }
                options={interests as ISelectOption[]}
                value={selectedInterest}
              />

              <FormOptimizedSelect
                wrapperCustomClasses="-mt-2"
                id="category"
                label="Chọn danh mục"
                onChange={
                  setSelectedCategory as Dispatch<SetStateAction<ISelectOption>>
                }
                options={categories as ISelectOption[]}
                value={selectedCategory}
              />

              <FormOptimizedSelect
                wrapperCustomClasses="-mt-2"
                id="destination"
                label="Chọn địa danh"
                onChange={
                  setSelectedDestination as Dispatch<
                    SetStateAction<ISelectOption>
                  >
                }
                options={destinations as ISelectOption[]}
                value={selectedDestination}
              />
            </div>
          </div>

          <div>
            <FormInput
              textarea
              id="description"
              rows={4}
              label="Mô tả"
              register={register("description")}
              errorMsg={errors.description?.message}
              placeholder="Nhập description (mô tả) cho bài viết"
            />
          </div>

          <label className="form-input-label !mb-1 block">
            Nội dung bài viết
          </label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Cập nhật bài viết"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default EditArticleForm;
