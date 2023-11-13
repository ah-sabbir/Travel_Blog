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
  name: Yup.string().required("Vui lòng nhập tên danh mục vé"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục vé"),
});

interface FormValues {
  name: string;
  slug: string;
}

const CreateTicketTypeForm: FC<Props> = ({
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
        "/api/admin/ticket-type",
        formData
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo danh mục vé ${formData.name} thành công`);
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
        label="Tên danh mục vé"
        register={register("name")}
        errorMsg={errors.name?.message}
        placeholder="Eg: Tour, vé tham quan, vé máy bay, ..."
      />
      <FormInput
        id="slug"
        label="Đường dẫn của danh mục vé"
        register={register("slug")}
        errorMsg={errors.slug?.message}
        placeholder="Eg: tour, ve-tham-quan, ve-may-bay, ..."
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

export default CreateTicketTypeForm;
