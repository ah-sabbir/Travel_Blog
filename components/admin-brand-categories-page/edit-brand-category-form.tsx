import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "../form-input";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CreateAccountOutput } from "@/dtos/auth/create-account.dto";
import { CategoryEntity } from "@/entities/category.entity";
import { BrandTypeEntity } from "@/entities/brandType.entity";

interface Props {
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  editedBrandCategory: BrandTypeEntity;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục thương hiệu"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục thương hiệu"),
});

interface Props {
  refetch: () => void;
}

interface FormValues {
  name: string;
  slug: string;
}

const EditBrandCategoryForm: FC<Props> = ({
  setShowEditForm,
  refetch,
  editedBrandCategory,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      const { data }: { data: CreateAccountOutput } = await axiosInstance.put(
        "/api/admin/brand-type",
        { ...formData, id: editedBrandCategory._id }
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(
          `Cập nhật danh mục thương hiệu ${formData.name} thành công`
        );
        setShowEditForm(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("name", editedBrandCategory.name);
    setValue("slug", editedBrandCategory.slug);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body">
      <FormInput
        id="name"
        label="Tên danh mục thương hiệu"
        register={register("name")}
        errorMsg={errors.name?.message}
        placeholder="Eg: Đại lý vé máy bay, Đặt phòng khách sạn, ..."
      />
      <FormInput
        id="slug"
        label="Đường dẫn của danh mục thương hiệu"
        register={register("slug")}
        errorMsg={errors.slug?.message}
        placeholder="Eg: dai-ly-ve-may-bay, dat-phong-khach-san, ..."
      />

      <div className="text-right">
        <BtnWithLoading
          content="Xác nhận"
          isLoading={isLoading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default EditBrandCategoryForm;
