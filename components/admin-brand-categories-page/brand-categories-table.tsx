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
import { getAllBrandTypes } from "@/lib/fetch-brand-type-data";
import { BrandTypeEntity } from "@/entities/brandType.entity";
import CreateBrandCategoryForm from "./create-brand-category-form";
import EditBrandCategoryForm from "./edit-brand-category-form";
import DeleteBrandCategoryForm from "./delete-brand-category-form";

interface Props {}

const BrandCategoriesTable: FC<Props> = (): JSX.Element => {
  const [brandCategories, setBrandCategories] = useState<BrandTypeEntity[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedBrandCategory, setEditedBrandCategory] =
    useState<BrandTypeEntity>();
  const [deletedBrandCategory, setDeletedBrandCategory] =
    useState<BrandTypeEntity>();

  const fetchBrandCategories = async () => {
    setIsLoading(true);
    const fetchedBrandCategories = await getAllBrandTypes("name slug");
    setBrandCategories(fetchedBrandCategories as BrandTypeEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBrandCategories();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm danh mục thương hiệu"
            icon={BiPlusCircle}
            iconSize={18}
            onClick={() => setShowCreateForm(true)}
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên danh mục thương hiệu</th>
              <th>Đường dẫn (Slug)</th>
              <th>Sửa / Xóa</th>
              <th>Live link</th>
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
              {brandCategories?.map((brandType) => (
                <tr key={brandType._id.toString()}>
                  <td className="text-center">{brandType.name}</td>
                  <td className="text-center">{brandType.slug}</td>

                  <td className="flex items-center justify-center gap-4">
                    <MdEditSquare
                      className="mt-1 cursor-pointer text-blue-900"
                      size={18}
                      onClick={() => {
                        setShowEditForm(true);
                        setEditedBrandCategory(brandType);
                      }}
                    />
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedBrandCategory(brandType);
                      }}
                    />
                  </td>

                  <td className="text-center">
                    <a
                      href={`/test/${brandType.slug}`}
                      target="_blank"
                      className="underline text-sm font-bold text-blue-600"
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <CustomModal
        heading="Tạo danh mục thương hiệu mới"
        onClose={() => setShowCreateForm(false)}
        open={showCreateForm}
      >
        <CreateBrandCategoryForm
          setShowCreateForm={setShowCreateForm}
          refetch={fetchBrandCategories}
        />
      </CustomModal>

      <CustomModal
        heading="Sửa danh mục thương hiệu"
        onClose={() => setShowEditForm(false)}
        open={showEditForm}
      >
        <EditBrandCategoryForm
          setShowEditForm={setShowEditForm}
          refetch={fetchBrandCategories}
          editedBrandCategory={editedBrandCategory as BrandTypeEntity}
        />
      </CustomModal>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteBrandCategoryForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchBrandCategories}
          deletedBrandCategory={deletedBrandCategory as BrandTypeEntity}
        />
      </CustomModal>
    </>
  );
};

export default BrandCategoriesTable;
