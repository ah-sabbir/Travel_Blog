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
import DeleteCategoryForm from "../admin-categories-page/delete-category-form";
import { path } from "@/constant";

interface Props {}

const ArticlesTable: FC<Props> = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCategory, setDeletedCategory] = useState<CategoryEntity>();

  const fetchCategories = async () => {
    setIsLoading(true);
    const fetchedCategories = await getAllCategories();
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
            content="Thêm bài viết"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createArticle}
            customClasses="block ml-auto w-fit"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Sở thích</th>
              <th>Ngày sửa</th>
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
                      onClick={() => {}}
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

export default ArticlesTable;
