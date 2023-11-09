"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import { CoreOutput } from "@/dtos/common.dto";
import toast from "react-hot-toast";
import { CountryEntity } from "@/entities/country.entity";

interface Props {
  setShowDeleteForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deletedCountry: CountryEntity;
}

const DeleteCountryForm: FC<Props> = ({
  setShowDeleteForm,
  refetch,
  deletedCountry,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCountryHandler = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.delete(
        `/api/admin/country?id=${deletedCountry._id}`
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success(`Xóa quốc gia ${deletedCountry.name} thành công`);
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
        Bạn chắc chắn muốn xóa quốc gia {deletedCountry.name}?
      </p>
      <p className="text-center">
        Sau khi xóa tất cả bài viết và galleries thuộc quốc gia{" "}
        {deletedCountry.name} vẫn giữ nguyên
      </p>

      <div className="text-center mt-4">
        <BtnWithLoading
          content="Xác nhận xóa"
          isLoading={isLoading}
          type="submit"
          onClick={deleteCountryHandler}
        />
      </div>
    </div>
  );
};

export default DeleteCountryForm;
