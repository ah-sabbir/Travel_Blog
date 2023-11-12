"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import { CoreOutput } from "@/dtos/common.dto";
import toast from "react-hot-toast";
import { BrandTypeEntity } from "@/entities/brandType.entity";

interface Props {
  setShowDeleteForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deletedBrandCategory: BrandTypeEntity;
}

const DeleteBrandCategoryForm: FC<Props> = ({
  setShowDeleteForm,
  refetch,
  deletedBrandCategory,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategoryHandler = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.delete(
        `/api/admin/brand-type?id=${deletedBrandCategory._id}`
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success(
          `Xóa danh mục thương hiệu thương hiệu ${deletedBrandCategory.name} thành công`
        );
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
        Bạn chắc chắn muốn xóa danh mục thương hiệu {deletedBrandCategory.name}?
      </p>
      <p className="text-center">
        Sau khi xóa tất cả bài viết và galleries của danh mục thương hiệu{" "}
        {deletedBrandCategory.name} vẫn giữ nguyên
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

export default DeleteBrandCategoryForm;
