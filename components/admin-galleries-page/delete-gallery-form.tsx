"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import { CoreOutput } from "@/dtos/common.dto";
import toast from "react-hot-toast";
import { GalleryEntity } from "@/entities/gallery.entity";

interface Props {
  setShowDeleteForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deletedGallery: GalleryEntity;
}

const DeleteGalleryForm: FC<Props> = ({
  setShowDeleteForm,
  refetch,
  deletedGallery,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteGalleryHandler = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.delete(
        `/api/admin/gallery?id=${deletedGallery._id}`
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success(`Xóa gallery ${deletedGallery.name} thành công`);
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
        Bạn chắc chắn muốn xóa gallery {deletedGallery.name}?
      </p>

      <div className="text-center mt-4">
        <BtnWithLoading
          content="Xác nhận xóa"
          isLoading={isLoading}
          type="submit"
          onClick={deleteGalleryHandler}
        />
      </div>
    </div>
  );
};

export default DeleteGalleryForm;
