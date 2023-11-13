import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "../form-input";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CreateAccountOutput } from "@/dtos/auth/create-account.dto";
import { TicketTypeEntity } from "@/entities/ticketType.entity";

interface Props {
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  editedTicketType: TicketTypeEntity;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục vé"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục vé"),
});

interface Props {
  refetch: () => void;
}

interface FormValues {
  name: string;
  slug: string;
}

const EditTicketTypeForm: FC<Props> = ({
  setShowEditForm,
  refetch,
  editedTicketType,
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
        "/api/admin/ticket-type",
        { ...formData, id: editedTicketType._id }
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật danh mục vé ${formData.name} thành công`);
        setShowEditForm(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("name", editedTicketType.name);
    setValue("slug", editedTicketType.slug);
  }, []);
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

export default EditTicketTypeForm;
