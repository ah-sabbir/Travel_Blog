import { Dispatch, FC, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "../form-input";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CreateAccountOutput } from "@/dtos/auth/create-account.dto";
import { CreateBrandTypeInput } from "@/dtos/brandType/create-brand-type.dto";
import { CoreOutput } from "@/dtos/common.dto";

interface Props {
  setShowCreateForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục thương hiệu"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục thương hiệu"),
});

interface FormValues {
  name: string;
  slug: string;
}

const CreateCategoryForm: FC<Props> = ({
  setShowCreateForm,
  refetch,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, getValues } = form;

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      const { data }: { data: CoreOutput } = await axiosInstance.post(
        "/api/admin/brand-type",
        formData
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo danh mục thương hiệu ${formData.name} thành công`);
        setShowCreateForm(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body">
      <FormInput
        id="name"
        label="Tên danh mục thương hiệu"
        register={register("name")}
        errorMsg={errors.name?.message}
        placeholder="Eg: Nhật ký, Bộ sưu tập, Cẩm nang du lịch, ..."
      />
      <FormInput
        id="slug"
        label="Đường dẫn của danh mục thương hiệu"
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

export default CreateCategoryForm;
