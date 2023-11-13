"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import { CoreOutput } from "@/dtos/common.dto";
import toast from "react-hot-toast";
import { TicketTypeEntity } from "@/entities/ticketType.entity";

interface Props {
  setShowDeleteForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deletedTicketType: TicketTypeEntity;
}

const DeleteTicketTypeForm: FC<Props> = ({
  setShowDeleteForm,
  refetch,
  deletedTicketType,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategoryHandler = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.delete(
        `/api/admin/ticket-type?id=${deletedTicketType._id}`
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success(`Xóa danh mục vé ${deletedTicketType.name} thành công`);
        setShowDeleteForm(false);
        setIsLoading(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="admin-card-body">
      <p className="font-bold text-xl text-center mt-2 mb-3">
        Bạn chắc chắn muốn xóa danh mục vé {deletedTicketType.name}?
      </p>
      <p className="text-center">
        Sau khi xóa tất cả vé của danh mục {deletedTicketType.name} vẫn giữ
        nguyên
      </p>

      <div className="text-center mt-4">
        <BtnWithLoading
          content="Xác nhận xóa"
          isLoading={isLoading}
          type="submit"
          onClick={deleteCategoryHandler}
        />
      </div>
    </div>
  );
};

export default DeleteTicketTypeForm;
