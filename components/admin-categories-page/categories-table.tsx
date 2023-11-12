"use client";

import { FC, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import { CategoryEntity } from "@/entities/category.entity";
import CustomModal from "../custom-modal";
import CreateCategoryForm from "./create-category-form";
import { getAllCategories } from "@/lib/fetch-category-data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillDelete } from "react-icons/ai";
import EditCategoryForm from "./edit-category-form";
import DeleteCategoryForm from "./delete-category-form";

interface Props {}

const CategoriesTable: FC<Props> = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedCategory, setEditCategory] = useState<CategoryEntity>();
  const [deletedCategory, setDeletedCategory] = useState<CategoryEntity>();

  const fetchCategories = async () => {
    setIsLoading(true);
    const fetchedCategories = await getAllCategories(
      "name slug galleries articles"
    );
    setCategories(fetchedCategories as CategoryEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm danh mục"
            icon={BiPlusCircle}
            iconSize={18}
            onClick={() => setShowCreateForm(true)}
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Đường dẫn (Slug)</th>
              <th>Số bài viết</th>
              <th>Số galleries</th>
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
              {categories.map((category) => (
                <tr key={category._id.toString()}>
                  <td className="text-center">{category.name}</td>
                  <td className="text-center">{category.slug}</td>
                  <td className="text-center">{category.articles.length}</td>
                  <td className="text-center">{category.galleries.length}</td>
                  <td className="flex items-center justify-center gap-4">
                    <MdEditSquare
                      className="mt-1 cursor-pointer text-blue-900"
                      size={18}
                      onClick={() => {
                        setShowEditForm(true);
                        setEditCategory(category);
                      }}
                    />
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedCategory(category);
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
        heading="Tạo danh mục mới"
        onClose={() => setShowCreateForm(false)}
        open={showCreateForm}
      >
        <CreateCategoryForm
          setShowCreateForm={setShowCreateForm}
          refetch={fetchCategories}
        />
      </CustomModal>

      <CustomModal
        heading="Sửa danh mục"
        onClose={() => setShowEditForm(false)}
        open={showEditForm}
      >
        <EditCategoryForm
          setShowEditForm={setShowEditForm}
          refetch={fetchCategories}
          editedCategory={editedCategory as CategoryEntity}
        />
      </CustomModal>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteCategoryForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchCategories}
          deletedCategory={deletedCategory as CategoryEntity}
        />
      </CustomModal>
    </>
  );
};

export default CategoriesTable;
