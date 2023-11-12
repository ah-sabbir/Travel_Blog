"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import { CoreOutput } from "@/dtos/common.dto";
import toast from "react-hot-toast";
import { BrandEntity } from "@/entities/brand.entity";

interface Props {
  setShowDeleteForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deletedBrand: BrandEntity;
}

const DeleteBrandForm: FC<Props> = ({
  setShowDeleteForm,
  refetch,
  deletedBrand,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticleHandler = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.delete(
        `/api/admin/brand?id=${deletedBrand._id}`
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success(`Xóa thương hiệu ${deletedBrand.name} thành công`);
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
        Bạn chắc chắn muốn xóa thương hiệu {deletedBrand.name}?
      </p>

      <div className="text-center mt-4">
        <BtnWithLoading
          content="Xác nhận xóa"
          isLoading={isLoading}
          type="submit"
          onClick={deleteArticleHandler}
        />
      </div>
    </div>
  );
};

export default DeleteBrandForm;
