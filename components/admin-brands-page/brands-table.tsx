"use client";

import { FC, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import { CategoryEntity } from "@/entities/category.entity";
import CustomModal from "../custom-modal";
import { getAllCategories } from "@/lib/fetch-category-data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillDelete } from "react-icons/ai";
import { BrandEntity } from "@/entities/brand.entity";
import { path } from "@/constant";
import Link from "next/link";
import { getAllBrands } from "@/lib/fetch-brand-data";
import DeleteBrandForm from "./delete-brand-form";

interface Props {}

const BrandsTable: FC<Props> = (): JSX.Element => {
  const [brands, setBrands] = useState<BrandEntity[]>([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedBrand, setEditedBrand] = useState<BrandEntity>();
  const [deletedBrand, setDeletedBrand] = useState<BrandEntity>();

  const fetchBrands = async () => {
    setIsLoading(true);
    const fetchedBrands = await getAllBrands("name slug views affLink");
    setBrands(fetchedBrands as BrandEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm thương hiệu"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createBrand}
            customClasses="block w-fit ml-auto"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên thương hiệu</th>
              <th>Đường dẫn (Slug)</th>
              <th>Lượt xem</th>
              <th>Link Affiliate</th>
              <th>Sửa / Xóa</th>
            </tr>
          </thead>

          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item) => (
                <tr key={item} className="mb-3">
                  <td colSpan={5}>
                    <Skeleton className="w-full h-10" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id.toString()}>
                  <td className="text-center">{brand.name}</td>
                  <td className="text-center">{brand.slug}</td>
                  <td className="text-center">{brand.views}</td>
                  <td className="text-center">{brand.affLink}</td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editBrand}?slug=${brand.slug}`}>
                      <MdEditSquare
                        className="mt-1 cursor-pointer text-blue-900"
                        size={18}
                      />
                    </Link>
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedBrand(brand);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteBrandForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchBrands}
          deletedBrand={deletedBrand as BrandEntity}
        />
      </CustomModal>
    </>
  );
};

export default BrandsTable;
