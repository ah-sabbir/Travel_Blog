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

interface Props {
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  editedCategory: CategoryEntity;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục"),
});

interface Props {
  refetch: () => void;
}

interface FormValues {
  name: string;
  slug: string;
}

const EditCategoryForm: FC<Props> = ({
  setShowEditForm,
  refetch,
  editedCategory,
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
        "/api/admin/category",
        { ...formData, id: editedCategory._id }
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật danh mục ${formData.name} thành công`);
        setShowEditForm(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("name", editedCategory.name);
    setValue("slug", editedCategory.slug);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body">
      <FormInput
        id="name"
        label="Tên danh mục"
        register={register("name")}
        errorMsg={errors.name?.message}
        placeholder="Eg: Nhật ký, Bộ sưu tập, Cẩm nang du lịch, ..."
      />
      <FormInput
        id="slug"
        label="Đường dẫn của danh mục"
        register={register("slug")}
        errorMsg={errors.slug?.message}
        placeholder="Eg: nhat-ky, bo-suu-tap, cam-nang-du-lich, ..."
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

export default EditCategoryForm;
